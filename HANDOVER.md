# Revolve project handover

Use this document as the starting context for continuing the Revolve project in ChatGPT Web. The implementation is complete and deployed. Inspect the existing files before proposing changes; preserve working screens, local demo data, signing configuration, deployment URLs, and the separation between customer and staff experiences.

## Repository and live deliverables

- GitHub repository: https://github.com/mukharbajpai/revolve
- Default branch: `main`
- Public download/marketing site: https://revolve-web.netlify.app/
- Staff dashboard: https://revolve-web.netlify.app/dashboard
- iPhone customer PWA: https://revolve-customer.netlify.app/
- Android GitHub Release: https://github.com/mukharbajpai/revolve/releases/tag/v1.0.0
- Stable APK download: https://github.com/mukharbajpai/revolve/releases/latest/download/revolve-android.apk

The Android APK has actually been generated and published. It is not merely a configured build. The published file is `revolve-android.apk`, approximately 95.16 MB, with SHA-256:

```text
9D3102829C27B1456FA0E28B37CEFC0369CD2CA093706173B909D4CC64D54873
```

The original downloaded APK was not committed to Git. Future releases must retain the asset filename `revolve-android.apk` for the stable `latest/download` URL to continue working.

## Final architecture

The repository contains two independently runnable and deployable projects:

### `mobile/`

One Expo SDK 58, React Native, TypeScript and Expo Router customer codebase produces both customer deliverables:

- Android: standalone APK built through EAS; Expo Go and a development server are not required by end users.
- iPhone: Expo web export deployed as an installable PWA; users open it in Safari and select **Share → Add to Home Screen**.

Important configuration:

- Expo SDK `~58.0.20`
- React Native `0.88.0`
- Expo Router `~58.0.27`
- Android package: `com.revolve.customer`
- EAS project ID: `8cbc9065-2943-4c17-b600-ceb2e65df22b`
- APK profile: `mobile/eas.json` → `build.apk`
- PWA output: single-page web export with standalone display and safe-area support
- Netlify configuration: `mobile/netlify.toml`
- Manifest, icons and service worker: `mobile/public/`

Primary customer routes:

- Welcome/demo entry: `mobile/src/app/index.tsx`
- Home: `mobile/src/app/(tabs)/index.tsx`
- Services: `mobile/src/app/(tabs)/services.tsx`
- Service detail: `mobile/src/app/service/[id].tsx`
- Booking: `mobile/src/app/booking.tsx`
- Appointment details/reschedule/cancel: `mobile/src/app/appointment/[id].tsx`
- My Journey: `mobile/src/app/(tabs)/journey.tsx`
- Progress: `mobile/src/app/(tabs)/progress.tsx`
- Progress check-in: `mobile/src/app/check-in.tsx`
- Integrated Care Plan: `mobile/src/app/care-plan.tsx`

Customer demo state and actions are in `mobile/src/context/demo-context.tsx`. Data persists through AsyncStorage under `@revolve/mobile-demo/v1`. Reset Demo clears that key and restores the bundled defaults. Demo definitions live in `mobile/src/data/demo.ts`.

### `web/`

React, Vite and TypeScript provide one separately deployed website with two routes:

- `/`: public landing page with the iPhone PWA and Android APK links
- `/dashboard`: staff operations dashboard

Important files:

- Routing entry: `web/src/main.tsx`
- Public page: `web/src/LandingPage.tsx`
- Staff application and workflows: `web/src/App.tsx`
- Staff demo data: `web/src/demo-data.ts`
- Local persistence hook: `web/src/use-persistent-state.ts`
- Styles: `web/src/styles.css`
- Production customer URLs: `web/.env.production`
- Netlify configuration and SPA fallback: `web/netlify.toml`

The staff demo supports physiotherapist, trainer and admin roles; searchable clients; client profiles; appointments; care-plan editing; sending a handover; and trainer acknowledgement. Care-plan editing, handover sending and acknowledgement are intentionally separate actions. Staff data persists in browser localStorage under `revolve-web-demo-v1`; Reset Demo clears it.

## Product rules that must remain true

- The progression model is **Physiotherapy → Rehabilitation → Functional Training → Performance**.
- The customer is fictional: Aarav Mehta.
- Goal: return to running.
- Initial/current stage: Rehabilitation.
- Programme completion: 72%.
- Next milestone in the customer care plan: pain-free 5 km walk.
- The percentage means programme completion, not clinical recovery.
- Completing activities must not automatically advance a stage.
- Stage clearance is a separate professional action.
- The Integrated Care Plan contains goal, current stage, physio recommendation, trainer recommendation, restrictions, next milestone, programme completion and update history.
- The mobile and staff apps use separate local demo stores. Do not claim live synchronization or updates from another device.
- Labelled care-team updates are demo scenarios only.
- There is no backend, real authentication, payments, database, notifications or cross-device synchronization.

## Design direction

- Off-white `#F7F8F5`
- Charcoal `#202825`
- Muted green `#426B5A`
- Premium, calm health-and-performance visual language
- Native React Native components on mobile; no WebView wrapper
- Readable typography, spacious layout and restrained cards
- Preserve safe-area, keyboard, scrolling and Android back behavior

## Current production link configuration

`web/.env.production` contains:

```dotenv
VITE_CUSTOMER_PWA_URL=https://revolve-customer.netlify.app/
VITE_ANDROID_APK_URL=https://github.com/mukharbajpai/revolve/releases/latest/download/revolve-android.apk
```

These values are embedded at Vite build time. Netlify environment variables may override them, but must point to the same customer deployments unless the user intentionally changes hosts.

## Local commands

Recommended Node versions are Node 22 LTS (`22.13+`) or Node `24.3+`. Node 23 is unsupported by the Expo configuration.

Customer app checks and development:

```powershell
cd C:\CodeCave\revolve\mobile
npm install
npm run typecheck
npm run lint
npx expo start
```

Customer PWA production build and preview:

```powershell
cd C:\CodeCave\revolve\mobile
npm run build:web
npm run preview:web
```

Standalone Android APK build configuration:

```powershell
cd C:\CodeCave\revolve\mobile
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile apk
```

Do not overwrite existing signing credentials. A future version should increment `android.versionCode` in `mobile/app.json` and normally update the application version before building.

Public/staff web checks and development:

```powershell
cd C:\CodeCave\revolve\web
npm install
npm run lint
npm run build
npm run dev
```

## Deployment configuration

The same GitHub repository is imported into two separate Netlify sites:

| Deployment | Base directory | Build command | Publish directory |
| --- | --- | --- | --- |
| Customer PWA | `mobile` | `npm run build:web` | `dist` |
| Public/staff website | `web` | `npm run build` | `dist` |

Both projects include their own `netlify.toml` with SPA fallback behavior. Keep their Netlify sites and public URLs separate. Pushes to `main` may trigger both sites when Git-based continuous deployment is enabled.

Manual Netlify deployment, if required:

```powershell
cd C:\CodeCave\revolve\mobile
npx netlify-cli@latest deploy --build
npx netlify-cli@latest deploy --build --prod

cd C:\CodeCave\revolve\web
npx netlify-cli@latest deploy --build
npx netlify-cli@latest deploy --build --prod
```

## What was verified

The final deployment pass confirmed:

- `web`: lint passed and the Vite production build completed.
- The production web bundle contains the actual customer PWA and stable APK URLs.
- The public landing page returns HTTP 200.
- The direct `/dashboard` route returns HTTP 200, confirming the deployed SPA refresh fallback.
- The customer PWA returns HTTP 200.
- The stable APK URL redirects to a downloadable asset with HTTP 200 and content type `application/vnd.android.package-archive`.
- The APK archive contains an Android manifest, DEX files and bundled resources.
- The Git working tree was clean before this handover file was added.

The APK has not been physically installed and launch-tested by the coding agent on a real Android device. The final recommended human checks are APK installation on Android, Safari Add to Home Screen on iPhone, persistence after closing/reopening, Reset Demo, and the staff handover workflow.

## Relevant completed commits

- `e5c43cc` — Build Revolve customer apps and staff platform
- `a577178` — Fix EAS dependency lock for Android build
- `66df583` — Publish customer app download links
- `b5381da` — Document live Revolve deployments

## Instructions for continuing in ChatGPT Web

1. Treat the deployed implementation as the baseline; do not regenerate or replace working screens.
2. Pull/inspect the current `main` branch before suggesting edits.
3. Make only requested changes and preserve the two-project structure.
4. Do not add a backend, authentication, payments or synchronization unless the user explicitly changes scope.
5. Do not publish a new release, replace signing credentials, or alter live deployment settings without explicit approval.
6. Run targeted checks for the project changed and distinguish local configuration, a generated artifact and a deployed artifact.
7. Keep `README.md` and this handover updated when deployment URLs, release versions or build instructions change.

