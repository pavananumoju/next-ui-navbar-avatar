/** Normalized match row stored in Firestore `matches/{id}`. */
export type MatchRecord = {
  id: string;
  description: string;
  format?: string;
  seriesName?: string;
  team1Short: string;
  team2Short: string;
  team1Full: string;
  team2Full: string;
  state?: string;
  statusText?: string;
  /** Epoch ms when known (from API); may be null */
  startTimeMs: number | null;
  venue?: string;
  /** ISO string set at sync time for simple ordering */
  syncedAt: string;
};
