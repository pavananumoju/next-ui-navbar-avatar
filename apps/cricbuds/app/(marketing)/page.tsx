import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-25"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-400 blur-3xl dark:bg-emerald-700" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-300 blur-3xl dark:bg-amber-600/60" />
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Next.js App Router · React 19 · Tailwind CSS v4
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
            IPL fantasy, rebuilt for{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              speed and clarity
            </span>
            .
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Modular monolith in{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              apps/cricbuds
            </code>
            . Add auth, scoring, and sync jobs without tangling the UI tree.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className={buttonVariants({ className: "gap-2" })}
            >
              Open app
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "secondary" })}>
              Sign in with Google
            </Link>
            <Link href="/rules" className={buttonVariants({ variant: "outline" })}>
              Fantasy rules
            </Link>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-1 flex-col gap-4 lg:max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Modular features</CardTitle>
              <CardDescription>
                Each domain owns its types, validation, and README for future
                contributors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  features/fantasy
                </strong>{" "}
                — squad rules, Zod schemas, lock helpers.
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  features/matches
                </strong>{" "}
                — RapidAPI sync to Firestore; live reads in the app.
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  features/leaderboard
                </strong>{" "}
                — daily / weekly boards (stub).
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
