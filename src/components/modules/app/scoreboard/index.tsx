import { Timer } from './timer';
import { ScoreBox } from './score-box';
import { ScoreControls } from './controls';
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
      <ScoreControls reversed={false} />
      <ScoreBox reversed={false} />

      {/* Timer in the center */}
      <Timer />

      {/* Blue player side */}
      <ScoreBox reversed={true} />
      <ScoreControls reversed={true} />
    </section>
  );
};

// Re-export sub-components for flexibility
export { Timer } from './timer';
export { ScoreBox } from './score-box';
export { ScoreControls } from './controls';
