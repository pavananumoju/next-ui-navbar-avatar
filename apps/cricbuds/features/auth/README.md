# Feature: Auth

Implemented with **Firebase Auth** (Google sign-in popup) and a lightweight `AuthProvider`.

- Client SDK: `lib/firebase/client.ts`
- Context: `features/auth/auth-provider.tsx`
- Login UI: `features/auth/login-form.tsx` → `/login`

### Firebase console

1. Enable **Google** as a sign-in provider.
2. Add authorized domains (localhost + your Vercel domain).
3. Deploy **Firestore rules** from `firestore.rules` (`firebase deploy --only firestore:rules` from `apps/cricbuds`, or paste rules in the console).

User rows are upserted to `users/{uid}` on each sign-in for profile extension later.
