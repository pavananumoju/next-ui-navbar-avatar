"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  LayoutDashboard,
  CalendarDays,
  Scale,
  Medal,
  UserCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/features/auth/auth-provider";
import { buttonVariants } from "@/components/ui/button";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/matches", label: "Matches", icon: CalendarDays },
  { href: "/leaderboard", label: "Leaderboard", icon: Medal },
  { href: "/rules", label: "Rules", icon: Scale },
];

export function AppHeader() {
  const { user, loading, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <Trophy className="h-4 w-4" aria-hidden />
          </span>
          <span>CricBuds</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
              )}
            >
              <Icon className="h-4 w-4 opacity-70" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <span className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden gap-2 sm:inline-flex",
                )}
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                    unoptimized
                  />
                ) : (
                  <UserCircle className="h-5 w-5" aria-hidden />
                )}
                <span className="max-w-[120px] truncate">
                  {user.displayName ?? "Profile"}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => signOutUser()}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link href="/login" className={buttonVariants({ size: "sm" })}>
              Sign in
            </Link>
          )}
          <Link
            href="/matches"
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 sm:hidden"
          >
            Menu
          </Link>
        </div>
      </div>
    </header>
  );
}
