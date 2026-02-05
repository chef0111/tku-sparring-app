import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ring } from '@/components/ui/ring';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name?: string;
  image?: string | null;
  className?: string;
  fallback?: React.ReactNode;
  fallbackClassName?: string;
  onDoubleClick?: () => void;
}

const PlayerAvatar = ({
  name,
  image,
  className,
  fallback,
  fallbackClassName,
  onDoubleClick,
}: PlayerAvatarProps) => {
  return (
    <div
      className="relative cursor-pointer"
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onDoubleClick) {
          onDoubleClick();
        }
      }}
    >
      <Avatar className={cn('avatar relative after:border-none', className)}>
        <AvatarImage
          src={image ?? ''}
          alt={name}
          className="relative rounded-sm object-contain"
        />
        <AvatarFallback
          className={cn(
            'font-esbuild text-foreground bg-transparent font-bold tracking-wider',
            fallbackClassName
          )}
        >
          {fallback}
        </AvatarFallback>
      </Avatar>
      <Ring className="rounded-xl ring-3" />
    </div>
  );
};

export { PlayerAvatar };
