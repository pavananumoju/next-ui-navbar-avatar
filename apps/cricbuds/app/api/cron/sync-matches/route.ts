import { NextRequest, NextResponse } from "next/server";
import { syncMatchesFromRapidApi } from "@/features/matches/sync-from-api";

export const runtime = "nodejs";

/** Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
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
