"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import { RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { MatchRecord } from "@/features/matches/types";
import { cn } from "@/lib/utils";

type Row = MatchRecord & { updatedAt?: Timestamp };

export function MatchesFeed() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [meta, setMeta] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const db = getFirebaseDb();
    const q = query(
      collection(db, "matches"),
      orderBy("syncedAt", "desc"),
      limit(80),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setRows(
          snap.docs.map((d) => {
            const data = d.data() as Row;
            return { ...data, id: d.id };
          }),
        );
        setMeta(null);
      },
      (err) => {
        console.error(err);
        setMeta(
          "Could not subscribe to matches. Check Firestore rules and create a composite index if the console link appears in logs.",
        );
      },
    );
    return () => unsub();
  }, [user]);

  async function manualRefresh() {
    if (!user) return;
    setRefreshError(null);
    setRefreshing(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/matches/refresh", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setRefreshError(body.error ?? `Request failed (${res.status})`);
      }
    } catch (e) {
      setRefreshError(e instanceof Error ? e.message : "Refresh failed");
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Matches
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Data is loaded from Firestore in real time. A scheduled job (or the
            refresh button) calls the cricket API on the server, then writes
            results to the database so the app does not hit RapidAPI on every
            page view.
          </p>
        </div>
        <button
          type="button"
          onClick={manualRefresh}
          disabled={refreshing}
          className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          {refreshing ? "Refreshing…" : "Refresh from API"}
        </button>
      </div>
      {refreshError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
          {refreshError}
        </p>
      )}
      {meta && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          {meta}
        </p>
      )}
      {rows.length === 0 && !meta ? (
        <Card>
          <CardHeader>
            <CardTitle>No matches in Firestore yet</CardTitle>
            <CardDescription>
              Run a sync: set{" "}
              <code className="text-xs">CRON_SECRET</code> locally, then{" "}
              <code className="text-xs">
                curl -H &quot;Authorization: Bearer $CRON_SECRET&quot;
                http://localhost:3000/api/cron/sync-matches
              </code>
              , or use the refresh button (requires server env for RapidAPI +
              service account).
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {rows.map((m) => (
            <li key={m.id}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardDescription className="line-clamp-1">
                    {m.seriesName ?? "Match"}
                    {m.format ? ` · ${m.format}` : ""}
                  </CardDescription>
                  <CardTitle className="text-lg">{m.description}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {m.team1Short}
                    </span>{" "}
                    vs{" "}
                    <span className="font-semibold text-teal-700 dark:text-teal-400">
                      {m.team2Short}
                    </span>
                  </p>
                  {m.statusText && <p className="text-zinc-500">{m.statusText}</p>}
                  {m.venue && <p className="text-xs text-zinc-500">{m.venue}</p>}
                  <p className="text-xs text-zinc-400">
                    Synced {new Date(m.syncedAt).toLocaleString()}
                  </p>
                  <Link
                    href={`/squad/${m.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "mt-2 inline-flex",
                    )}
                  >
                    Squad (demo)
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
