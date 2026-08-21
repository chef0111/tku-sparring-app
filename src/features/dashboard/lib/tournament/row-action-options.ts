import type { TournamentListItem } from '@/contracts/tournament/list';
import type { DataTableRowAction } from '@/lib/data-table/features';

export interface TournamentRowActionOptions {
  onRowAction: (action: DataTableRowAction<TournamentListItem>) => void;
  resolveTournament?: (id: string) => TournamentListItem | undefined;
}
