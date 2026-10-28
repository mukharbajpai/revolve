# Revolve public site and staff dashboard

Independent React/Vite website. The public landing page is served at `/`; the existing staff operations dashboard is served at `/dashboard`.

```powershell
npm install
npm run dev
```

Production check:

```powershell
npm run lint
npm run build
npm run preview
```

Customer download links are supplied at build time:

```powershell
Copy-Item .env.example .env.production.local
```

Edit `.env.production.local` with the deployed customer PWA and GitHub Release APK URLs before building. The local override is ignored by Git.

See the repository root `README.md` for GitHub, artifact and deployment commands.
