# Server layer

Use **Server Actions** and **Route Handlers** for:

- Validating lock deadlines before accepting squad writes (never trust the client alone)
- Proxying cricket APIs with private keys
- Cron-triggered sync jobs (Vercel Cron)

Suggested files (add as you implement):

- `actions/squad.ts` — `use server` mutations with auth + deadline checks
- `cron/sync-matches/route.ts` — guarded with `CRON_SECRET` header
