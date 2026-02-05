import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ClockSection } from './clock-section';
import { MatchInfo, RoundInfo } from './match-info';
import { cn } from '@/lib/utils';
import { useTimerStore } from '@/lib/stores/timer-store';
import { useMatchStore } from '@/lib/stores/match-store';

export const Timer = () => {
  const { timeLeft, isRunning, isBreakTime, breakTimeLeft } = useTimerStore(
    useShallow((s) => ({
      timeLeft: s.timeLeft,
      isRunning: s.isRunning,
      isBreakTime: s.isBreakTime,
      breakTimeLeft: s.breakTimeLeft,
    }))
  );

  const tick = useTimerStore((s) => s.tick);
  const tickBreak = useTimerStore((s) => s.tickBreak);
  const toggle = useTimerStore((s) => s.toggle);

  const { matchId, currentRound } = useMatchStore(
    useShallow((s) => ({
      matchId: s.matchId,
      currentRound: s.currentRound,
    }))
  );

  const tickRef = useRef(tick);
  const tickBreakRef = useRef(tickBreak);
  tickRef.current = tick;
  tickBreakRef.current = tickBreak;

  useEffect(() => {
    if (isRunning && !isBreakTime) {
      const id = setInterval(() => {
        tickRef.current(10);
      }, 10);
      return () => clearInterval(id);
    }
  }, [isRunning, isBreakTime]);

  // Break timer tick effect
  useEffect(() => {
    if (isBreakTime) {
      const id = setInterval(() => {
        tickBreakRef.current(1000);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isBreakTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isBreakTime) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBreakTime, toggle]);

  const handleTimeBoxClick = useCallback(() => {
    if (!isBreakTime) {
      toggle();
    }
  }, [isBreakTime, toggle]);

  const displayTime = isBreakTime ? breakTimeLeft : timeLeft;
  const showMilliseconds = !isBreakTime && timeLeft < 10000 && timeLeft > 0;
  const shouldBlink = !isBreakTime && timeLeft < 10000 && timeLeft > 0;
  const isPaused = !isRunning && !isBreakTime && timeLeft > 0;

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
