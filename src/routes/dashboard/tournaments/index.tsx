import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '@/components/not-found';
import { DashboardRouteError } from '@/features/dashboard/components/dashboard-route-error';
import { parseTournamentsListInput } from '@/features/dashboard/lib/tournament/parse-tournaments-list-input';
import { tournamentsListQueryOptions } from '@/queries/tournament';
import { TournamentsOverview } from '@/features/dashboard/components/tournament/overview';

export const Route = createFileRoute('/dashboard/tournaments/')({
  loaderDeps: ({ search }) => ({
    input: parseTournamentsListInput(search as Record<string, unknown>),
  }),
  loader: ({ context: { queryClient }, deps }) => {
    // Defer list data — toolbar paints immediately; Suspense streams the grid/table.
    void queryClient.prefetchQuery(tournamentsListQueryOptions(deps.input));
  },
  pendingMs: 0,
  pendingMinMs: 0,
  component: TournamentsOverview,
  errorComponent: DashboardRouteError,
  notFoundComponent: NotFound,
});
