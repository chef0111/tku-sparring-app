import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTimerStore } from '@/lib/stores/timer-store';
import { usePlayerStore } from '@/lib/stores/player-store';
import { useMatchStore } from '@/lib/stores/match-store';

export const useRoundTransition = () => {
  const { isBreakTime, breakTimeLeft, roundDuration } = useTimerStore(
    useShallow((s) => ({
      isBreakTime: s.isBreakTime,
      breakTimeLeft: s.breakTimeLeft,
      roundDuration: s.roundDuration,
    }))
  );
  const resetTimerForNextRound = useTimerStore((s) => s.resetForNextRound);
  const resetPlayerForNextRound = usePlayerStore((s) => s.resetForNextRound);
  const nextRound = useMatchStore((s) => s.nextRound);

  const prevIsBreakTime = useRef(isBreakTime);

  useEffect(() => {
    if (prevIsBreakTime.current && !isBreakTime && breakTimeLeft === 0) {
      resetTimerForNextRound(roundDuration);
      resetPlayerForNextRound();
      nextRound();
    }
    prevIsBreakTime.current = isBreakTime;
  }, [
    isBreakTime,
    breakTimeLeft,
    roundDuration,
    resetTimerForNextRound,
    resetPlayerForNextRound,
    nextRound,
  ]);
};
