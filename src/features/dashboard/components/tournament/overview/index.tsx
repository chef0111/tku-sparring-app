import * as React from 'react';
import { useQueryStates } from 'nuqs';

import { CreateTournamentDialog } from '../create-tournament-dialog';
import { useTournamentsViewMode } from './tournaments-toolbar/view-mode-toggle';
import { TournamentsToolbar } from './tournaments-toolbar';
import { TournamentsGrid } from './tournaments-grid';
import { TournamentCardSkeleton } from './tournaments-grid/tournament-card-skeleton';
import { TournamentsTable } from './tournaments-table';
import { getTournamentsTableColumns } from './tournaments-table/tournaments-table-columns';
import { RenameTournamentDialog } from './dialogs/rename-tournament-dialog';
import { DeleteTournamentDialog } from './dialogs/delete-tournament-dialog';
import type { TournamentListItem } from '@/contracts/tournament/list';
import type { DataTableRowAction } from '@/types/data-table';
import { useTournamentsManagerQuery } from '@/features/dashboard/hooks/use-tournaments-manager-query';
import { SiteHeader } from '@/features/dashboard/components/sidebar/site-header';
import { QueryErrorBoundary } from '@/components/query-error-boundary';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { cn } from '@/lib/utils';

const TOURNAMENT_TABLE_COLUMN_COUNT = 7;
const GRID_SKELETON_COUNT = 8;

function TournamentsGridSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {Array.from({ length: GRID_SKELETON_COUNT }, (_, i) => (
        <TournamentCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TournamentsOverview() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<TournamentListItem> | null>(null);
  const [viewMode] = useTournamentsViewMode();
  const query = useTournamentsManagerQuery();

  const [, setUrlFilters] = useQueryStates({
    query: { parse: (value) => value, serialize: (v) => v ?? '' },
    status: { parse: (value) => value, serialize: (v) => v ?? '' },
  });

  const columns = React.useMemo(
    () => getTournamentsTableColumns({ onRowAction: setRowAction }),
    []
  );

  const onCreate = React.useCallback(() => setCreateOpen(true), []);
  const onClearFilters = React.useCallback(() => {
    void setUrlFilters({ query: null, status: null });
  }, [setUrlFilters]);

  return (
    <div className="flex h-full flex-col">
      <SiteHeader title="Tournaments" />

      <div className="mx-auto w-full max-w-7xl flex-1 overflow-auto p-6">
        <TournamentsToolbar onCreate={onCreate} />
        <QueryErrorBoundary title="Failed to load tournaments">
          <React.Suspense
            fallback={
              viewMode === 'grid' ? (
                <TournamentsGridSkeleton className="pt-2" />
              ) : (
                <DataTableSkeleton
                  className="pt-2"
                  columnCount={TOURNAMENT_TABLE_COLUMN_COUNT}
                  withViewOptions={false}
                  filterCount={0}
                />
              )
            }
          >
            {viewMode === 'grid' ? (
              <TournamentsGrid
                query={query}
                onRowAction={setRowAction}
                onCreate={onCreate}
                onClearFilters={onClearFilters}
                className="pt-2"
              />
            ) : (
              <TournamentsTable
                columns={columns}
                query={query}
                className="pt-2"
              />
            )}
          </React.Suspense>
        </QueryErrorBoundary>
      </div>

      <CreateTournamentDialog open={createOpen} onOpenChange={setCreateOpen} />
      <RenameTournamentDialog
        tournament={
          rowAction?.variant === 'update' ? rowAction.row.original : null
        }
        onOpenChange={() => setRowAction(null)}
      />
      <DeleteTournamentDialog
        tournament={
          rowAction?.variant === 'delete' ? rowAction.row.original : null
        }
        onClose={() => setRowAction(null)}
      />
    </div>
  );
}
