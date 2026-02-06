import { Timer } from './timer';
import { ScoreBox } from './score-box';
import { Controls } from './controls';
import { cn } from '@/lib/utils';

interface ScoreboardProps {
  className?: string;
}

export const Scoreboard = ({ className }: ScoreboardProps) => {
  return (
    <section
      className={cn(
        'relative flex h-[76.5vh] max-w-full grow flex-row items-center justify-center',
        className
      )}
    >
      {/* Red player side */}
      <Controls reversed={false} />
      <ScoreBox reversed={false} />

      <Timer />

      {/* Blue player side */}
      <ScoreBox reversed={true} />
      <Controls reversed={true} />
    </section>
  );
};

// Re-export sub-components for flexibility
export { Timer } from './timer';
export { ScoreBox } from './score-box';
export { Controls } from './controls';
