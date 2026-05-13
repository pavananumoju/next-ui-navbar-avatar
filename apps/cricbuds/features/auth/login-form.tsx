"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";

export function LoginForm() {
  const { signInWithGoogle, configError, user, loading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    const dest = next && next.startsWith("/") ? next : "/dashboard";
    router.replace(dest);
  }, [loading, user, next, router]);

  async function onGoogle() {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading || user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-zinc-500">
        Redirecting…
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use Google to access matches and your fantasy squad (Firestore rules
            require authentication).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {configError && (
            <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
              {configError}
            </p>
          )}
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
              {error}
            </p>
          )}
          <button
            type="button"
            disabled={busy || !!configError}
            onClick={onGoogle}
            className={buttonVariants({ className: "w-full" })}
          >
            {busy ? "Signing in…" : "Continue with Google"}
          </button>
          <Link
            href="/"
            className="block text-center text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
          >
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
