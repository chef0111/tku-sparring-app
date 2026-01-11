import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navigation/navbar";
import { AppHUD } from "@/components/layout/app/hud";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <AppHUD />
    </div>
  );
}
