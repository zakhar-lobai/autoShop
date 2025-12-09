# Mobile App (Expo)

This is the Expo / React Native client for AutoShop. It shares design and data contracts with the `web/` app but ships as native apps for iOS and Android.

## Setup
```bash
cd mobile
npm install
cp .env.example .env   # fill with API endpoints
npx expo start         # press i (iOS), a (Android), or scan with Expo Go
```

Environment keys (public at build time): `EXPO_PUBLIC_BOOKING_ENDPOINT`, `EXPO_PUBLIC_BOOKING_API_URL`, `EXPO_PUBLIC_CONTACT_ENDPOINT`. Keep real values in untracked `.env` files or EAS secrets—never commit them.

## Release builds (EAS)
```bash
eas login
eas secret:create --name EXPO_PUBLIC_BOOKING_ENDPOINT --value https://api.your-domain.com/api/reservations
eas secret:create --name EXPO_PUBLIC_BOOKING_API_URL --value https://api.your-domain.com/api
eas secret:create --name EXPO_PUBLIC_CONTACT_ENDPOINT --value https://api.your-domain.com/api/contact
npx eas build -p android --profile production
npx eas build -p ios --profile production
npx eas submit -p android --latest
npx eas submit -p ios --latest
```

## Security notes
- Do not place secrets in `EXPO_PUBLIC_*`; keep authentication tokens server-side.
- Enforce HTTPS and backend auth/rate-limiting; the app only talks to your API endpoints.
- Run `npx expo doctor` before release and keep dependencies updated.
