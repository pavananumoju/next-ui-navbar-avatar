"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Profile
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Basic account info from Google sign-in. Extended profile fields can live in
          Firestore under <code className="text-xs">users/&lt;uid&gt;</code>.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt=""
                width={64}
                height={64}
                className="rounded-full border border-zinc-200 dark:border-zinc-700"
                unoptimized
              />
            ) : null}
            <div>
              <CardTitle>{user.displayName ?? "Player"}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">UID:</span>{" "}
            <code className="break-all text-xs">{user.uid}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
