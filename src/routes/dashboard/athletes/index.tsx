import { createFileRoute } from '@tanstack/react-router';
import { AthletesPage } from '@/features/dashboard/components/athlete/athletes-page';
import { DashboardRouteError } from '@/features/dashboard/components/dashboard-route-error';
import { parseAthletesListInput } from '@/features/dashboard/lib/athlete/parse-athletes-list-input';
import { athleteProfilesQueryOptions } from '@/queries/athlete-profile';
import { tournamentsAllQueryOptions } from '@/queries/tournament';
import { NotFound } from '@/components/not-found';

export const Route = createFileRoute('/dashboard/athletes/')({
  loaderDeps: ({ search }) => ({
    input: parseAthletesListInput(search as Record<string, unknown>),
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(athleteProfilesQueryOptions(deps.input));
    // Menu / bulk-add use useTournaments — defer so athletes TTFB stays on the table.
    void queryClient.prefetchQuery(tournamentsAllQueryOptions());
  },
  pendingMs: 0,
  pendingMinMs: 0,
  component: AthletesPage,
  errorComponent: DashboardRouteError,
  notFoundComponent: NotFound,
});
