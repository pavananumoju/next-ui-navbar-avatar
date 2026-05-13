import { z } from "zod";
import {
  FANTASY_PICK_COUNT,
  MAX_PLAYERS_PER_TEAM,
  MIN_PLAYERS_PER_TEAM,
} from "./constants";
import type { PlayerRef } from "./types";

const playerRefSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  teamId: z.string().min(1),
  role: z.string().optional(),
});

export const fantasySquadSchema = z
  .object({
    picks: z.array(playerRefSchema).length(FANTASY_PICK_COUNT),
    mvpPlayerId: z.string().min(1),
    matchId: z.string().min(1),
  })
  .superRefine((val, ctx) => {
    const teamCounts = countByTeam(val.picks);
    const teamIds = Object.keys(teamCounts);
    if (teamIds.length !== 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Picks must include players from exactly two teams (IPL head-to-head).",
        path: ["picks"],
      });
      return;
    }
    for (const tid of teamIds) {
      const c = teamCounts[tid];
      if (c < MIN_PLAYERS_PER_TEAM || c > MAX_PLAYERS_PER_TEAM) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Each team needs between ${MIN_PLAYERS_PER_TEAM} and ${MAX_PLAYERS_PER_TEAM} players.`,
          path: ["picks"],
        });
      }
    }
    if (!val.picks.some((p) => p.id === val.mvpPlayerId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "MVP must be one of the selected players.",
        path: ["mvpPlayerId"],
      });
    }
  });

export type FantasySquadInput = z.infer<typeof fantasySquadSchema>;

export function countByTeam(picks: PlayerRef[]): Record<string, number> {
  return picks.reduce<Record<string, number>>((acc, p) => {
    acc[p.teamId] = (acc[p.teamId] ?? 0) + 1;
    return acc;
  }, {});
}

/** Server-side guard: squad edits forbidden at or after lock instant. */
export function isPastLockDeadline(lockAtMs: number, nowMs = Date.now()): boolean {
  return nowMs >= lockAtMs;
}

export function parseFantasySquad(input: unknown) {
  return fantasySquadSchema.safeParse(input);
}
