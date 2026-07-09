import { useMemo } from 'react';
import { computeDashboardStats } from '@/features/dashboard/lib/home/compute-dashboard-stats';
import { useTournaments } from '@/queries/tournament';

export function useDashboardStats() {
  const query = useTournaments();

  const stats = useMemo(() => {
    return computeDashboardStats(query.data ?? []);
  }, [query.data]);

  return { ...query, stats };
}
