import type { TournamentsManagerQuery } from '@/features/dashboard/hooks/use-tournaments-manager-query';
import type { ColumnDef } from '@tanstack/react-table';
import type {
  TournamentListItem,
  TournamentSortField,
  TournamentStatus,
} from '@/contracts/tournament/list';
import { useTournamentList } from '@/queries/tournament';
import { useDataTable } from '@/hooks/use-data-table';
import { cn } from '@/lib/utils';

import { DataTable } from '@/components/data-table/data-table';

interface TournamentsTableProps {
  columns: Array<ColumnDef<TournamentListItem>>;
  query: TournamentsManagerQuery;
  className?: string;
}

export function TournamentsTable({
  columns,
  query,
  className,
}: TournamentsTableProps) {
  const { data } = useTournamentList({
    page: query.page,
    perPage: query.perPage,
    query: query.queryFilter ?? undefined,
    name: query.nameFilter ?? undefined,
    status:
      query.statusFilter && query.statusFilter.length > 0
        ? (query.statusFilter as Array<TournamentStatus>)
        : undefined,
    sort: query.sort?.[0]?.id as TournamentSortField,
    sortDir: query.sort?.[0]?.desc ? 'desc' : 'asc',
  });

  const { table, state: tableState } = useDataTable({
    data: data.items,
    columns,
    pageCount: Math.max(1, Math.ceil(data.total / query.perPage)),
    filteredRowCount: data.total,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    shallow: true,
    clearOnDefault: true,
  });

  return (
    <div className={cn('flex-1 overflow-auto', className)}>
      <DataTable table={table} state={tableState} selectedRows={false} />
    </div>
  );
}
