# Feature: Matches

## Data flow

1. **Server** calls RapidAPI (Cricbuzz) using `CRICKET_API_KEY` — never from the browser.
2. Responses are normalized (`normalize.ts`) and written to Firestore `matches/{matchId}` via **Firebase Admin** (`sync-from-api.ts`).
3. **Browser** subscribes to Firestore with `onSnapshot` (`components/matches-feed.tsx`) so the list updates live when sync runs.

### Triggers

| Route | Purpose |
|-------|---------|
| `GET /api/cron/sync-matches` | Vercel Cron (or manual `curl`) with `Authorization: Bearer $CRON_SECRET` |
| `POST /api/matches/refresh` | Signed-in user; verifies Firebase ID token; **10 min** cooldown vs last sync |

### Env

See root `.env.example`: `CRICKET_MATCHES_PATH` defaults to `matches/v1/recent` (same host pattern as the legacy [`firebase-db-utils.js` RapidAPI fetch](https://github.com/pavananumoju/next-ui-navbar-avatar/blob/main/components/utils/firebase-db-utils.js)). Override if your RapidAPI plan exposes a different path (e.g. series schedule).

### Firestore

Deploy `firestore.rules` so authenticated users can **read** `matches` and `meta`; only the Admin SDK can **write** (sync).
