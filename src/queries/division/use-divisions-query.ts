import { useSuspenseQuery } from '@tanstack/react-query';
import { divisionListQueryOptions } from '@/queries/division/division-list-query-options';

export function useDivisions(tournamentId: string) {
  return useSuspenseQuery(divisionListQueryOptions(tournamentId));
}
