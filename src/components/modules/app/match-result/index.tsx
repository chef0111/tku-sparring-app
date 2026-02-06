import type { Player } from '@/stores/player-store';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Ring } from '@/components/ui/ring';

interface ResultDialogProps {
  winner: Player | null;
  redWon: number;
  blueWon: number;
  className?: string;
}

export const ResultDialog = ({
  winner,
  redWon,
  blueWon,
  className,
}: ResultDialogProps) => {
  const winnerName = winner === 'red' ? 'PLAYER A' : 'PLAYER B';
  const winnerAvatar =
    winner === 'red' ? 'assets/CapybaraTKU1.webp' : 'assets/CapybaraTKU2.webp';

  return (
    <DialogContent
      className={cn(
        'flex h-dvh min-w-screen flex-col items-center justify-center gap-12 border-none! bg-transparent',
        className
      )}
      overlayClassName="h-dvh w-screen! bg-black/90!"
      closeButtonClassName="scale-200! top-6 right-6 no-focus"
    >
      <DialogHeader>
        <DialogTitle className="text-center text-8xl font-bold text-nowrap select-none">
          MATCH RESULT
        </DialogTitle>
      </DialogHeader>

      {/* Result */}
      <div className="flex h-44 w-full max-w-7xl items-stretch gap-4">
        <div className="winner-label w-[64%] bg-yellow-200 text-7xl text-black">
          WINNER
        </div>
        <div className="winner-label w-[18%] bg-blue-600 text-8xl text-white">
          {blueWon}
        </div>
        <div className="winner-label w-[18%] bg-red-600 text-8xl text-white">
          {redWon}
        </div>
      </div>

      {/* Winner info */}
      <div className="flex h-44 w-full max-w-7xl items-stretch gap-4">
        <Avatar
          className={cn(
            'h-full w-[26%] rounded-sm bg-white/10 after:border-none',
            winner === 'red' ? 'bg-red-600/10' : 'bg-blue-600/10'
          )}
        >
          <Ring className="rounded-sm ring-3" />
          <AvatarImage
            src={winnerAvatar}
            alt={winnerName}
            className="h-full w-full rounded-none object-contain"
          />
          <AvatarFallback className="text-4xl font-bold">
            {winner === 'red' ? 'A' : 'B'}
          </AvatarFallback>
        </Avatar>

        <div
          className={cn(
            'winner-label w-[74%] text-7xl text-white',
            winner === 'red' ? 'bg-red-600' : 'bg-blue-600'
          )}
        >
          {winnerName}
        </div>
      </div>

      {/* Actions */}
      <DialogFooter className="flex w-full max-w-7xl items-center justify-center! gap-6">
        <Button className="action-btn bg-destructive hover:bg-red-500">
          CANCEL RESULT
        </Button>
        <Button className="action-btn bg-green-600 hover:bg-green-700">
          ACCEPT RESULT
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
