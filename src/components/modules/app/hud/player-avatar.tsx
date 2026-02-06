import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ring } from '@/components/ui/ring';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name?: string;
  image?: string | null;
  className?: string;
  imageClassName?: string;
  fallback?: React.ReactNode;
  fallbackClassName?: string;
  onDoubleClick?: () => void;
  isCriticalHit?: boolean;
}

const PlayerAvatar = ({
  name,
  image,
  className,
  imageClassName,
  fallback,
  fallbackClassName,
  onDoubleClick,
  isCriticalHit,
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
      <Avatar
        className={cn('avatar no-focus relative after:border-none', className)}
      >
        <AvatarImage
          src={image ?? ''}
          alt={name}
          className={cn(
            'relative rounded-sm object-contain',
            isCriticalHit && 'animate-avatar-critical',
            imageClassName
          )}
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
