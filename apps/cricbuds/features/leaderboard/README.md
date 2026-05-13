# Feature: Leaderboard

Daily / weekly aggregates and “top winners” views.

Suggested layout:

- `queries/` — ranked lists (consider composite Firestore indexes)
- `components/` — tables with loading skeletons
- Heavy aggregation can move to scheduled jobs writing denormalized `leaderboard_daily/{date}` docs
