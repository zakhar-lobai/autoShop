# AutoShop Monorepo (Web + Mobile)

This repository contains two client apps:
- `web/` — React web app (CRA) deployable to Vercel.
- `mobile/` — Expo / React Native app targeting iOS (App Store) and Android (Play Store).
- `backend/` — server code or APIs you host; keep all secrets there (never in the apps).

The project is set up with security-first defaults: no API keys or secrets are committed, and both apps load their configuration from environment variables.

## Security Checklist (do this before pushing)
- Never commit `.env` files. Use the provided `*.env.example` templates and store real values in Vercel / EAS secrets or local untracked files.
- Rotate any Firebase/API keys that were previously committed (we removed tracked `.env` files in this update).
- Keep all private endpoints behind authenticated APIs; only expose public, rate-limited endpoints to the clients.
- For Firebase: enforce Firestore/Storage rules and restrict API keys to allowed domains/package names/signing certificates.
- Treat `EXPO_PUBLIC_*` variables as public (they are embedded at build time); keep true secrets on the server.

## Prerequisites
- Node.js 18+ and npm 9+ (for both web and mobile)
- Expo CLI (`npm install -g expo-cli`) and EAS CLI (`npm install -g eas-cli`) for native builds
- A Vercel account (for web) and Apple/Google developer accounts (for store submission)

## Environment Variables
Create `.env` files locally from the templates:
- Web: `cp web/.env.example web/.env`
- Mobile: `cp mobile/.env.example mobile/.env`

Required keys (set them in Vercel and EAS/Expo as project secrets):
- Firebase (web): `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_DATABASE_URL`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`, `FIREBASE_MEASUREMENT_ID`
- API endpoints (web): `REACT_APP_BOOKING_ENDPOINT`, `REACT_APP_API_BASE`
- API endpoints (mobile): `EXPO_PUBLIC_BOOKING_ENDPOINT`, `EXPO_PUBLIC_BOOKING_API_URL`, `EXPO_PUBLIC_CONTACT_ENDPOINT`

## Local Development
### Web
```bash
cd web
npm install
npm start   # runs on http://localhost:3000
```

### Mobile (Expo)
```bash
cd mobile
npm install
npx expo start       # press i for iOS Simulator, a for Android emulator, or use Expo Go
```

## Production Builds
### Web → Vercel
1) In Vercel, create a project pointing to the `web` folder (root: `web/`).
2) Set environment variables in the Vercel dashboard (same keys as above).
3) Build command: `npm run build`; Output directory: `build`.
4) Use Node 18 runtime in Vercel settings.

### Mobile → App Store / Play Store (EAS)
1) Login and configure EAS: `eas login`.
2) Set secrets (do **not** commit): `eas secret:create --name EXPO_PUBLIC_BOOKING_ENDPOINT --value https://api.your-domain.com/api/reservations` (repeat for other keys).
3) Android release build: `npx eas build -p android --profile production`.
4) iOS release build: `npx eas build -p ios --profile production`.
5) Submit artifacts:
   - Android: `npx eas submit -p android --latest`.
   - iOS: `npx eas submit -p ios --latest`.
6) Prepare store listings (icons, screenshots, privacy policy, content ratings).

## Hardening Tips
- Enforce HTTPS everywhere and HSTS on your API domain.
- Add rate limiting, input validation, and auth to backend endpoints.
- Enable minification/obfuscation for mobile builds (handled by Expo production builds).
- Monitor with crash reporting/analytics configured via environment (kept private).
- Regularly audit dependencies (`npm audit`, `npx expo doctor`).

## Repository Structure
- `web/` — React app with CRA, ready for Vercel.
- `mobile/` — Expo app using file-based routing via `expo-router`.
- `backend/` — place server/API code; expose only necessary routes to the clients.

## Quick Troubleshooting
- Blank API responses: verify the `*_ENDPOINT` env vars in Vercel/EAS and that CORS allows your domains.
- Firebase errors: confirm the keys match the project and that Firestore/Storage rules permit the requested operations.
- Expo build failures: run `npx expo doctor` and ensure all secrets are set via `eas secret:list`.
