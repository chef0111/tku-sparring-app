import { Outlet, createFileRoute } from "@tanstack/react-router";
import { LogoIcon } from "@/components/ui/logo";
import { FloatingPaths } from "@/components/ui/floating-paths";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  pendingComponent: () => <div>Loading...</div>,
});

function AuthLayout() {
  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="bg-secondary dark:bg-secondary/20 relative hidden h-full flex-col border-r p-10 lg:flex">
        <div className="to-background absolute inset-0 bg-linear-to-b from-transparent via-transparent" />
        <div className="flex size-fit items-center justify-center gap-1">
          <LogoIcon className="mr-auto h-5" />
          <span className="font-esbuild text-2xl font-bold">tku.ss</span>
        </div>

        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl italic">
              &ldquo;A modern, user-friendly web application for managing
              Taekwondo sparring matches of UIT Taekwondo Tournament.&rdquo;
            </p>
            <footer className="font-esbuild text-sm font-semibold">
              - Taekwondo UIT
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      <Outlet />
    </main>
  );
}
