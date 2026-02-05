import { useCallback } from 'react';
import type { Player } from '@/stores/player-store';
import { usePlayerStore } from '@/stores/player-store';
import { useMatchStore } from '@/stores/match-store';
import { useTimerStore } from '@/stores/timer-store';

export const useDeclareWinner = (player: Player) => {
  const isBreakTime = useTimerStore((s) => s.isBreakTime);
  const isRunning = useTimerStore((s) => s.isRunning);
  const currentRound = useMatchStore((s) => s.currentRound);
  const recordRoundWinner = useMatchStore((s) => s.recordRoundWinner);
  const saveRoundScores = usePlayerStore((s) => s.saveRoundScores);
  const startBreak = useTimerStore((s) => s.startBreak);
  const setRoundEnded = useTimerStore((s) => s.setRoundEnded);

  return useCallback(() => {
    if (isBreakTime || isRunning) return;

    saveRoundScores(currentRound - 1);
    recordRoundWinner(player);
    setRoundEnded(true);
    startBreak();
  }, [
    isBreakTime,
    isRunning,
    currentRound,
    player,
    saveRoundScores,
    recordRoundWinner,
    setRoundEnded,
    startBreak,
  ]);
};
