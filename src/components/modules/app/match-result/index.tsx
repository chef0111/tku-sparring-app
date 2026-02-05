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
        <DialogTitle className="mt-10 text-center text-8xl font-bold text-nowrap">
          MATCH RESULT
        </DialogTitle>
      </DialogHeader>

      {/* Result */}
      <div className="flex h-44 w-full max-w-7xl items-stretch">
        <div className="flex w-[64%] items-center justify-center bg-[#f5df67] text-7xl font-bold text-black">
          WINNER
        </div>
        <div className="flex w-[18%] items-center justify-center bg-blue-600 text-8xl font-bold text-white">
          {blueWon}
        </div>
        <div className="flex w-[18%] items-center justify-center bg-red-600 text-8xl font-bold text-white">
          {redWon}
        </div>
      </div>

      {/* Winner info */}
      <div className="flex h-44 w-full max-w-7xl items-stretch">
        <div className="flex w-[26%] items-center justify-center overflow-hidden rounded-lg bg-white/10">
          <Avatar className="h-full w-full rounded-none bg-black/10 after:border-none">
            <AvatarImage
              src={winnerAvatar}
              alt={winnerName}
              className="h-full w-full rounded-none object-contain"
            />
            <AvatarFallback className="text-4xl font-bold">
              {winner === 'red' ? 'A' : 'B'}
            </AvatarFallback>
          </Avatar>
        </div>
        <div
          className={cn(
            'flex w-[74%] items-center justify-center text-7xl font-bold text-white',
            winner === 'red' ? 'bg-red-600' : 'bg-blue-600'
          )}
        >
          {winnerName}
        </div>
      </div>

      {/* Actions */}
      <DialogFooter className="flex w-full max-w-7xl items-center justify-center! gap-6">
        <Button className="bg-destructive h-16 rounded-lg px-12 text-2xl font-bold tracking-wider text-white opacity-100! hover:bg-red-500">
          CANCEL RESULT
        </Button>
        <Button className="h-16 rounded-lg bg-green-600 px-12 text-2xl font-bold tracking-wider text-white opacity-100! hover:bg-green-700">
          ACCEPT RESULT
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
