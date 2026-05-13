import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { extractMatchRecords } from "./normalize";
import { getFirebaseAdminApp } from "@/lib/firebase/admin";

export type SyncResult = {
  ok: true;
  written: number;
  path: string;
};

function cricketUrl(): { url: string; path: string } {
  const host =
    process.env.CRICKET_API_HOST ?? "cricbuzz-cricket.p.rapidapi.com";
  const path =
    process.env.CRICKET_MATCHES_PATH ?? "matches/v1/recent";
  return { url: `https://${host}/${path}`, path };
}

export async function syncMatchesFromRapidApi(): Promise<SyncResult> {
  const key = process.env.CRICKET_API_KEY;
  if (!key) {
    throw new Error("CRICKET_API_KEY is not set.");
  }

  const { url, path } = cricketUrl();
  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host":
        process.env.CRICKET_API_HOST ?? "cricbuzz-cricket.p.rapidapi.com",
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cricket API ${res.status}: ${text.slice(0, 500)}`);
  }

  const json: unknown = await res.json();
  const matches = extractMatchRecords(json);
  const db = getFirestore(getFirebaseAdminApp());
  const col = db.collection("matches");
  const chunkSize = 400;

  for (let i = 0; i < matches.length; i += chunkSize) {
    const batch = db.batch();
    const slice = matches.slice(i, i + chunkSize);
    for (const m of slice) {
      const ref = col.doc(m.id);
      batch.set(
        ref,
        {
          ...m,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    }
    await batch.commit();
  }

  const metaBatch = db.batch();
  const meta = db.doc("meta/matches_sync");
  metaBatch.set(
    meta,
    {
      lastSyncedAt: FieldValue.serverTimestamp(),
      lastSyncedAtIso: new Date().toISOString(),
      matchCount: matches.length,
      sourcePath: path,
    },
    { merge: true },
  );
  await metaBatch.commit();

  return { ok: true, written: matches.length, path };
}
