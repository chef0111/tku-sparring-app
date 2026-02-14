import { createFileRoute } from '@tanstack/react-router';
import { AthletePage } from '@/modules/dashboard/athlete';

export const Route = createFileRoute('/dashboard/athlete/')({
  component: AthleteRoute,
});

function AthleteRoute() {
  return <AthletePage />;
}
