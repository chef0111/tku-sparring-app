import { useCallback, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useHotkeys } from 'react-hotkeys-hook';
import { Controller, ControllerContent, ScoreButtons } from './controller';
import { CriticalButtons, NormalButtons } from './score-button';
import { PenaltyBox } from './penalty-section';
import { PlayerLabel } from './player-label';
import type { HitType, Player } from '@/lib/scoreboard/hit-types';
import { KEYBOARD_MAPPINGS } from '@/lib/scoreboard/hit-types';
import { useTimerStore } from '@/stores/timer-store';
import { usePlayerStore } from '@/stores/player-store';

interface ControlsProps {
  side: 'red' | 'blue';
  className?: string;
}

export const Controls = ({ side = 'red', className }: ControlsProps) => {
  const player: Player = side;

  const { isRunning, isBreakTime } = useTimerStore(
    useShallow((s) => ({
      isRunning: s.isRunning,
      isBreakTime: s.isBreakTime,
    }))
  );

  const {
    red,
    blue,
    fouls,
    redHealth,
    blueHealth,
    redMana,
    blueMana,
    recordHit,
    addPenalty,
    removePenalty,
  } = usePlayerStore(
    useShallow((s) => ({
      red: s.red,
      blue: s.blue,
      fouls: s[player].fouls,
      redHealth: s.red.health,
      blueHealth: s.blue.health,
      redMana: s.red.mana,
      blueMana: s.blue.mana,
      recordHit: s.recordHit,
      addPenalty: s.addPenalty,
      removePenalty: s.removePenalty,
    }))
  );

  const setRoundEnded = useTimerStore((s) => s.setRoundEnded);

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

  // Hit scoring keybinds
  const keys = Object.keys(KEYBOARD_MAPPINGS[player]);
  useHotkeys(
    keys.join(','),
    (e) => {
      if (!canScore) return;

      const key = e.key.toLowerCase();
      const hitType = KEYBOARD_MAPPINGS[player][key];

      if (hitType) {
        e.preventDefault();
        setActiveHitType(hitType);
        const koOccurred = recordHit(player, hitType, isRunning, isBreakTime);

        if (koOccurred) {
          setRoundEnded(true);
        }

        setTimeout(() => setActiveHitType(null), 100);
      }
    },
    [canScore, player, recordHit, isRunning, isBreakTime, setRoundEnded]
  );

  const foulKey = player === 'red' ? 'w' : 'i';
  useHotkeys(
    foulKey,
    (e) => {
      if (!isBreakTime && !roundEnded) {
        e.preventDefault();
        const disqualified = addPenalty(player);

        if (disqualified) {
          setRoundEnded(true);
        }
      }
    },
    [isBreakTime, roundEnded, player, addPenalty, setRoundEnded]
  );

  return (
    <Controller className={className}>
      <ControllerContent side={side}>
        <PlayerLabel>{side === 'blue' ? blue.name : red.name}</PlayerLabel>
        <ScoreButtons side={side}>
          <CriticalButtons
            player={player}
            onHit={handleHit}
            disabled={!canScore}
            activeHitType={activeHitType}
          />
          <NormalButtons
            player={player}
            onHit={handleHit}
            disabled={!canScore}
            activeHitType={activeHitType}
          />
        </ScoreButtons>
      </ControllerContent>
      <PenaltyBox
        fouls={fouls}
        side={side}
        onClick={handlePenaltyClick}
        onContextMenu={handlePenaltyRightClick}
      />
    </Controller>
  );
};

export { Controller, ControllerContent, ScoreButtons } from './controller';
export { CriticalButtons, NormalButtons } from './score-button';
export { PenaltyBox, Penalty } from './penalty-section';
export { PlayerLabel } from './player-label';
