import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Fantasy rules
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Keep marketing copy here; keep authoritative validation in{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            features/fantasy/validation.ts
          </code>
          .
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gameplay</CardTitle>
          <CardDescription>Aligned with the legacy CricBuds mini-game.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Select exactly three players for a listed head-to-head match.</li>
            <li>Include at least one player from each side.</li>
            <li>Designate a single MVP from your trio for bonus scoring.</li>
            <li>Submit before the published lock time (typically toss or first ball).</li>
            <li>Submitted squads are immutable after lock — server must reject late writes.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
