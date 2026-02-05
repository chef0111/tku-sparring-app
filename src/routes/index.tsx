import { createFileRoute } from '@tanstack/react-router';
import { Dialog } from '@/components/ui/dialog';
import { Navbar } from '@/components/modules/navigation/navbar';
import { AppHUD } from '@/components/modules/app/hud';
import { Scoreboard } from '@/components/modules/app/scoreboard';
import { ResultDialog } from '@/components/modules/app/match-result';
import { useMatchResult } from '@/hooks/use-match-result';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const { isMatchOver, matchWinner, redWon, blueWon, onClose } =
    useMatchResult();

  return (
    <div className="h-dvh w-dvw">
      <Navbar />
      <AppHUD />
      <Scoreboard />

      <Dialog open={isMatchOver} onOpenChange={(open) => !open && onClose()}>
        <ResultDialog winner={matchWinner} redWon={redWon} blueWon={blueWon} />
      </Dialog>
    </div>
  );
}
