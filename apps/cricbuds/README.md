# CricBuds web (v2)

Greenfield Next.js app for the IPL fantasy mini-game. Lives beside the legacy app in this monorepo at `apps/cricbuds`.

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Firebase** (Google Auth + Firestore cache for matches)
- **Zod** for fantasy squad validation
- **next-themes** for light / dark / system

## Environment variables

Copy `.env.example` → `.env.local` and fill:

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_FIREBASE_*` | Web SDK (Auth + Firestore client reads) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Single-line JSON for **firebase-admin** (match sync + token verify) |
| `CRICKET_API_KEY` | RapidAPI key (server only) |
| `CRICKET_MATCHES_PATH` | Optional; default `matches/v1/recent` |
| `CRON_SECRET` | Protects `GET /api/cron/sync-matches` (Vercel Cron sends `Authorization: Bearer …`) |

### One-time Firebase

1. Create a web app, enable **Google** sign-in, download the service account JSON for the **same** project.
2. Paste minified JSON into `FIREBASE_SERVICE_ACCOUNT_JSON` in Vercel / `.env.local`.
3. Deploy **`firestore.rules`** (`firebase.json` is included):  
   `cd apps/cricbuds && firebase deploy --only firestore:rules`  
   or paste rules in the Firestore console.

### Seed matches locally

```bash
export CRON_SECRET=dev-secret
curl -s -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/sync-matches
```

Requires valid `CRICKET_API_KEY` and `FIREBASE_SERVICE_ACCOUNT_JSON`.

## Run locally

```bash
cd apps/cricbuds
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

Set the project root to `apps/cricbuds` in Vercel, or use a monorepo “Root Directory” setting. Copy `.env.example` into project env vars. Add a **Cron Job** pointing to `/api/cron/sync-matches` every 15 minutes (see `vercel.json`).

## Module map

| Path | Purpose |
|------|---------|
| `app/(marketing)` | Public landing at `/` |
| `app/(app)` | Shell + **AuthGate** (requires Google sign-in) |
| `app/login` | Google sign-in |
| `features/fantasy` | Rules constants, types, Zod validation, lock helpers |
| `features/auth` | Firebase Google auth + user doc upsert |
| `features/matches` | RapidAPI → Firestore sync + live `onSnapshot` list |
| `features/leaderboard` | Placeholder for rankings |
| `server/` | README for Server Actions, route handlers, cron |
| `components/ui` | Small reusable primitives (`Button`, `Card`) |
| `lib/firebase/` | Client + Admin Firebase helpers |
| `lib/utils.ts` | `cn()` for class merging |

## Next steps (suggested order)

1. Tune `CRICKET_MATCHES_PATH` / normalizer for the exact payload your RapidAPI tier returns.
2. Add toss / lock timestamps on match documents and enforce them in Server Actions for squad writes.
3. Build squad picker UI + Server Action calling `parseFantasySquad` and lock checks.
4. Add leaderboard queries and optional cron rollups under `features/leaderboard`.

Legacy reference implementation: [next-ui-navbar-avatar](https://github.com/pavananumoju/next-ui-navbar-avatar) (`pages/`, `components/utils/firebase-db-utils.js`).
