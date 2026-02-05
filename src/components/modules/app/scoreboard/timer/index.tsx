import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { SkipForward } from 'lucide-react';
import { ClockSection } from './clock-section';
import { MatchInfo, RoundInfo } from './match-info';
import { cn } from '@/lib/utils';
import { useTimerStore } from '@/stores/timer-store';
import { useMatchStore } from '@/stores/match-store';
import { useTimerTick } from '@/hooks/use-timer-tick';
import { useRoundTransition } from '@/hooks/use-round-transition';
import { Button } from '@/components/ui/button';

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

  const { toggle, toggleBreak, skipBreak, pause } = useTimerStore(
    useShallow((s) => ({
      toggle: s.toggle,
      toggleBreak: s.toggleBreak,
      skipBreak: s.skipBreak,
      pause: s.pause,
    }))
  );

  const { matchId, currentRound, isMatchOver } = useMatchStore(
    useShallow((s) => ({
      matchId: s.matchId,
      currentRound: s.currentRound,
      isMatchOver: s.isMatchOver,
    }))
  );

  useTimerTick();
  useRoundTransition();

  useEffect(() => {
    if (isMatchOver && isBreakTime && isRunning) {
      pause();
    }
  }, [isMatchOver, isBreakTime, isRunning, pause]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isBreakTime && !isMatchOver) {
          toggleBreak();
        } else if (!roundEnded && !isMatchOver) {
          toggle();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBreakTime, roundEnded, isMatchOver, toggle, toggleBreak]);

  const handleTimeBoxClick = useCallback(() => {
    if (isMatchOver) return;
    if (isBreakTime) {
      toggleBreak();
    } else if (!roundEnded) {
      toggle();
    }
  }, [isBreakTime, roundEnded, isMatchOver, toggle, toggleBreak]);

  const displayTime = isBreakTime ? breakTimeLeft : timeLeft;
  const showMilliseconds = !isBreakTime && timeLeft < 10000 && timeLeft > 0;
  const shouldBlink = !isBreakTime && timeLeft < 10000 && timeLeft > 0;
  const isPaused = !isRunning && !isBreakTime && timeLeft > 0 && roundStarted;

  const handleSkipBreak = useCallback(() => {
    if (!isMatchOver) {
      skipBreak();
    }
  }, [isMatchOver, skipBreak]);

  return (
    <TimerFrame>
      <MatchInfo matchId={matchId} />
      <div className="relative flex h-54 w-full flex-col items-center justify-center">
        <ClockSection
          time={displayTime}
          showMilliseconds={showMilliseconds}
          isBreakTime={isBreakTime}
          isPaused={isPaused}
          shouldBlink={shouldBlink}
          onClick={handleTimeBoxClick}
        />
        {isBreakTime && (
          <Button
            variant="ghost"
            size="lg"
            className="absolute bottom-10"
            onClick={handleSkipBreak}
          >
            <SkipForward />
            Skip breaktime
          </Button>
        )}
      </div>
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
