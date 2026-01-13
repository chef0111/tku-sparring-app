import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/modules/navigation/navbar";
import { AppHUD } from "@/components/modules/app/hud";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <AppHUD />
    </div>
  );
}
