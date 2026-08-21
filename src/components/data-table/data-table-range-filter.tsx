import React from 'react';
import type { RowData } from '@tanstack/react-table';

import type { ExtendedColumnFilter } from '@/types/data-table';
import type { DataTableColumn } from '@/lib/data-table/features';
import { NumberInput } from '@/components/input/number-input';
import { nextRangeFilterValue } from '@/lib/data-table/range-filter-value';
import { cn } from '@/lib/utils';

interface DataTableRangeFilterProps<
  TData extends RowData,
> extends React.ComponentProps<'div'> {
  filter: ExtendedColumnFilter<TData>;
  column: DataTableColumn<TData>;
  inputId: string;
  onFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, 'filterId'>>
  ) => void;
}

export function DataTableRangeFilter<TData extends RowData>({
  filter,
  column,
  inputId,
  onFilterUpdate,
  className,
  ...props
}: DataTableRangeFilterProps<TData>) {
  const meta = column.columnDef.meta;

  const [min, max] = React.useMemo(() => {
    const range = column.columnDef.meta?.range;
    if (range) return range;

    const values = column.getFacetedMinMaxValues();
    if (!values) return [0, 100];

    return [values[0], values[1]];
  }, [column]);

  const formatValue = React.useCallback(
    (value: string | number | undefined) => {
      if (value === undefined || value === '') return '';
      const numValue = Number(value);
      return Number.isNaN(numValue)
        ? ''
        : numValue.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          });
    },
    []
  );

  const value = React.useMemo(() => {
    if (Array.isArray(filter.value)) return filter.value.map(formatValue);
    return [formatValue(filter.value), ''];
  }, [filter.value, formatValue]);

  const rangeDraftRef = React.useRef(filter.value);
  React.useEffect(() => {
    rangeDraftRef.current = filter.value;
  }, [filter.value]);

  const onRangeValueChange = React.useCallback(
    (val: string, isMin?: boolean) => {
      const nextValue = nextRangeFilterValue(
        rangeDraftRef.current,
        val,
        isMin ?? false,
        min,
        max
      );
      if (!nextValue) return;
      rangeDraftRef.current = nextValue;
      onFilterUpdate(filter.filterId, { value: nextValue });
    },
    [filter.filterId, min, max, onFilterUpdate]
  );

  return (
    <div
      data-slot="range"
      className={cn('flex w-full items-center gap-2', className)}
      {...props}
    >
      <NumberInput
        id={`${inputId}-min`}
        aria-label={`${meta?.label} minimum value`}
        aria-valuemin={min}
        aria-valuemax={max}
        data-slot="range-min"
        inputMode="numeric"
        placeholder={min.toString()}
        min={min}
        max={max}
        className="h-8 w-full rounded"
        defaultValue={value[0]}
        onChange={(event) => onRangeValueChange(event.target.value, true)}
      />
      <span className="text-muted-foreground sr-only shrink-0">to</span>
      <NumberInput
        id={`${inputId}-max`}
        aria-label={`${meta?.label} maximum value`}
        aria-valuemin={min}
        aria-valuemax={max}
        data-slot="range-max"
        inputMode="numeric"
        placeholder={max.toString()}
        min={min}
        max={max}
        className="h-8 w-full rounded"
        defaultValue={value[1]}
        onChange={(event) => onRangeValueChange(event.target.value)}
      />
    </div>
  );
}
