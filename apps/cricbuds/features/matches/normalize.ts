import type { MatchRecord } from "./types";

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function teamShort(team: unknown): string {
  const t = asRecord(team);
  if (!t) return "?";
  return String(t.teamSName ?? t.teamName ?? "?");
}

function teamFull(team: unknown): string {
  const t = asRecord(team);
  if (!t) return "?";
  return String(t.teamName ?? t.teamSName ?? "?");
}

function readState(matchInfo: Record<string, unknown>): {
  state?: string;
  statusText?: string;
} {
  const st = asRecord(matchInfo.state);
  if (!st) return {};
  return {
    state: typeof st.state === "string" ? st.state : undefined,
    statusText: typeof st.statusStr === "string" ? st.statusStr : undefined,
  };
}

function readVenue(matchInfo: Record<string, unknown>): string | undefined {
  const v = asRecord(matchInfo.venueInfo);
  if (!v) return undefined;
  return typeof v.ground === "string" ? v.ground : undefined;
}

function readStartTimeMs(matchInfo: Record<string, unknown>): number | null {
  const start = matchInfo.startDate;
  if (typeof start === "number" && Number.isFinite(start)) return start;
  return null;
}

function normalizeOneMatch(
  wrapped: Record<string, unknown>,
  syncedAt: string,
  seriesHint?: string,
): MatchRecord | null {
  const info = asRecord(wrapped.matchInfo);
  if (!info) return null;
  const id = info.matchId != null ? String(info.matchId) : null;
  if (!id) return null;
  const desc = String(
    info.matchDesc ?? `${teamShort(info.team1)} vs ${teamShort(info.team2)}`,
  );
  const { state, statusText } = readState(info);
  const seriesName =
    typeof info.seriesName === "string"
      ? info.seriesName
      : typeof seriesHint === "string"
        ? seriesHint
        : undefined;

  return {
    id,
    description: desc,
    format: typeof info.matchFormat === "string" ? info.matchFormat : undefined,
    seriesName,
    team1Short: teamShort(info.team1),
    team2Short: teamShort(info.team2),
    team1Full: teamFull(info.team1),
    team2Full: teamFull(info.team2),
    state,
    statusText,
    startTimeMs: readStartTimeMs(info),
    venue: readVenue(info),
    syncedAt,
  };
}

/**
 * Walks the Cricbuzz RapidAPI JSON tree (recent / live / schedule responses)
 * and collects unique matches wherever a `matchInfo` object appears.
 */
export function extractMatchRecords(apiJson: unknown): MatchRecord[] {
  const byId = new Map<string, MatchRecord>();
  const syncedAt = new Date().toISOString();

  function consider(node: unknown, seriesHint?: string) {
    const o = asRecord(node);
    if (!o) return;

    if (o.matchInfo) {
      const rec = normalizeOneMatch(o, syncedAt, seriesHint);
      if (rec) byId.set(rec.id, rec);
      return;
    }

    const nextSeries =
      typeof o.seriesName === "string" ? o.seriesName : seriesHint;

    for (const value of Object.values(o)) {
      if (Array.isArray(value)) {
        for (const item of value) consider(item, nextSeries);
      } else {
        consider(value, nextSeries);
      }
    }
  }

  consider(apiJson);
  return [...byId.values()];
}
