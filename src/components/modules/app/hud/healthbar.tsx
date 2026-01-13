import { cn } from "@/lib/utils";

interface HealthbarFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const HealthbarFrame = ({
  children,
  className,
}: HealthbarFrameProps) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <div className="z-10 h-full w-2.5 rounded-[3px] border-2 border-black bg-white" />
      <div className="relative h-[85%] w-full rounded-[3px] border-[0.2rem] border-white bg-transparent ring-2 ring-black">
        {children}
      </div>
      <div className="z-10 h-full w-2.5 rounded-[3px] border-2 border-black bg-white" />
    </div>
  );
};

interface HealthbarMeterProps {
  className?: string;
  reversed?: boolean;
}

export const HealthbarMeter = ({
  className,
  reversed,
}: HealthbarMeterProps) => {
  return (
    <div className={cn("relative h-full w-full", className)}>
      {reversed ? (
        <>
          <div className="health-meter justify-start" />
          <div className="health-meter-delay justify-start" />
        </>
      ) : (
        <>
          <div className="health-meter justify-end" />
          <div className="health-meter-delay justify-end" />
        </>
      )}
    </div>
  );
};

interface HealthbarProps {
  className?: string;
  meterClassName?: string;
  reversed?: boolean;
}

export const Healthbar = ({
  className,
  meterClassName,
  reversed,
}: HealthbarProps) => {
  return (
    <HealthbarFrame className={className}>
      <HealthbarMeter className={meterClassName} reversed={reversed} />
    </HealthbarFrame>
  );
};
