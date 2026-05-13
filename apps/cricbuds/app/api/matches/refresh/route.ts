import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { syncMatchesFromRapidApi } from "@/features/matches/sync-from-api";
import { getAdminAuth, getFirebaseAdminApp } from "@/lib/firebase/admin";

export const runtime = "nodejs";

const MIN_INTERVAL_MS = 10 * 60 * 1000;

/** Authenticated manual refresh (uses RapidAPI quota — rate limited). */
export async function POST(request: NextRequest) {
  const h = request.headers.get("authorization");
  const token = h?.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) {
    return new NextResponse("Missing bearer token", { status: 401 });
  }

  try {
    await getAdminAuth().verifyIdToken(token);
  } catch {
    return new NextResponse("Invalid token", { status: 401 });
  }

  const db = getFirestore(getFirebaseAdminApp());
  const meta = await db.doc("meta/matches_sync").get();
  const last = meta.data()?.lastSyncedAt;
  const lastMs =
    last && typeof last.toMillis === "function" ? last.toMillis() : 0;
  if (Date.now() - lastMs < MIN_INTERVAL_MS && lastMs > 0) {
    return NextResponse.json(
      { error: "Rate limited: try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    const result = await syncMatchesFromRapidApi();
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Sync failed" },
      { status: 500 },
    );
  }
}
