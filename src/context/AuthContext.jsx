import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      try {
        const res = await api.get('/api/auth/me');
        const resolvedUser = res.data.user || JSON.parse(savedUser || 'null');
        if (resolvedUser) {
          setUser(resolvedUser);
          localStorage.setItem('user', JSON.stringify(resolvedUser));
        }
      } catch (err) {
        if (token || savedUser) {
          try {
            const refreshRes = await api.post('/api/auth/refresh');
            const { token: newToken, user: newUser } = refreshRes.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            setUser(newUser);
          } catch (_) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common.Authorization;
            setUser(null);
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete api.defaults.headers.common.Authorization;
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;
          try {
            const refreshRes = await api.post('/api/auth/refresh');
            const { token: newToken, user: newUser } = refreshRes.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            setUser(newUser);
            return api(originalRequest);
          } catch (err) {
            logout();
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
