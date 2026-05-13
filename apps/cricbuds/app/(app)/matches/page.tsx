import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function MatchesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Matches
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Replace this stub with Firestore-backed fixtures and toss-based lock times.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sample fixture</CardTitle>
          <CardDescription>
            Dynamic route for squad selection — pass real match and team ids from your
            data layer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/squad/demo-match"
            className={buttonVariants()}
          >
            Open squad picker (demo)
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
