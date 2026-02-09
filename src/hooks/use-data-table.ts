import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import type {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  TableOptions,
  TableState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';

import type { DataTableSearchParams } from '@/lib/table/search-params';
import type { ExtendedColumnSort } from '@/types/data-table';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;

interface UseDataTableProps<TData>
  extends
    Omit<
      TableOptions<TData>,
      | 'state'
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: Array<ExtendedColumnSort<TData>>;
  };
  search: DataTableSearchParams;
  onSearchChange: (
    updater: (prev: DataTableSearchParams) => DataTableSearchParams
  ) => void;
  debounceMs?: number;
  throttleMs?: number;
  enableAdvancedFilter?: boolean;
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    pageCount = -1,
    initialState,
    search,
    onSearchChange,
    debounceMs = DEBOUNCE_MS,
    throttleMs = THROTTLE_MS,
    enableAdvancedFilter = false,
    ...tableProps
  } = props;

  // --- Row selection & column visibility ---
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});

  // --- Pagination (derived from search params) ---
  const pagination: PaginationState = React.useMemo(
    () => ({
      pageIndex: search.page - 1, // 1-based URL -> 0-based table
      pageSize: search.perPage,
    }),
    [search.page, search.perPage]
  );

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      const newPagination =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(pagination)
          : updaterOrValue;

      onSearchChange((prev) => ({
        ...prev,
        page: newPagination.pageIndex + 1,
        perPage: newPagination.pageSize,
      }));
    },
    [pagination, onSearchChange]
  );

  // --- Sorting (derived from search params) ---
  const sorting = search.sort as Array<ExtendedColumnSort<TData>>;

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(sorting)
          : updaterOrValue;

      onSearchChange((prev) => ({
        ...prev,
        sort: newSorting.map((s) => ({ id: s.id, desc: s.desc })),
      }));
    },
    [sorting, onSearchChange]
  );

  // --- Basic column filters (when enableAdvancedFilter is false) ---
  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    if (enableAdvancedFilter) return [];
    return [];
  }, [enableAdvancedFilter]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const debouncedOnSearchChange = useDebouncedCallback(
    onSearchChange,
    debounceMs
  );

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) return;

      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(prev)
            : updaterOrValue;

        // Reset to page 1 when filters change
        debouncedOnSearchChange((prevSearch) => ({
          ...prevSearch,
          page: 1,
        }));

        return next;
      });
    },
    [debouncedOnSearchChange, enableAdvancedFilter]
  );

  // --- Build table ---
  const table = useReactTable({
    ...tableProps,
    columns,
    initialState,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    meta: {
      ...tableProps.meta,
      search,
      onSearchChange,
    },
  });

  return React.useMemo(
    () => ({ table, debounceMs, throttleMs }),
    [table, debounceMs, throttleMs]
  );
}
