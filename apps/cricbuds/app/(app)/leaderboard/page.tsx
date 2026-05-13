import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Leaderboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Split daily vs weekly views; consider materialized leaderboard documents updated
          by cron jobs for scale.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily</CardTitle>
            <CardDescription>Top scores for the selected match day.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500 dark:text-zinc-400">
            No data yet — connect Firestore queries under{" "}
            <code className="text-xs">features/leaderboard</code>.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly</CardTitle>
            <CardDescription>Rolling window across the IPL week.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500 dark:text-zinc-400">
            Stub — add aggregation pipeline or scheduled rollups.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
