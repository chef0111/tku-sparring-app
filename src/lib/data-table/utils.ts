import type { Column, RowData } from '@tanstack/react-table';
import type { FilterOperator, FilterVariant } from '@/types/data-table';
import type { DataTableFeatures } from '@/lib/data-table/features';
import type { FilterItemSchema } from '@/lib/data-table/parsers';
import { dataTableConfig } from '@/config/data-table';

export function getColumnPinningStyle<TData extends RowData>({
  column,
  withBorder = false,
}: {
  column: Column<DataTableFeatures, TData>;
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastStartPinnedColumn =
    isPinned === 'start' &&
    column.getPinnedIndex() ===
      column.table.getStartVisibleLeafColumns().length - 1;
  const isFirstEndPinnedColumn =
    isPinned === 'end' && column.getPinnedIndex() === 0;

  return {
    boxShadow: withBorder
      ? isLastStartPinnedColumn
        ? '-4px 0 4px -4px var(--border) inset'
        : isFirstEndPinnedColumn
          ? '4px 0 4px -4px var(--border) inset'
          : undefined
      : undefined,
    insetInlineStart:
      isPinned === 'start' ? `${column.getStart('start')}px` : undefined,
    insetInlineEnd:
      isPinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'var(--background)' : 'var(--background)',
    width: column.getSize(),
    zIndex: isPinned ? 1 : undefined,
  };
}

export function getFilterOperators(filterVariant: FilterVariant) {
  const operatorMap: Record<
    FilterVariant,
    Array<{ label: string; value: FilterOperator }>
  > = {
    text: dataTableConfig.textOperators,
    number: dataTableConfig.numericOperators,
    range: dataTableConfig.numericOperators,
    date: dataTableConfig.dateOperators,
    dateRange: dataTableConfig.dateOperators,
    boolean: dataTableConfig.booleanOperators,
    select: dataTableConfig.selectOperators,
    multiSelect: dataTableConfig.multiSelectOperators,
  };

  return operatorMap[filterVariant] ?? dataTableConfig.textOperators;
}

export function getDefaultFilterOperator(filterVariant: FilterVariant) {
  const operators = getFilterOperators(filterVariant);

  return operators[0]?.value ?? (filterVariant === 'text' ? 'iLike' : 'eq');
}

export function getValidFilters(
  filters: Array<FilterItemSchema>
): Array<FilterItemSchema> {
  return filters.filter(
    (filter) =>
      filter.operator === 'isEmpty' ||
      filter.operator === 'isNotEmpty' ||
      (Array.isArray(filter.value)
        ? filter.value.length > 0
        : filter.value !== '' &&
          filter.value !== null &&
          filter.value !== undefined)
  );
}

export function parseRangeParam(value: unknown): [number, number] | undefined {
  if (value == null || value === '') return undefined;
  const str = typeof value === 'string' ? value : String(value);
  const parts = str.split(',').map(Number);
  if (parts.some((n) => Number.isNaN(n))) return undefined;
  if (parts.length === 2) return [parts[0], parts[1]];
  if (parts.length === 1) return [parts[0], parts[0]];
  return undefined;
}
