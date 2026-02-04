import { cn } from '@/lib/utils';

interface ManabarProps {
  mana: number;
  className?: string;
  meterClassName?: string;
  reversed?: boolean;
}

export const Manabar = ({
  mana,
  className,
  meterClassName,
  reversed,
}: ManabarProps) => {
  return (
    <ManabarFrame className={className}>
      <ManabarMeter
        mana={mana}
        className={meterClassName}
        reversed={reversed}
      />
    </ManabarFrame>
  );
};

interface ManabarFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const ManabarFrame = ({ children, className }: ManabarFrameProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[30%] items-center justify-between',
        className
      )}
    >
      <div className="manabar-head" />
      <div className="relative h-[85%] w-full rounded-xs border border-white bg-transparent ring-2 ring-black">
        {children}
      </div>
      <div className="manabar-head" />
    </div>
  );
};

interface ManabarMeterProps {
  mana: number;
  className?: string;
  reversed?: boolean;
}

export const ManabarMeter = ({
  mana,
  className,
  reversed,
}: ManabarMeterProps) => {
  const maxMana = 5;

  return (
    <div
      className={cn(
        'relative flex h-full w-full',
        reversed ? 'rotate-180' : '',
        className
      )}
    >
      {reversed ? (
        <div className="flex h-full w-full">
          {Array.from({ length: mana }).map((_, index) => (
            <ManaBlock key={index} manaLevel={maxMana - index} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full">
          {Array.from({ length: mana }).map((_, index) => (
            <ManaBlock key={index} manaLevel={maxMana - index} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ManaBlockProps {
  manaLevel: number;
  className?: string;
}

export const ManaBlock = ({ manaLevel, className }: ManaBlockProps) => {
  const manaColorMap: Record<number, string> = {
    1: '#fcf652',
    2: '#fae624',
    3: '#fbcf08',
    4: '#f6b00a',
    5: '#fc9406',
  };

  return (
    <div
      className={cn('relative h-full w-[20%] border-2 border-white', className)}
      style={{ backgroundColor: manaColorMap[manaLevel] ?? '#09090b' }}
    />
  );
};
