import { z } from 'zod';

import { dataTableConfig } from '@/config/data-table';

export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

export const filterItemSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  variant: z.enum(dataTableConfig.filterVariants),
  operator: z.enum(dataTableConfig.operators),
  filterId: z.string(),
});

export type FilterItemSchema = z.infer<typeof filterItemSchema>;

/**
 * Zod schema for data table search params.
 * Use with TanStack Router's `validateSearch` at the route level.
 *
 * @example
 * ```ts
 * export const Route = createFileRoute("/tournaments")({
 *   validateSearch: dataTableSearchSchema,
 * })
 * ```
 */
export const dataTableSearchSchema = z.object({
  page: z.number().catch(1),
  perPage: z.number().catch(10),
  sort: z.array(sortingItemSchema).catch([]),
  filters: z.array(filterItemSchema).catch([]),
  joinOperator: z.enum(['and', 'or']).catch('and' as const),
});

export type DataTableSearchParams = z.infer<typeof dataTableSearchSchema>;
