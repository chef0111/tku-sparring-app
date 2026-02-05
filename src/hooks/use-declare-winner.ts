import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { Player } from '@/stores/player-store';
import { usePlayerStore } from '@/stores/player-store';
import { useMatchStore } from '@/stores/match-store';
import { useTimerStore } from '@/stores/timer-store';

export const useDeclareWinner = (player: Player) => {
  const { roundStarted, isBreakTime, isRunning, startBreak, setRoundEnded } =
    useTimerStore(
      useShallow((s) => ({
        roundStarted: s.roundStarted,
        isBreakTime: s.isBreakTime,
        isRunning: s.isRunning,
        startBreak: s.startBreak,
        setRoundEnded: s.setRoundEnded,
      }))
    );

  const currentRound = useMatchStore((s) => s.currentRound);
  const recordRoundWinner = useMatchStore((s) => s.recordRoundWinner);
  const saveRoundScores = usePlayerStore((s) => s.saveRoundScores);

  return useCallback(() => {
    if (isBreakTime || isRunning || !roundStarted) return;

    saveRoundScores(currentRound - 1);
    recordRoundWinner(player);
    setRoundEnded(true);
    startBreak();
  }, [
    isBreakTime,
    isRunning,
    currentRound,
    roundStarted,
    player,
    saveRoundScores,
    recordRoundWinner,
    setRoundEnded,
    startBreak,
  ]);
};
