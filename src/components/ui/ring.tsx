import { cn } from '@/lib/utils';

export const Ring = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        'pointer-events-none absolute inset-0 z-10! rounded-md ring-1 ring-black/10 ring-inset dark:ring-white/10',
        className
      )}
    />
  );
};
