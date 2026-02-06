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
import { Card } from '@/components/ui/card';

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
        <DialogTitle className="text-center text-8xl font-bold tracking-wide text-nowrap select-none">
          MATCH RESULT
        </DialogTitle>
      </DialogHeader>

      {/* Result */}
      <div className="flex h-44 w-full max-w-7xl items-stretch gap-4">
        <Card className="winner-label tex-foreground w-[64%] border-yellow-300 bg-[#5d583a] text-7xl ring-yellow-600">
          WINNER
        </Card>
        <Card className="winner-label w-[18%] border-blue-500 bg-[#233448] text-8xl text-blue-500 ring-indigo-900">
          {blueWon}
        </Card>
        <Card className="winner-label border-destructive text-destructive w-[18%] bg-[#46282a] text-8xl ring-red-900">
          {redWon}
        </Card>
      </div>

      {/* Winner info */}
      <div className="flex h-44 w-full max-w-7xl items-stretch gap-4">
        <Avatar
          className={cn(
            'h-full w-[26%] rounded-xl bg-white/10 after:border-none',
            winner === 'red' ? 'bg-red-600/20' : 'bg-blue-600/20'
          )}
        >
          <Ring className="rounded-xl ring-5" />
          <AvatarImage
            src={winnerAvatar}
            alt={winnerName}
            className="h-full w-full rounded-xl object-contain"
          />
          <AvatarFallback className="text-4xl font-bold">
            {winner === 'red' ? 'A' : 'B'}
          </AvatarFallback>
        </Avatar>

        <Card
          className={cn(
            'winner-label w-[74%] text-7xl text-white',
            winner === 'red'
              ? 'border-destructive bg-[#46282a] ring-red-900'
              : 'border-blue-600 bg-[#233448] ring-indigo-900'
          )}
        >
          {winnerName}
        </Card>
      </div>

      {/* Actions */}
      <DialogFooter className="flex w-full max-w-7xl items-center justify-center! gap-6">
        <Button className="action-btn action-btn-cancel">CANCEL RESULT</Button>
        <Button className="action-btn action-btn-accept">ACCEPT RESULT</Button>
      </DialogFooter>
    </DialogContent>
  );
};
