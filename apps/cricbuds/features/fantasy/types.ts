/** Serializable player reference used across UI, Firestore mappers, and APIs. */
export type PlayerRef = {
  id: string;
  name: string;
  teamId: string;
  role?: string;
};

export type FantasySquadDraft = {
  picks: PlayerRef[];
  mvpPlayerId: string | null;
};

export type FantasySquadLocked = {
  picks: [PlayerRef, PlayerRef, PlayerRef];
  mvpPlayerId: string;
  lockedAt: string;
  matchId: string;
};
