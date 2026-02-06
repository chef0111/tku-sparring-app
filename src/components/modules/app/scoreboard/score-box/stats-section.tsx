import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
      <Label className={cn('metrics text-3xl', textColor)}>{label}</Label>
      <p className={cn('metrics text-5xl', textColor)}>{value}</p>
    </div>
  );
};
