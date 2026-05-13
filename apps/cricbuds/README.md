# CricBuds web (v2)

Greenfield Next.js app for the IPL fantasy mini-game. Lives beside the legacy app in this monorepo at `apps/cricbuds`.

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Zod** for fantasy squad validation
- **next-themes** for light / dark / system

## Run locally

```bash
cd apps/cricbuds
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

Set the project root to `apps/cricbuds` in Vercel, or use a monorepo “Root Directory” setting. Copy `.env.example` into project env vars.

## Module map

| Path | Purpose |
|------|---------|
| `app/(marketing)` | Public landing at `/` |
| `app/(app)` | Authenticated-style shell with header (`/dashboard`, `/matches`, …) |
| `features/fantasy` | Rules constants, types, Zod validation, lock helpers |
| `features/auth` | Placeholder README for auth integration |
| `features/matches` | Placeholder for schedules + lock deadlines |
| `features/leaderboard` | Placeholder for rankings |
| `server/` | README for Server Actions, route handlers, cron |
| `components/ui` | Small reusable primitives (`Button`, `Card`) |
| `lib/utils.ts` | `cn()` for class merging |

## Next steps (suggested order)

1. Add Firebase or Supabase client + server session checks under `features/auth` and `server/`.
2. Implement match list + lock timestamps under `features/matches` with Server Components.
3. Build squad picker UI + Server Action calling `parseFantasySquad` and deadline checks.
4. Add leaderboard queries and optional cron rollups under `features/leaderboard`.

Legacy reference implementation remains at the repository root (`pages/`, `components/`).
