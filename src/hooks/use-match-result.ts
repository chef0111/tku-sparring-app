import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useMatchStore } from '@/stores/match-store';
import { useTimerStore } from '@/stores/timer-store';
import { usePlayerStore } from '@/stores/player-store';

export const useMatchResult = () => {
  const { redWon, blueWon, isMatchOver, matchWinner } = useMatchStore(
    useShallow((s) => ({
      redWon: s.redWon,
      blueWon: s.blueWon,
      isMatchOver: s.isMatchOver,
      matchWinner: s.matchWinner,
    }))
  );

  const setMatchOver = useMatchStore((s) => s.setMatchOver);
  const closeMatchResult = useMatchStore((s) => s.closeMatchResult);
  const resetMatch = useMatchStore((s) => s.resetMatch);
  const resetTimer = useTimerStore((s) => s.reset);
  const resetPlayers = usePlayerStore((s) => s.resetAll);

  const prevRedWon = useRef(redWon);
  const prevBlueWon = useRef(blueWon);

  useEffect(() => {
    const redJustWonMatch = redWon === 2 && prevRedWon.current < 2;
    const blueJustWonMatch = blueWon === 2 && prevBlueWon.current < 2;

    if (redJustWonMatch) {
      setTimeout(() => {
        setMatchOver('red');
      }, 3000);
    } else if (blueJustWonMatch) {
      setTimeout(() => {
        setMatchOver('blue');
      }, 3000);
    }

    prevRedWon.current = redWon;
    prevBlueWon.current = blueWon;
  }, [redWon, blueWon, setMatchOver]);

  const handleCloseDialog = useCallback(() => {
    closeMatchResult();
    resetMatch();
    resetTimer();
    resetPlayers();
  }, [closeMatchResult, resetMatch, resetTimer, resetPlayers]);

  return {
    isMatchOver,
    matchWinner,
    redWon,
    blueWon,
    onClose: handleCloseDialog,
  };
};
