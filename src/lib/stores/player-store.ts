import { create } from 'zustand';
import type { HitType } from '@/lib/scoreboard/hit-types';
import { HIT_COOLDOWN, HIT_DAMAGE_MAP } from '@/lib/scoreboard/hit-types';

export type Player = 'red' | 'blue';

export interface PlayerData {
  score: number;
  health: number;
  hits: number;
  fouls: number;
  mana: number;
  technique: number;
  headHits: number;
  roundScores: Array<number>;
}

interface HitInfo {
  hitType: HitType;
  timestamp: number;
}

interface PlayerState {
  // Player data
  red: PlayerData;
  blue: PlayerData;

  // Configuration
  maxHealth: number;
  maxMana: number;

  lastRedHit: HitInfo | null;
  lastBlueHit: HitInfo | null;

  // Cooldown tracking
  lastHitTimes: Record<Player, number>;
}

interface PlayerActions {
  // Scoring
  recordHit: (
    player: Player,
    hitType: HitType,
    isTimerRunning: boolean,
    isBreakTime: boolean
  ) => boolean; // Returns true if KO occurred

  // Penalties
  addPenalty: (player: Player) => boolean; // Returns true if disqualified
  removePenalty: (player: Player) => void;

  // Reset
  resetScores: () => void;
  resetHealth: () => void;
  resetForNextRound: () => void;
  resetAll: () => void;

  // Round scores
  saveRoundScores: (roundIndex: number) => void;

  // Configuration
  setMaxHealth: (health: number) => void;
  setMaxMana: (mana: number) => void;
}

type PlayerStore = PlayerState & PlayerActions;

const createInitialPlayerData = (maxHealth = 120, maxMana = 5): PlayerData => ({
  score: 0,
  health: maxHealth,
  hits: 0,
  fouls: 0,
  mana: maxMana,
  technique: 0,
  headHits: 0,
  roundScores: [0, 0, 0],
});

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
  // Initial state
  red: createInitialPlayerData(),
  blue: createInitialPlayerData(),
  maxHealth: 120,
  maxMana: 5,
  lastRedHit: null,
  lastBlueHit: null,
  lastHitTimes: { red: 0, blue: 0 },

  // Actions
  recordHit: (player, hitType, isTimerRunning, isBreakTime) => {
    const state = get();
    const currentTime = Date.now();

    // Prevent rapid hits (cooldown)
    if (currentTime - state.lastHitTimes[player] < HIT_COOLDOWN) {
      return false;
    }

    // Don't allow hits during break time or when timer not running
    if (isBreakTime || !isTimerRunning) {
      return false;
    }

    const opponent: Player = player === 'red' ? 'blue' : 'red';
    const damage = HIT_DAMAGE_MAP[hitType];
    const points = damage;

    const opponentHealth = Math.max(0, state[opponent].health - damage);
    const playerScore = Math.min(state.maxHealth, state[player].score + points);

    // Track technique points for 4 or 5 point hits (20 or 25 damage)
    const technique =
      damage >= 20 ? state[player].technique + damage : state[player].technique;

    // Track head hits for 3 point hits (15 damage)
    const headHits =
      damage === 15 ? state[player].headHits + 1 : state[player].headHits;

    // Set the appropriate player's lastHit
    const hitUpdate =
      player === 'red'
        ? { lastRedHit: { hitType, timestamp: currentTime } }
        : { lastBlueHit: { hitType, timestamp: currentTime } };

    set({
      [opponent]: {
        ...state[opponent],
        health: opponentHealth,
      },
      [player]: {
        ...state[player],
        score: playerScore,
        hits: state[player].hits + 1,
        technique,
        headHits,
      },
      ...hitUpdate,
      lastHitTimes: {
        ...state.lastHitTimes,
        [player]: currentTime,
      },
    });

    // Return true if KO occurred
    return opponentHealth <= 0;
  },

  addPenalty: (player) => {
    const state = get();
    const newMana = Math.max(0, state[player].mana - 1);
    const newFouls = state[player].fouls + 1;

    set({
      [player]: {
        ...state[player],
        mana: newMana,
        fouls: newFouls,
      },
    });

    // Return true if disqualified (mana depleted)
    return newMana <= 0;
  },

  removePenalty: (player) => {
    const state = get();
    if (state[player].fouls <= 0) return;

    set({
      [player]: {
        ...state[player],
        mana: Math.min(state.maxMana, state[player].mana + 1),
        fouls: state[player].fouls - 1,
      },
    });
  },

  resetScores: () => {
    const state = get();
    set({
      red: { ...state.red, score: 0 },
      blue: { ...state.blue, score: 0 },
    });
  },

  resetHealth: () => {
    const state = get();
    set({
      red: { ...state.red, health: state.maxHealth },
      blue: { ...state.blue, health: state.maxHealth },
    });
  },

  resetForNextRound: () => {
    const state = get();
    set({
      red: {
        ...state.red,
        score: 0,
        health: state.maxHealth,
        hits: 0,
        fouls: 0,
        mana: state.maxMana,
        technique: 0,
        headHits: 0,
      },
      blue: {
        ...state.blue,
        score: 0,
        health: state.maxHealth,
        hits: 0,
        fouls: 0,
        mana: state.maxMana,
        technique: 0,
        headHits: 0,
      },
      lastRedHit: null,
      lastBlueHit: null,
    });
  },

  resetAll: () => {
    const state = get();
    set({
      red: createInitialPlayerData(state.maxHealth, state.maxMana),
      blue: createInitialPlayerData(state.maxHealth, state.maxMana),
      lastRedHit: null,
      lastBlueHit: null,
      lastHitTimes: { red: 0, blue: 0 },
    });
  },

  saveRoundScores: (roundIndex) => {
    const state = get();
    const redRoundScores = [...state.red.roundScores];
    const blueRoundScores = [...state.blue.roundScores];
    redRoundScores[roundIndex] = state.red.score;
    blueRoundScores[roundIndex] = state.blue.score;

    set({
      red: { ...state.red, roundScores: redRoundScores },
      blue: { ...state.blue, roundScores: blueRoundScores },
    });
  },

  setMaxHealth: (health) => {
    const state = get();
    set({
      maxHealth: health,
      red: { ...state.red, health },
      blue: { ...state.blue, health },
    });
  },

  setMaxMana: (mana) => {
    set({ maxMana: mana });
  },
}));
