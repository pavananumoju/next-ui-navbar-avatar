"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/auth-provider";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, configError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || configError) return;
    if (!user) {
      const next = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?next=${next}`);
    }
  }, [user, loading, configError, router, pathname]);

  if (configError) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        <p className="font-medium">Configuration required</p>
        <p className="mt-2 text-amber-900/90 dark:text-amber-100/90">{configError}</p>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm text-zinc-500">
        Loading session…
      </div>
    );
  }

  return <>{children}</>;
}
