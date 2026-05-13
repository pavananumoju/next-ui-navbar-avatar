import {
  FANTASY_PICK_COUNT,
  MIN_PLAYERS_PER_TEAM,
  MAX_PLAYERS_PER_TEAM,
} from "@/features/fantasy/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PageProps = { params: Promise<{ matchId: string }> };

export default async function SquadPage({ params }: PageProps) {
  const { matchId } = await params;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Squad · {matchId}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Client picker UI and Server Actions land here. Always re-validate lock deadline
          on the server before persisting.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fantasy rules (summary)</CardTitle>
          <CardDescription>
            Implemented as typed constants + Zod in{" "}
            <code className="text-xs">features/fantasy</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <ul className="list-inside list-disc space-y-1">
            <li>Pick exactly {FANTASY_PICK_COUNT} players.</li>
            <li>
              At least {MIN_PLAYERS_PER_TEAM} from each team, at most{" "}
              {MAX_PLAYERS_PER_TEAM} from a single team (two-team IPL match).
            </li>
            <li>Choose one MVP from your three picks.</li>
            <li>No edits after the lock deadline (toss / match start — your data model).</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
