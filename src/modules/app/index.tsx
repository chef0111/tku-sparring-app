import { AppHUD } from './hud';
import { ResultDialog } from './match-result';
import { Scoreboard } from './scoreboard';
import { useMatchResult } from '@/hooks/use-match-result';
import { SettingsProvider } from '@/contexts/settings';
import { Navbar } from '@/components/navigation/navbar';
import { Dialog } from '@/components/ui/dialog';

export const AppHome = () => {
  const { isMatchOver, matchWinner, redWon, blueWon, onClose } =
    useMatchResult();
  return (
    <SettingsProvider>
      <Navbar />
      <AppHUD />
      <Scoreboard />

      <Dialog open={isMatchOver} onOpenChange={(open) => !open && onClose()}>
        <ResultDialog winner={matchWinner} redWon={redWon} blueWon={blueWon} />
      </Dialog>
    </SettingsProvider>
  );
};
