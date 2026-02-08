import { createFileRoute } from '@tanstack/react-router';
import { Activity } from 'react';

import { IconDeviceLaptop } from '@tabler/icons-react';
import { Dialog } from '@/components/ui/dialog';
import { Navbar } from '@/components/modules/navigation/navbar';
import { AppHUD } from '@/components/modules/app/hud';
import { Scoreboard } from '@/components/modules/app/scoreboard';
import { ResultDialog } from '@/components/modules/app/match-result';
import { useMatchResult } from '@/hooks/use-match-result';
import { SettingsProvider } from '@/contexts/settings';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { useMediaQuery } from '@/hooks/use-media-query';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const { isMatchOver, matchWinner, redWon, blueWon, onClose } =
    useMatchResult();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="h-dvh w-dvw">
      <Activity mode={isDesktop ? 'visible' : 'hidden'}>
        <SettingsProvider>
          <Navbar />
          <AppHUD />
          <Scoreboard />

          <Dialog
            open={isMatchOver}
            onOpenChange={(open) => !open && onClose()}
          >
            <ResultDialog
              winner={matchWinner}
              redWon={redWon}
              blueWon={blueWon}
            />
          </Dialog>
        </SettingsProvider>
      </Activity>

      <Activity mode={!isDesktop ? 'visible' : 'hidden'}>
        <div className="flex h-full w-full items-center justify-center p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon" className="size-36">
                <IconDeviceLaptop className="size-30" />
              </EmptyMedia>
              <EmptyTitle className="text-4xl font-bold">
                Desktop Only
              </EmptyTitle>
            </EmptyHeader>
            <EmptyDescription className="text-xl">
              This application is optimized for desktop screens (width {'>'}=
              1280px). Please switch to a larger device.
            </EmptyDescription>
          </Empty>
        </div>
      </Activity>
    </div>
  );
}
