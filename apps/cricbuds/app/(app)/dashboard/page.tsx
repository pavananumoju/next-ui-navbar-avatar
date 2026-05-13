import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Entry point after authentication (wire Firebase or Supabase here).
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming picks</CardTitle>
            <CardDescription>
              Choose three players with MVP — enforced in{" "}
              <code className="text-xs">features/fantasy</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/matches" className={buttonVariants({ variant: "outline" })}>
              View matches
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Daily and weekly rankings (data layer stub).</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/leaderboard" className={buttonVariants({ variant: "outline" })}>
              Open leaderboard
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
