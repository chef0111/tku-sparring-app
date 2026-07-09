import { createFileRoute, redirect } from '@tanstack/react-router';
import { NotFound } from '@/components/not-found';
import { DashboardRouteError } from '@/features/dashboard/components/dashboard-route-error';
import { TournamentBuilder } from '@/features/dashboard/components/tournament/builder';
import LoadingScreen from '@/components/navigation/loading';
import { divisionListQueryOptions } from '@/queries/division/division-list-query-options';
import { tournamentQueryOptions } from '@/queries/tournament';
import { sessionQueryOptions } from '@/queries/session';
import { ThemeProvider } from '@/contexts/themes';

export const Route = createFileRoute('/dashboard_/tournaments/$id/builder')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await queryClient.ensureQueryData(sessionQueryOptions());
    if (!session) {
      throw redirect({ to: '/login' });
    }
    return { user: session.user };
  },
  loader: async ({ params, context: { queryClient } }) => {
    await queryClient.ensureQueryData(tournamentQueryOptions(params.id));
    void queryClient.prefetchQuery(divisionListQueryOptions(params.id));
  },
  pendingComponent: () => <LoadingScreen title="Loading workspace..." />,
  component: TournamentBuilderPage,
  errorComponent: DashboardRouteError,
  notFoundComponent: NotFound,
});

function TournamentBuilderPage() {
  const { id } = Route.useParams();

  return (
    <ThemeProvider defaultTheme="system" storageKey="start-theme">
      <TournamentBuilder id={id} />
    </ThemeProvider>
  );
}
