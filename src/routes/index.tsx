import { createFileRoute } from '@tanstack/react-router';

import { IconDeviceLaptop } from '@tabler/icons-react';
import { AppHome } from '@/features/app/components/app-home';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/themes';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="start-theme"
      forcedTheme="dark"
    >
      <div className="h-full w-dvw">
        <AppHome />

        <div className="flex h-full w-full items-center justify-center p-8 lg:hidden">
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
      </div>
      <Toaster richColors closeButton theme="dark" />
    </ThemeProvider>
  );
}
