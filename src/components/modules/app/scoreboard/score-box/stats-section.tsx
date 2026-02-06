import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  hits: number;
  wins: number;
  reversed?: boolean;
  className?: string;
}

export const StatsSection = ({
  hits,
  wins,
  reversed,
  className,
}: StatsSectionProps) => {
  return (
    <Card
      className={cn(
        'pointers-event-none relative flex h-[15.5vh] w-full flex-row items-center justify-center gap-15 overflow-hidden rounded-none',
        'before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:to-transparent',
        reversed ? 'bg-[#155ea4]' : 'bg-[#dc0000]',
        className
      )}
    >
      {reversed ? (
        <>
          <StatItem label="HITS" value={hits} variant="blue" />
          <StatItem label="#WON" value={wins} variant="blue" />
        </>
      ) : (
        <>
          <StatItem label="#WON" value={wins} variant="red" />
          <StatItem label="HITS" value={hits} variant="red" />
        </>
      )}
    </Card>
  );
};

interface StatItemProps {
  label: string;
  value: number;
  variant: 'red' | 'blue';
  className?: string;
}

export const StatItem = ({
  label,
  value,
  variant,
  className,
}: StatItemProps) => {
  const textColor = variant === 'red' ? 'text-yellow-300' : 'text-[#9f6]';

  return (
    <div
      className={cn(
        'relative flex w-28 flex-col items-center justify-start',
        className
      )}
    >
      <p
        className={cn(
          'm-0 text-center text-3xl leading-none font-semibold drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] select-none',
          textColor
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'm-0 text-center text-5xl leading-none font-semibold tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] select-none',
          textColor
        )}
      >
        {value}
      </p>
    </div>
  );
};
