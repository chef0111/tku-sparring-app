import { cn } from '@/lib/utils';

interface ControllerProps {
  children: React.ReactNode;
  className?: string;
}

export const Controller = ({ children, className }: ControllerProps) => {
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

interface ControllerContentProps {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

export const ControllerContent = ({
  children,
  reversed,
  className,
}: ControllerContentProps) => {
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

interface ScoreButtonsProps {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

export const ScoreButtons = ({
  children,
  reversed,
  className,
}: ScoreButtonsProps) => {
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
