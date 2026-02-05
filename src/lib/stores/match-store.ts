import { create } from 'zustand';
import type { Player, PlayerData } from './player-store';

interface MatchState {
  // Match identification
  matchId: string;

  // Round tracking
  currentRound: number;
  maxRounds: number;
  roundWinners: Array<Player | null>;

  // Win tracking
  redWon: number;
  blueWon: number;
}

interface MatchActions {
  // Match controls
  setMatchId: (id: string) => void;

  // Round management
  nextRound: () => void;
  recordRoundWinner: (winner: Player) => void;

  // Winner determination
  declareWinner: (red: PlayerData, blue: PlayerData) => Player | 'tie';

  // Reset
  resetMatch: () => void;
  resetRound: () => void;

  // Configuration
  setMaxRounds: (rounds: number) => void;
}

type MatchStore = MatchState & MatchActions;

export const useMatchStore = create<MatchStore>()((set, get) => ({
  // Initial state
  matchId: '001',
  currentRound: 1,
  maxRounds: 3,
  roundWinners: [],
  redWon: 0,
  blueWon: 0,

  // Actions
  setMatchId: (id) => {
    set({ matchId: id });
  },

  nextRound: () => {
    const state = get();
    const nextRound = state.currentRound + 1;

    if (nextRound > state.maxRounds) return;

    set({ currentRound: nextRound });
  },

  recordRoundWinner: (winner) => {
    const state = get();
    const roundIndex = state.currentRound - 1;

    const roundWinners = [...state.roundWinners];
    roundWinners[roundIndex] = winner;

    const redWon = winner === 'red' ? state.redWon + 1 : state.redWon;
    const blueWon = winner === 'blue' ? state.blueWon + 1 : state.blueWon;

    set({
      roundWinners,
      redWon,
      blueWon,
    });
  },

  declareWinner: (red, blue): Player | 'tie' => {
    const state = get();

    // Check for mana depletion (penalties)
    if (red.mana <= 0 && blue.health > 0 && red.health > 0) return 'blue';
    if (blue.mana <= 0 && red.health > 0 && blue.health > 0) return 'red';

    // Check for health depletion (KO)
    if (blue.health <= 0 && red.mana > 0 && blue.mana > 0) return 'red';
    if (red.health <= 0 && blue.mana > 0 && red.mana > 0) return 'blue';

    // Compare remaining health
    if (red.health > blue.health) return 'red';
    if (blue.health > red.health) return 'blue';

    // Compare fouls
    if (red.fouls < blue.fouls) return 'red';
    if (blue.fouls < red.fouls) return 'blue';

    // Compare technique points
    if (red.technique > blue.technique) return 'red';
    if (blue.technique > red.technique) return 'blue';

    // Compare head hits
    if (red.headHits > blue.headHits) return 'red';
    if (blue.headHits > red.headHits) return 'blue';

    return 'tie';
  },

  resetMatch: () => {
    set({
      currentRound: 1,
      roundWinners: [],
      redWon: 0,
      blueWon: 0,
    });
  },

  resetRound: () => {
    // Round state is managed through currentRound, nothing else to reset here
  },

  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds });
  },
}));
