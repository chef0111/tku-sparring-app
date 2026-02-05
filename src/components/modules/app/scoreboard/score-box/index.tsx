import { Activity } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { HitIcon } from './hit-icon';
import { RecordSection, TotalWins } from './record-section';
import { StatsSection } from './stats-section';
import type { Player } from '@/stores/player-store';
import type { HitType } from '@/lib/scoreboard/hit-types';
import { cn } from '@/lib/utils';
import { usePlayerStore } from '@/stores/player-store';
import { useMatchStore } from '@/stores/match-store';
import { useTimerStore } from '@/stores/timer-store';
import { Card } from '@/components/ui/card';

interface ScoreBoxProps {
  reversed?: boolean;
  className?: string;
}

export const ScoreBox = ({ reversed = false, className }: ScoreBoxProps) => {
  const player: Player = reversed ? 'blue' : 'red';

  const { roundScores, hits } = usePlayerStore(
    useShallow((s) => ({
      roundScores: s[player].roundScores,
      hits: s[player].hits,
    }))
  );

  const lastHit = usePlayerStore((s) =>
    player === 'red' ? s.lastRedHit : s.lastBlueHit
  );

  const { roundWinners, redWon, blueWon, currentRound } = useMatchStore(
    useShallow((s) => ({
      roundWinners: s.roundWinners,
      redWon: s.redWon,
      blueWon: s.blueWon,
      currentRound: s.currentRound,
    }))
  );

  const isBreakTime = useTimerStore((s) => s.isBreakTime);

  const wins = reversed ? blueWon : redWon;

  return (
    <ScoreBoxColumn className={className}>
      <ScoreBoxFrame reversed={reversed}>
        <Activity mode={isBreakTime ? 'visible' : 'hidden'}>
          <RecordSection
            roundScores={roundScores}
            roundWinners={roundWinners}
            player={player}
            reversed={reversed}
            currentRound={currentRound}
            isBreakTime={isBreakTime}
          />
        </Activity>

        {!isBreakTime && (
          <DamageScore
            player={player}
            hitType={lastHit?.hitType ?? null}
            timestamp={lastHit?.timestamp ?? 0}
          />
        )}

        <Activity mode={isBreakTime ? 'visible' : 'hidden'}>
          <TotalWins wins={wins} />
        </Activity>
      </ScoreBoxFrame>
      <StatsSection hits={hits} wins={wins} reversed={reversed} />
    </ScoreBoxColumn>
  );
};

interface ScoreBoxColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const ScoreBoxColumn = ({
  children,
  className,
}: ScoreBoxColumnProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-[27vw] flex-col items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  );
};

interface ScoreBoxFrameProps {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

export const ScoreBoxFrame = ({
  children,
  reversed,
  className,
}: ScoreBoxFrameProps) => {
  return (
    <Card
      className={cn(
        'relative flex h-full w-full grow flex-col items-center justify-between overflow-hidden rounded-none p-5',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:to-transparent',
        'after:pointer-events-none after:absolute after:top-[-50%] after:left-[-50%] after:h-[200%] after:w-[200%] after:rotate-30 after:bg-white/10',
        reversed
          ? 'bg-linear-to-bl from-[#01559a] via-[#0070c0] to-[#0070c0] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),inset_0_0_15px_rgba(0,0,0,0.3),0_5px_15px_rgba(0,112,192,0.4)]'
          : 'bg-linear-to-br from-[#bf0000] via-[#ff0000] to-[#ff0000] shadow-[inset_5px_-5px_15px_rgba(0,0,0,0.3),inset_0_0_15px_rgba(0,0,0,0.3),0_5px_15px_rgba(255,0,0,0.4)]',
        className
      )}
    >
      {children}
    </Card>
  );
};

interface DamageScoreProps {
  player: Player;
  hitType: HitType | null;
  timestamp: number;
  className?: string;
}

export const DamageScore = ({
  player,
  hitType,
  timestamp,
  className,
}: DamageScoreProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full -translate-y-30 items-center justify-center rounded-full border-none',
        className
      )}
    >
      <HitIcon
        player={player}
        hitType={hitType}
        timestamp={timestamp}
        className="max-h-full max-w-full"
      />
    </div>
  );
};

// Re-export sub-components
export { RecordSection, RoundRecord, TotalWins } from './record-section';
export { StatsSection, StatItem } from './stats-section';
export { HitIcon } from './hit-icon';
