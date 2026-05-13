"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-provider";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Signed in as{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {user?.email}
            </span>
            .
          </p>
        </div>
        {user?.photoURL && (
          <Image
            src={user.photoURL}
            alt=""
            width={56}
            height={56}
            className="rounded-full border border-zinc-200 dark:border-zinc-700"
            unoptimized
          />
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Matches</CardTitle>
            <CardDescription>
              Live list from Firestore (synced from RapidAPI on the server).
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
            <CardTitle>Profile</CardTitle>
            <CardDescription>Google account details from Firebase Auth.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile" className={buttonVariants({ variant: "outline" })}>
              Open profile
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Daily and weekly rankings (coming next).</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/leaderboard" className={buttonVariants({ variant: "outline" })}>
              Open leaderboard
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Squad rules</CardTitle>
            <CardDescription>3 picks, both teams, MVP — validation in code.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/rules" className={buttonVariants({ variant: "outline" })}>
              Read rules
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
