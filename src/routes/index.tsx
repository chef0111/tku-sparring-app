import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navigation/navbar";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <h1>Hello World</h1>
    </div>
  );
}
