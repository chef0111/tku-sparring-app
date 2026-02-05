import { create } from 'zustand';

interface TimerState {
  // Timer values
  timeLeft: number;
  breakTimeLeft: number;

  // Timer status
  isRunning: boolean;
  isBreakTime: boolean;
  roundStarted: boolean;

  // Configuration
  roundDuration: number;
  breakDuration: number;
}

interface TimerActions {
  // Timer controls
  start: () => void;
  pause: () => void;
  toggle: () => void;
  tick: (deltaMs: number) => void;

  // Break timer
  startBreak: () => void;
  tickBreak: (deltaMs: number) => void;

  // Reset
  reset: () => void;
  resetForNextRound: (roundDuration: number) => void;

  // Configuration
  setRoundDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
}

type TimerStore = TimerState & TimerActions;

const DEFAULT_ROUND_DURATION = 60 * 1000; // 60 seconds
const DEFAULT_BREAK_DURATION = 30 * 1000; // 30 seconds

export const useTimerStore = create<TimerStore>()((set, get) => ({
  // Initial state
  timeLeft: DEFAULT_ROUND_DURATION,
  breakTimeLeft: DEFAULT_BREAK_DURATION,
  isRunning: false,
  isBreakTime: false,
  roundStarted: false,
  roundDuration: DEFAULT_ROUND_DURATION,
  breakDuration: DEFAULT_BREAK_DURATION,

  // Actions
  start: () => {
    const state = get();
    if (state.isBreakTime) return;

    set({
      isRunning: true,
      roundStarted: true,
    });
  },

  pause: () => {
    set({ isRunning: false });
  },

  toggle: () => {
    const state = get();
    if (state.isBreakTime) return;

    if (state.isRunning) {
      set({ isRunning: false });
    } else {
      set({
        isRunning: true,
        roundStarted: true,
      });
    }
  },

  tick: (deltaMs) => {
    const state = get();
    if (!state.isRunning || state.isBreakTime) return;

    const newTimeLeft = Math.max(0, state.timeLeft - deltaMs);

    if (newTimeLeft <= 0) {
      set({
        timeLeft: 0,
        isRunning: false,
      });
    } else {
      set({ timeLeft: newTimeLeft });
    }
  },

  startBreak: () => {
    const state = get();
    set({
      isBreakTime: true,
      isRunning: false,
      breakTimeLeft: state.breakDuration,
    });
  },

  tickBreak: (deltaMs) => {
    const state = get();
    if (!state.isBreakTime) return;

    const newBreakTimeLeft = Math.max(0, state.breakTimeLeft - deltaMs);

    if (newBreakTimeLeft <= 0) {
      set({
        breakTimeLeft: 0,
        isBreakTime: false,
      });
    } else {
      set({ breakTimeLeft: newBreakTimeLeft });
    }
  },

  reset: () => {
    const state = get();
    set({
      timeLeft: state.roundDuration,
      breakTimeLeft: state.breakDuration,
      isRunning: false,
      isBreakTime: false,
      roundStarted: false,
    });
  },

  resetForNextRound: (roundDuration) => {
    set({
      timeLeft: roundDuration,
      isRunning: false,
      isBreakTime: false,
      roundStarted: false,
    });
  },

  setRoundDuration: (duration) => {
    set({
      roundDuration: duration,
      timeLeft: duration,
    });
  },

  setBreakDuration: (duration) => {
    set({
      breakDuration: duration,
      breakTimeLeft: duration,
    });
  },
}));
