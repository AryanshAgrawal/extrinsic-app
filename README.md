# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Full stack auth setup

This workspace includes your Vite frontend and a backend auth example at `backend/`.

### Run locally

1. Start the backend:

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed
node server.js
```

2. Start the frontend:

```bash
npm install
npm run dev
```

3. Set `VITE_API_URL` in your frontend environment or Vercel deployment to point to the backend URL (for example `https://your-backend.up.railway.app`).

After login, the app includes a dashboard with pages at `/`, `/tasks`, `/rewards`, and `/profile`.

### Vercel deployment

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. In Vercel project settings, set the environment variable `VITE_API_URL` to your backend URL.
4. Use the default build command `npm run build` and output directory `dist`.
5. Deploy.

### Production

For Railway deployment, use `node server.prod.js` in `backend/` and configure:

- `JWT_SECRET`
- `FRONTEND_ORIGIN`
- `DATABASE_URL` (for Postgres)
- SMTP env vars if you want verification emails

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
