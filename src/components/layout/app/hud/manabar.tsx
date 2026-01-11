import { cn } from "@/lib/utils";

interface ManabarFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const ManabarFrame = ({ children, className }: ManabarFrameProps) => {
  return (
    <div className={cn("relative flex h-[30%] items-center", className)}>
      <div className="z-10 h-full w-1.5 rounded-xs border border-black bg-white" />
      <div className="relative h-[85%] w-full rounded-xs border border-white bg-transparent ring-2 ring-black">
        {children}
      </div>
      <div className="z-10 h-full w-1.5 rounded-xs border border-black bg-white" />
    </div>
  );
};

interface ManabarMeterProps {
  manaPoints: number;
  className?: string;
  reversed?: boolean;
}

export const ManabarMeter = ({
  manaPoints,
  className,
  reversed,
}: ManabarMeterProps) => {
  return (
    <div className={cn("relative h-full w-full", className)}>
      {reversed ? (
        <div className="flex h-full w-full justify-start">
          {Array.from({ length: manaPoints }).map((_, index) => (
            <ManaBlock key={index} manaLevel={index + 1} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full justify-end">
          {Array.from({ length: manaPoints }).map((_, index) => (
            <ManaBlock key={index} manaLevel={manaPoints - index} />
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
    1: "#fcf652",
    2: "#fae624",
    3: "#fbcf08",
    4: "#f6b00a",
    5: "#fc9406",
  };

  return (
    <div
      className={cn("relative h-full w-[20%] border-2 border-white", className)}
      style={{ backgroundColor: manaColorMap[manaLevel] ?? "#09090b" }}
    />
  );
};

interface ManabarProps {
  manaPoints: number;
  className?: string;
  meterClassName?: string;
  reversed?: boolean;
}

export const Manabar = ({
  manaPoints,
  className,
  meterClassName,
  reversed,
}: ManabarProps) => {
  return (
    <ManabarFrame className={className}>
      <ManabarMeter
        manaPoints={manaPoints}
        className={meterClassName}
        reversed={reversed}
      />
    </ManabarFrame>
  );
};
