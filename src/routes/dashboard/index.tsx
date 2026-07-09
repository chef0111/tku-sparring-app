import { createFileRoute } from '@tanstack/react-router';
import { DashboardRouteError } from '@/features/dashboard/components/dashboard-route-error';
import { DashboardHome } from '@/features/dashboard/components/home/dashboard-home';
import { tournamentsAllQueryOptions } from '@/queries/tournament';
import { NotFound } from '@/components/not-found';

export const Route = createFileRoute('/dashboard/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(tournamentsAllQueryOptions());
  },
  component: DashboardHome,
  errorComponent: DashboardRouteError,
  notFoundComponent: NotFound,
});
