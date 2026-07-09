import { Outlet, createFileRoute } from '@tanstack/react-router';
import { AppSidebar } from '@/features/dashboard/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import LoadingScreen from '@/components/navigation/loading';
import { requireSession } from '@/queries/session';
import { ThemeProvider } from '@/contexts/themes';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context: { queryClient } }) => requireSession(queryClient),
  pendingComponent: () => <LoadingScreen title="Loading your dashboard..." />,
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="start-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
