# Revolve

Revolve is delivered as two independently runnable and deployable projects:

- `mobile/` — one Expo SDK 58 customer codebase. It exports the iPhone PWA and is configured to build a standalone Android APK.
- `web/` — the existing React/Vite staff operations dashboard.

The customer and staff deployments must use distinct sites/URLs. Both store demo state locally on the device or browser; there is no backend or cross-device synchronisation.

## Prerequisites

- Node.js 22 LTS (`22.13+`) is recommended. Node `24.3+` is also supported by Expo SDK 58. Node 23 is not supported.
- npm
- An Expo account and EAS CLI access when an Android APK is actually built
- A static HTTPS host (the included configuration targets Netlify) for each web deployment

Expo Go is not required for either final customer deliverable. The repository is upgraded to Expo SDK 58, so Expo Go 58 may still be used for optional development.

## Put the project on GitHub

This workspace starts with a local `main` branch. After committing the current files, authenticate GitHub CLI and create the remote repository:

```powershell
cd C:\CodeCave\revolve
gh auth login
gh repo create revolve --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` only when the source is ready to be publicly visible. A public Android download URL cannot point to a private GitHub Release unless every visitor is signed in and has repository access.

For later updates:

```powershell
git add .
git commit -m "Describe the update"
git push
```

Recommended release order:

1. Push the source to GitHub.
2. Deploy `mobile/` as the customer PWA and copy its HTTPS URL.
3. Generate the APK, then upload it to a public GitHub Release or another public file host.
4. Configure those two URLs on the `web/` site and deploy the public landing page plus staff dashboard.

## Customer app: install and check

```powershell
cd C:\CodeCave\revolve\mobile
npm install
npm run typecheck
npm run lint
```

Optional development server:

```powershell
npx expo start
```

## iPhone customer PWA

Build and preview the production web output:

```powershell
cd C:\CodeCave\revolve\mobile
npm run build:web
npm run preview:web
```

Open the printed local URL to inspect it. Installation on an iPhone requires an HTTPS deployment: open the customer URL in Safari, tap **Share**, choose **Add to Home Screen**, then tap **Add**. The installed app uses standalone display, iPhone safe areas, bundled icons, persisted local demo data and offline app-shell caching.

Deploy the customer PWA to its own Netlify site:

```powershell
cd C:\CodeCave\revolve\mobile
npx netlify-cli@latest login
npx netlify-cli@latest deploy --build
npx netlify-cli@latest deploy --build --prod
```

The first deploy prompts you to create or link a site. Link this directory only to the customer site, inspect the draft URL from the first command, then run the production command. `mobile/netlify.toml` supplies the build settings, cache headers and SPA route fallback. Save the resulting HTTPS URL for `VITE_CUSTOMER_PWA_URL`.

## Android customer APK

`mobile/eas.json` contains an `apk` profile with `android.buildType: "apk"`. When remote builds are allowed, create the standalone APK with:

```powershell
cd C:\CodeCave\revolve\mobile
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile apk
```

Download the `.apk` from the build URL printed by EAS. This is a standalone application with its JavaScript and assets embedded; it does not require Expo Go or a development server.

To make the APK downloadable from the public website, save it as `revolve-android.apk` and upload it to a GitHub Release:

```powershell
cd C:\CodeCave\revolve
gh release create v1.0.0 .\revolve-android.apk --title "Revolve Android v1.0.0" --notes "Standalone Android customer app."
```

For a public repository, the stable download URL is:

```text
https://github.com/OWNER/REPOSITORY/releases/latest/download/revolve-android.apk
```

Use that URL as `VITE_ANDROID_APK_URL`. For a private repository, use a public artifact host instead if anonymous visitors need to download the APK.

This repository currently has a **configured APK build**, not a generated APK. No remote build was started as part of this work. EAS will create managed signing credentials if the account has none; if credentials already exist, review and reuse them rather than replacing them.

## Public website and staff dashboard

The `web/` project now serves the public download landing page at `/` and the existing operations dashboard at `/dashboard`.

Run locally:

```powershell
cd C:\CodeCave\revolve\web
npm install
npm run dev
```

Build and preview the production output:

```powershell
cd C:\CodeCave\revolve\web
npm run lint
npm run build
npm run preview
```

The landing-page links are Vite build-time variables. For a local production build, create the ignored environment override and replace both example URLs:

```powershell
cd C:\CodeCave\revolve\web
Copy-Item .env.example .env.production.local
notepad .env.production.local
npm run build
npm run preview
```

Deploy the public website and staff dashboard to a different Netlify site. The first draft deploy creates or links the site; set the two URLs after it is linked, then rebuild and deploy:

```powershell
cd C:\CodeCave\revolve\web
npx netlify-cli@latest login
npx netlify-cli@latest deploy --build
npx netlify-cli@latest env:set VITE_CUSTOMER_PWA_URL "https://YOUR-CUSTOMER-SITE.netlify.app"
npx netlify-cli@latest env:set VITE_ANDROID_APK_URL "https://github.com/OWNER/REPOSITORY/releases/latest/download/revolve-android.apk"
npx netlify-cli@latest deploy --build
npx netlify-cli@latest deploy --build --prod
```

Inspect the second draft deployment before promoting the same build to production. Link `web/` only to the public/staff site. `web/netlify.toml` supplies its independent build and SPA fallback.

### Netlify deployment from the GitHub repository

You can alternatively import the same GitHub repository twice in Netlify:

- Customer site: base directory `mobile`, build command `npm run build:web`, publish directory `dist`.
- Public/staff site: base directory `web`, build command `npm run build`, publish directory `dist`.
- Add `VITE_CUSTOMER_PWA_URL` and `VITE_ANDROID_APK_URL` to the public/staff site's environment variables before its production deploy.

Keep the two Netlify sites and URLs separate. Subsequent pushes to `main` can then deploy each project independently.

## Demo behaviour and scope

The customer flow retains welcome entry, Home, Services, booking and appointment management, My Journey, Progress, the Integrated Care Plan, local persistence and **Reset Demo**. The fictional customer is Aarav Mehta, at Rehabilitation, with 72% programme completion and a next milestone of a pain-free 5 km walk. That percentage is programme completion, not clinical recovery. Completing activities does not advance stages.

The staff app retains its physiotherapist, trainer and admin roles, client operations, care-plan editing, separate handover sending, trainer acknowledgement and Reset Demo. Its data is separate from the customer app. The labelled care-team scenarios are demonstrations only and do not claim updates came from another device.

There is no backend, real authentication, payment processing, database, notification service or cross-device synchronisation. Nothing in this repository has been published or deployed.
