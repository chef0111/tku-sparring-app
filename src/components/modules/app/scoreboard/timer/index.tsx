import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ClockSection } from './clock-section';
import { MatchInfo, RoundInfo } from './match-info';
import { cn } from '@/lib/utils';
import { useTimerStore } from '@/lib/stores/timer-store';
import { useMatchStore } from '@/lib/stores/match-store';
import { useTimerTick } from '@/hooks/use-timer-tick';
import { useRoundTransition } from '@/hooks/use-round-transition';

export const Timer = () => {
  const {
    timeLeft,
    isRunning,
    isBreakTime,
    breakTimeLeft,
    roundEnded,
    roundStarted,
  } = useTimerStore(
    useShallow((s) => ({
      timeLeft: s.timeLeft,
      isRunning: s.isRunning,
      isBreakTime: s.isBreakTime,
      breakTimeLeft: s.breakTimeLeft,
      roundEnded: s.roundEnded,
      roundStarted: s.roundStarted,
    }))
  );

  const toggle = useTimerStore((s) => s.toggle);

  const { matchId, currentRound } = useMatchStore(
    useShallow((s) => ({
      matchId: s.matchId,
      currentRound: s.currentRound,
    }))
  );

  useTimerTick();
  useRoundTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isBreakTime && !roundEnded) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBreakTime, roundEnded, toggle]);

  const handleTimeBoxClick = useCallback(() => {
    if (!isBreakTime && !roundEnded) {
      toggle();
    }
  }, [isBreakTime, roundEnded, toggle]);

  const displayTime = isBreakTime ? breakTimeLeft : timeLeft;
  const showMilliseconds = !isBreakTime && timeLeft < 10000 && timeLeft > 0;
  const shouldBlink = !isBreakTime && timeLeft < 10000 && timeLeft > 0;
  const isPaused = !isRunning && !isBreakTime && timeLeft > 0 && roundStarted;

  return (
    <TimerFrame>
      <MatchInfo matchId={matchId} />
      <ClockSection
        time={displayTime}
        showMilliseconds={showMilliseconds}
        isBreakTime={isBreakTime}
        isPaused={isPaused}
        shouldBlink={shouldBlink}
        onClick={handleTimeBoxClick}
      />
      <RoundInfo currentRound={currentRound} />
    </TimerFrame>
  );
};

interface TimerFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const TimerFrame = ({ children, className }: TimerFrameProps) => {
  return (
    <div
      className={cn(
        'bg-background relative flex h-[76.5vh] w-1/5 flex-col items-center justify-start gap-[8.5vh]',
        className
      )}
    >
      {children}
    </div>
  );
};

export { ClockSection, TimeBox, TimeoutIndicator } from './clock-section';
export { MatchInfo, RoundInfo } from './match-info';
