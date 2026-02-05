import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CriticalButtonsColumn, NormalButtonsColumn } from './score-button';
import { PenaltyBox } from './penalty-section';
import type { HitType, Player } from '@/lib/scoreboard/hit-types';
import { cn } from '@/lib/utils';
import { KEYBOARD_MAPPINGS } from '@/lib/scoreboard/hit-types';
import { useTimerStore } from '@/lib/stores/timer-store';
import { usePlayerStore } from '@/lib/stores/player-store';

interface ScoreControlsProps {
  reversed?: boolean;
  className?: string;
}

export const ScoreControls = ({
  reversed = false,
  className,
}: ScoreControlsProps) => {
  const player: Player = reversed ? 'blue' : 'red';

  const { isRunning, isBreakTime } = useTimerStore(
    useShallow((s) => ({
      isRunning: s.isRunning,
      isBreakTime: s.isBreakTime,
    }))
  );

  const { fouls, redHealth, blueHealth, redMana, blueMana } = usePlayerStore(
    useShallow((s) => ({
      fouls: s[player].fouls,
      redHealth: s.red.health,
      blueHealth: s.blue.health,
      redMana: s.red.mana,
      blueMana: s.blue.mana,
    }))
  );

  const recordHit = usePlayerStore((s) => s.recordHit);
  const addPenalty = usePlayerStore((s) => s.addPenalty);
  const removePenalty = usePlayerStore((s) => s.removePenalty);
  const setRoundEnded = useTimerStore((s) => s.setRoundEnded);

  // Check if either player is knocked out or disqualified
  const anyPlayerKO = redHealth <= 0 || blueHealth <= 0;
  const anyPlayerDisqualified = redMana <= 0 || blueMana <= 0;
  const roundEnded = anyPlayerKO || anyPlayerDisqualified;

  const canScore = isRunning && !isBreakTime && !roundEnded;

  // Track active hit type for keyboard visual feedback
  const [activeHitType, setActiveHitType] = useState<HitType | null>(null);

  const handleHit = useCallback(
    (hitType: HitType) => {
      if (canScore) {
        const koOccurred = recordHit(player, hitType, isRunning, isBreakTime);

        // Stop timer and lock round if KO occurred
        if (koOccurred) {
          setRoundEnded(true);
        }
      }
    },
    [canScore, player, recordHit, isRunning, isBreakTime, setRoundEnded]
  );

  const handlePenaltyClick = useCallback(() => {
    if (!isBreakTime && !roundEnded) {
      const disqualified = addPenalty(player);

      // Stop timer and lock round if player was disqualified
      if (disqualified) {
        setRoundEnded(true);
      }
    }
  }, [isBreakTime, roundEnded, player, addPenalty, setRoundEnded]);

  const handlePenaltyRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isBreakTime && !roundEnded) {
        removePenalty(player);
      }
    },
    [isBreakTime, roundEnded, player, removePenalty]
  );

  // Keyboard controls with visual feedback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canScore) return;

      const key = e.key.toLowerCase();
      const hitType = KEYBOARD_MAPPINGS[player][key];

      if (hitType) {
        e.preventDefault();

        // Set active hit type for visual feedback
        setActiveHitType(hitType);

        const koOccurred = recordHit(player, hitType, isRunning, isBreakTime);

        // Stop timer and lock round if KO occurred
        if (koOccurred) {
          setRoundEnded(true);
        }

        // Clear active state after animation duration
        setTimeout(() => setActiveHitType(null), 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canScore, player, recordHit, isRunning, isBreakTime, setRoundEnded]);

  return (
    <ScoreControlsColumn className={className}>
      <ScoreControlsSection reversed={reversed}>
        <PlayerLabel>{reversed ? 'PLAYER B' : 'PLAYER A'}</PlayerLabel>
        <ScoreButtonsContainer reversed={reversed}>
          <CriticalButtonsColumn
            player={player}
            onHit={handleHit}
            disabled={!canScore}
            activeHitType={activeHitType}
          />
          <NormalButtonsColumn
            player={player}
            onHit={handleHit}
            disabled={!canScore}
            activeHitType={activeHitType}
          />
        </ScoreButtonsContainer>
      </ScoreControlsSection>
      <PenaltyBox
        fouls={fouls}
        reversed={reversed}
        onClick={handlePenaltyClick}
        onContextMenu={handlePenaltyRightClick}
      />
    </ScoreControlsColumn>
  );
};

interface ScoreControlsColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const ScoreControlsColumn = ({
  children,
  className,
}: ScoreControlsColumnProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[76.5vh] w-[13vw] flex-col items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  );
};

interface ScoreControlsSectionProps {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

export const ScoreControlsSection = ({
  children,
  reversed,
  className,
}: ScoreControlsSectionProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-start overflow-hidden p-2.5',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:to-transparent',
        reversed
          ? 'rounded-tr-[10px] bg-[#1e68ae]'
          : 'rounded-tl-[10px] bg-linear-to-b from-[#d80405] to-[#9b0002]',
        className
      )}
    >
      {children}
    </div>
  );
};

interface PlayerLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const PlayerLabel = ({ children, className }: PlayerLabelProps) => {
  return (
    <h1
      className={cn(
        'my-2.5 text-center text-3xl leading-none font-semibold text-white',
        className
      )}
    >
      {children}
    </h1>
  );
};

interface ScoreButtonsContainerProps {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

export const ScoreButtonsContainer = ({
  children,
  reversed,
  className,
}: ScoreButtonsContainerProps) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between py-[4.8vh]',
        reversed ? 'flex-row-reverse' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

// Re-export sub-components
export {
  ScoreButton,
  CriticalButtonsColumn,
  NormalButtonsColumn,
} from './score-button';
export { PenaltyBox, Penalty } from './penalty-section';
