import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tournament')({
  component: TournamentLayout,
});

function TournamentLayout() {
  return <Outlet />;
}
