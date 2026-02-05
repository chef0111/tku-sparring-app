import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '@/components/modules/navigation/navbar';
import { AppHUD } from '@/components/modules/app/hud';
import { Scoreboard } from '@/components/modules/app/scoreboard';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <div className="h-dvh w-dvw">
      <Navbar />
      <AppHUD />
      <Scoreboard />
    </div>
  );
}
