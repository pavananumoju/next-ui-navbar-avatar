# Feature: Auth

Reserved for Firebase Auth (email magic link, OAuth) or Supabase Auth.

Suggested layout:

- `components/` — login, session badge, sign-out
- `server/` — session verification helpers for Server Actions
- `hooks/use-session.ts` — thin client subscription if needed

Keep secrets out of `NEXT_PUBLIC_*`; use server-only env for admin SDK keys.
