import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HealthbarProps {
  health: number;
  maxHealth?: number;
  className?: string;
  reversed?: boolean;
}

export const Healthbar = ({
  health,
  maxHealth = 120,
  className,
  reversed,
}: HealthbarProps) => {
  const healthPercentage = (health / maxHealth) * 100;
  const [delayedHealth, setDelayedHealth] = useState(healthPercentage);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedHealth(healthPercentage);
    }, 100);

    return () => clearTimeout(timeout);
  }, [healthPercentage]);

  return (
    <HealthbarFrame className={className}>
      <HealthbarMeter
        currentHealthStyle={{ width: `${healthPercentage}%` }}
        delayedHealthStyle={{ width: `${delayedHealth}%` }}
        reversed={reversed}
      />
    </HealthbarFrame>
  );
};

interface HealthbarFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const HealthbarFrame = ({
  children,
  className,
}: HealthbarFrameProps) => {
  return (
    <div className={cn('relative flex items-center', className)}>
      <div className="healthbar-head" />
      <div className="relative h-[85%] w-full rounded-[3px] border-[0.2rem] border-white bg-transparent ring-2 ring-black">
        {children}
      </div>
      <div className="healthbar-head" />
    </div>
  );
};

interface HealthbarMeterProps {
  className?: string;
  currentHealthStyle?: React.CSSProperties;
  delayedHealthStyle?: React.CSSProperties;
  reversed?: boolean;
}

export const HealthbarMeter = ({
  className,
  currentHealthStyle,
  delayedHealthStyle,
  reversed,
}: HealthbarMeterProps) => {
  // Add positioning based on reversed prop
  const delayedPositionStyle = reversed
    ? { ...delayedHealthStyle, right: 0 }
    : { ...delayedHealthStyle, left: 0 };

  return (
    <div
      className={cn(
        'relative flex h-full w-full',
        reversed ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div className="health-meter" style={currentHealthStyle} />
      <div className="health-meter-delay" style={delayedPositionStyle} />
    </div>
  );
};
