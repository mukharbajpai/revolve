# Revolve

Revolve is a recovery-to-performance platform that keeps the customer journey and care-team operations in separate, focused applications.

The demo follows a clear progression:

**Physiotherapy → Rehabilitation → Functional Training → Performance**

It is a local-data prototype with no backend, authentication, payments, notifications or cross-device synchronisation.

## Try Revolve

| Experience | Link | Purpose |
| --- | --- | --- |
| Public website | [revolve-web.netlify.app](https://revolve-web.netlify.app/) | Overview and customer-app downloads |
| Staff dashboard | [Open staff dashboard](https://revolve-web.netlify.app/dashboard) | Care-team operations demo |
| iPhone customer PWA | [Open customer app](https://revolve-customer.netlify.app/) | Safari-installable customer experience |
| Android customer app | [Download APK](https://github.com/mukharbajpai/revolve/releases/latest/download/revolve-android.apk) | Standalone Android application |
| Android release | [View v1.0.0 release](https://github.com/mukharbajpai/revolve/releases/tag/v1.0.0) | Release notes and downloadable asset |

### Install on iPhone

1. Open the [customer app](https://revolve-customer.netlify.app/) in Safari.
2. Tap **Share**.
3. Select **Add to Home Screen**.
4. Tap **Add**.

The PWA opens in standalone mode and caches its application shell for offline reopening. Demo data remains stored in that browser installation.

### Install on Android

1. Download [`revolve-android.apk`](https://github.com/mukharbajpai/revolve/releases/latest/download/revolve-android.apk).
2. Open the downloaded file on the Android device.
3. If Android asks, allow the browser or file manager to install apps from that source.
4. Complete the installation and open **Revolve**.

The APK is standalone and does not require Expo Go or a development server. The v1.0.0 APK SHA-256 checksum is:

```text
9D3102829C27B1456FA0E28B37CEFC0369CD2CA093706173B909D4CC64D54873
```

## What is included

### Customer application

- Welcome/demo entry
- Home and service discovery
- Service detail and booking
- Appointment detail, rescheduling and cancellation
- My Journey
- Progress check-ins and assigned-activity completion
- Integrated Care Plan
- Persistent local demo data and **Reset Demo**

The fictional customer is Aarav Mehta. His goal is to return to running, his current stage is Rehabilitation, programme completion is 72%, and his next milestone is a pain-free 5 km walk.

The percentage represents **programme completion**, not clinical recovery. Completing an activity never advances a stage automatically; stage clearance is a separate professional action.

### Staff dashboard

- Physiotherapist, trainer and admin demo roles
- Searchable client list and client profiles
- Appointments calendar
- Integrated care-plan editing
- Handover queue
- Separate actions for sending a handover and trainer acknowledgement
- Persistent browser demo data and **Reset Demo**

Customer and staff data are intentionally separate. Any care-team update shown in the customer app is a clearly labelled demo scenario, not an update received from another device.

## Project structure

```text
revolve/
├── mobile/   Expo SDK 58, React Native, TypeScript and Expo Router
├── web/      React, Vite and TypeScript
├── README.md
└── HANDOVER.md
```

| Project | Outputs | Local persistence |
| --- | --- | --- |
| [`mobile/`](./mobile) | Android APK and iPhone PWA | AsyncStorage |
| [`web/`](./web) | Public website and staff dashboard | localStorage |

The mobile app uses native React Native components. It is not a website embedded in a WebView.

## Technology

### Customer app

- Expo SDK 58
- React Native 0.88
- React 19
- Expo Router
- TypeScript
- AsyncStorage
- Expo web export and a service worker for the PWA
- EAS Build for the Android APK

### Public website and staff dashboard

- React 19
- Vite
- TypeScript
- Local browser persistence
- Netlify static hosting with SPA route fallback

## Run locally

### Requirements

- Git
- npm
- Node.js 22 LTS (`22.13+`) or Node.js `24.3+`

Node.js 23 is not supported by the current Expo toolchain configuration.

Clone the repository:

```bash
git clone https://github.com/mukharbajpai/revolve.git
cd revolve
```

### Customer app

```bash
cd mobile
npm ci
npm run typecheck
npm run lint
npx expo start
```

The Expo development server is optional tooling for contributors; users installing the final applications do not need Expo Go.

Build and preview the customer PWA:

```bash
cd mobile
npm run build:web
npm run preview:web
```

### Public website and staff dashboard

```bash
cd web
npm ci
npm run lint
npm run build
npm run dev
```

To preview the production build instead of starting the development server:

```bash
npm run preview
```

Open `/` for the public page and `/dashboard` for staff operations.

## Build the Android APK

An Expo account with access to the configured EAS project is required. The `apk` profile in [`mobile/eas.json`](./mobile/eas.json) produces an installable APK rather than an Android App Bundle.

```bash
cd mobile
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile apk
```

Before a future release:

1. Increment `android.versionCode` in [`mobile/app.json`](./mobile/app.json).
2. Update the application version when appropriate.
3. Reuse the existing Android signing credentials; do not replace them unintentionally.
4. Install and test the generated APK on a physical Android device.
5. Upload it to the GitHub Release using the exact filename `revolve-android.apk` so the stable download URL continues to work.

## Deployment

The GitHub repository is connected to two independent Netlify sites:

| Site | Base directory | Build command | Publish directory |
| --- | --- | --- | --- |
| Customer PWA | `mobile` | `npm run build:web` | `dist` |
| Public/staff website | `web` | `npm run build` | `dist` |

Both projects include a `netlify.toml` that defines build settings and SPA route fallback behavior.

The public landing-page links are Vite build-time variables. Production defaults are stored in [`web/.env.production`](./web/.env.production):

```dotenv
VITE_CUSTOMER_PWA_URL=https://revolve-customer.netlify.app/
VITE_ANDROID_APK_URL=https://github.com/mukharbajpai/revolve/releases/latest/download/revolve-android.apk
```

Netlify environment variables can override these values when the deployment URLs change.

Manual deployment with the Netlify CLI is also supported:

```bash
# Customer PWA
cd mobile
npx netlify-cli@latest login
npx netlify-cli@latest deploy --build
npx netlify-cli@latest deploy --build --prod

# Public website and staff dashboard
cd ../web
npx netlify-cli@latest deploy --build
npx netlify-cli@latest deploy --build --prod
```

Keep the customer PWA and public/staff website linked to different Netlify sites.

## Demo data and privacy

- All names, care plans, appointments and progress records are fictional demo data.
- Data is stored only in the current app installation or browser profile.
- Reset Demo restores the bundled starting state.
- There is no account system or cloud backup.
- Clearing app/browser storage removes local changes.
- The mobile and staff experiences do not synchronise with each other.

## Current verification status

The final delivery checks confirmed:

- The staff web lint and production build pass.
- The deployed public page, direct dashboard route and customer PWA return HTTP 200.
- The deployed landing-page bundle contains the correct PWA and APK URLs.
- The APK URL returns an Android package download.
- The APK archive contains an Android manifest, DEX files and bundled resources.

Physical-device installation and full user-acceptance testing should still be repeated for every new release.

## Additional project context

See [`HANDOVER.md`](./HANDOVER.md) for implementation details, persistence keys, important files, completed commits and guidance for future development sessions.
