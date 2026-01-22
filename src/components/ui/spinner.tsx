import { cn } from "@/lib/utils";

interface SpinnerProps extends React.ComponentProps<"div"> {
  size?: string;
}

export function Spinner({
  size = "size-4",
  className,
  ...props
}: SpinnerProps) {
  const bars = Array(12).fill(0);

  return (
    <div className={cn(size)}>
      <div className={cn("relative top-1/2 left-1/2 h-[inherit] w-[inherit]")}>
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${String(i)}`}
            aria-label={`spinner-bar-${i + 1}`}
            className={cn(
              "animate-spinner bg-primary absolute -top-[3.9%] -left-[10%] h-[8%] w-[24%] rounded-md",
              `bar:nth-child(${i + 1})`,
              className
            )}
            style={{
              animationDelay: `-${1.3 - i * 0.1}s`,
              transform: `rotate(${30 * i}deg) translate(146%)`,
            }}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}

Spinner.displayName = "Spinner";
