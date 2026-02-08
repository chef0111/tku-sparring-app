import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { Player } from '@/stores/player-store';
import { usePlayerStore } from '@/stores/player-store';
import { useMatchStore } from '@/stores/match-store';
import { useTimerStore } from '@/stores/timer-store';

type WinResult = Player | 'tie';

export const useDeclareWinner = () => {
  const { red, blue, saveRoundScores, resetRoundStats } = usePlayerStore(
    useShallow((s) => ({
      red: s.red,
      blue: s.blue,
      saveRoundScores: s.saveRoundScores,
      resetRoundStats: s.resetRoundStats,
    }))
  );

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

  const {
    currentRound,
    recordRoundWinner,
    declareWinner: getWinner,
  } = useMatchStore(
    useShallow((s) => ({
      currentRound: s.currentRound,
      recordRoundWinner: s.recordRoundWinner,
      declareWinner: s.declareWinner,
    }))
  );

  const determineWinner = useCallback((): WinResult => {
    return getWinner(red, blue);
  }, [red, blue, getWinner]);

  const declareWinner = useCallback(() => {
    if (isBreakTime || isRunning || !roundStarted) return;

    const winner = determineWinner();
    saveRoundScores(currentRound - 1);

    if (winner !== 'tie') {
      recordRoundWinner(winner);
    }

    setRoundEnded(true);
    resetRoundStats();
    startBreak();
  }, [
    isBreakTime,
    isRunning,
    roundStarted,
    currentRound,
    determineWinner,
    saveRoundScores,
    recordRoundWinner,
    setRoundEnded,
    resetRoundStats,
    startBreak,
  ]);

  const forceWinner = useCallback(
    (player: Player) => {
      if (isBreakTime || isRunning || !roundStarted) return;

      saveRoundScores(currentRound - 1);
      recordRoundWinner(player);
      setRoundEnded(true);
      resetRoundStats();
      startBreak();
    },
    [
      isBreakTime,
      isRunning,
      roundStarted,
      currentRound,
      saveRoundScores,
      recordRoundWinner,
      setRoundEnded,
      resetRoundStats,
      startBreak,
    ]
  );

  return {
    determineWinner,
    declareWinner,
    forceWinner,
  };
};
