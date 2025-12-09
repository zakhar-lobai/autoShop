# Web App (React)

React app built with Create React App, ready for deployment to Vercel.

## Setup
```bash
cd web
npm install
cp .env.example .env   # fill with Firebase + API endpoints
npm start              # http://localhost:3000
```

Required environment variables:
- Firebase: `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_DATABASE_URL`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`, `FIREBASE_MEASUREMENT_ID`
- APIs: `REACT_APP_BOOKING_ENDPOINT`, `REACT_APP_API_BASE`

## Production build & Vercel
```bash
npm run build
# Deploy the /web folder in Vercel:
# - Root: web
# - Build command: npm run build
# - Output: build
# - Node version: 18
```
Set all environment variables in the Vercel dashboard; do not commit `.env`.

## Security notes
- Firebase keys must be domain-restricted and backed by Firestore/Storage security rules.
- APIs must enforce auth/rate limits; client-side env values are public.
- Run `npm audit` and keep dependencies patched.
