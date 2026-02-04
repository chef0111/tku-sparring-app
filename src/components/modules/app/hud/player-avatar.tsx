import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name?: string;
  image?: string | null;
  className?: string;
  fallback?: React.ReactNode;
  fallbackClassName?: string;
}

const PlayerAvatar = ({
  name,
  image,
  className,
  fallback,
  fallbackClassName,
}: PlayerAvatarProps) => {
  return (
    <div className="relative">
      <Avatar
        className={cn('avatar relative z-0 after:border-none', className)}
      >
        <AvatarImage
          src={image ?? ''}
          alt={name}
          className="relative z-1 rounded-sm object-contain"
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

      <div className="image-border rounded-xl ring-2" />
    </div>
  );
};

export { PlayerAvatar };
