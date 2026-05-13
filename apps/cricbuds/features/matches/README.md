# Feature: Matches

Schedules, toss time, and lock deadlines should live here.

Suggested layout:

- `data/` — Firestore readers + DTO mappers
- `components/` — match cards, filters
- Wire external cricket APIs via **server-only** routes or cron (Vercel Cron + Route Handlers)
