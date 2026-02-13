import { createFileRoute } from '@tanstack/react-router';
import { DashboardHome } from '@/modules/dashboard';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
});
