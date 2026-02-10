import { addDays, endOfDay, startOfDay } from 'date-fns';
import type { ExtendedColumnFilter, JoinOperator } from '@/types/data-table';

type PrismaCondition = Record<string, unknown>;

/**
 * Converts data table filters to a Prisma `where` clause object.
 * Designed for MongoDB via Prisma.
 *
 * @example
 * ```ts
 * const where = filterColumns({ filters, joinOperator: "and" })
 * const data = await prisma.tournament.findMany({ where })
 * ```
 */
export function filterColumns({
  filters,
  joinOperator,
}: {
  filters: Array<ExtendedColumnFilter<Record<string, unknown>>>;
  joinOperator: JoinOperator;
}): PrismaCondition | undefined {
  const joinKey = joinOperator === 'and' ? 'AND' : 'OR';

  const conditions = filters
    .map((filter) => buildCondition(filter))
    .filter((c): c is PrismaCondition => c !== undefined);

  return conditions.length > 0 ? { [joinKey]: conditions } : undefined;
}

function buildCondition(
  filter: ExtendedColumnFilter<Record<string, unknown>>
): PrismaCondition | undefined {
  const field = filter.id;

  switch (filter.operator) {
    case 'iLike':
      return filter.variant === 'text' && typeof filter.value === 'string'
        ? { [field]: { contains: filter.value, mode: 'insensitive' } }
        : undefined;

    case 'notILike':
      return filter.variant === 'text' && typeof filter.value === 'string'
        ? {
            NOT: {
              [field]: { contains: filter.value, mode: 'insensitive' },
            },
          }
        : undefined;

    case 'eq':
      if (typeof filter.value === 'string') {
        if (
          filter.variant === 'boolean' ||
          filter.value === 'true' ||
          filter.value === 'false'
        ) {
          return { [field]: { equals: filter.value === 'true' } };
        }

        if (filter.variant === 'date' || filter.variant === 'dateRange') {
          const date = new Date(Number(filter.value));
          date.setHours(0, 0, 0, 0);
          const end = new Date(date);
          end.setHours(23, 59, 59, 999);
          return {
            AND: [{ [field]: { gte: date } }, { [field]: { lte: end } }],
          };
        }

        return { [field]: { equals: filter.value } };
      }
      return undefined;

    case 'ne':
      if (typeof filter.value === 'string') {
        if (
          filter.variant === 'boolean' ||
          filter.value === 'true' ||
          filter.value === 'false'
        ) {
          return { [field]: { not: { equals: filter.value === 'true' } } };
        }

        if (filter.variant === 'date' || filter.variant === 'dateRange') {
          const date = new Date(Number(filter.value));
          date.setHours(0, 0, 0, 0);
          const end = new Date(date);
          end.setHours(23, 59, 59, 999);
          return {
            OR: [{ [field]: { lt: date } }, { [field]: { gt: end } }],
          };
        }

        return { [field]: { not: { equals: filter.value } } };
      }
      return undefined;

    case 'inArray':
      if (Array.isArray(filter.value)) {
        return { [field]: { in: filter.value } };
      }
      return undefined;

    case 'notInArray':
      if (Array.isArray(filter.value)) {
        return { [field]: { notIn: filter.value } };
      }
      return undefined;

    case 'lt':
      if (filter.variant === 'number' || filter.variant === 'range') {
        return { [field]: { lt: Number(filter.value) } };
      }
      if (
        (filter.variant === 'date' || filter.variant === 'dateRange') &&
        typeof filter.value === 'string'
      ) {
        const date = new Date(Number(filter.value));
        date.setHours(23, 59, 59, 999);
        return { [field]: { lt: date } };
      }
      return undefined;

    case 'lte':
      if (filter.variant === 'number' || filter.variant === 'range') {
        return { [field]: { lte: Number(filter.value) } };
      }
      if (
        (filter.variant === 'date' || filter.variant === 'dateRange') &&
        typeof filter.value === 'string'
      ) {
        const date = new Date(Number(filter.value));
        date.setHours(23, 59, 59, 999);
        return { [field]: { lte: date } };
      }
      return undefined;

    case 'gt':
      if (filter.variant === 'number' || filter.variant === 'range') {
        return { [field]: { gt: Number(filter.value) } };
      }
      if (
        (filter.variant === 'date' || filter.variant === 'dateRange') &&
        typeof filter.value === 'string'
      ) {
        const date = new Date(Number(filter.value));
        date.setHours(0, 0, 0, 0);
        return { [field]: { gt: date } };
      }
      return undefined;

    case 'gte':
      if (filter.variant === 'number' || filter.variant === 'range') {
        return { [field]: { gte: Number(filter.value) } };
      }
      if (
        (filter.variant === 'date' || filter.variant === 'dateRange') &&
        typeof filter.value === 'string'
      ) {
        const date = new Date(Number(filter.value));
        date.setHours(0, 0, 0, 0);
        return { [field]: { gte: date } };
      }
      return undefined;

    case 'isBetween':
      return buildBetweenCondition(field, filter);

    case 'isRelativeToToday':
      return buildRelativeToTodayCondition(field, filter);

    case 'isEmpty':
      return { [field]: { equals: null } };

    case 'isNotEmpty':
      return { NOT: { [field]: { equals: null } } };

    default:
      return undefined;
  }
}

function buildBetweenCondition(
  field: string,
  filter: ExtendedColumnFilter<Record<string, unknown>>
): PrismaCondition | undefined {
  if (
    (filter.variant === 'date' || filter.variant === 'dateRange') &&
    Array.isArray(filter.value) &&
    filter.value.length === 2
  ) {
    const conditions: Array<PrismaCondition> = [];

    if (filter.value[0]) {
      const date = new Date(Number(filter.value[0]));
      date.setHours(0, 0, 0, 0);
      conditions.push({ [field]: { gte: date } });
    }

    if (filter.value[1]) {
      const date = new Date(Number(filter.value[1]));
      date.setHours(23, 59, 59, 999);
      conditions.push({ [field]: { lte: date } });
    }

    return conditions.length > 0 ? { AND: conditions } : undefined;
  }

  if (
    (filter.variant === 'number' || filter.variant === 'range') &&
    Array.isArray(filter.value) &&
    filter.value.length === 2
  ) {
    const firstValue =
      filter.value[0] && filter.value[0].trim() !== ''
        ? Number(filter.value[0])
        : null;
    const secondValue =
      filter.value[1] && filter.value[1].trim() !== ''
        ? Number(filter.value[1])
        : null;

    if (firstValue === null && secondValue === null) {
      return undefined;
    }

    if (firstValue !== null && secondValue === null) {
      return { [field]: { equals: firstValue } };
    }

    if (firstValue === null && secondValue !== null) {
      return { [field]: { equals: secondValue } };
    }

    const conditions: Array<PrismaCondition> = [];
    if (firstValue !== null) {
      conditions.push({ [field]: { gte: firstValue } });
    }
    if (secondValue !== null) {
      conditions.push({ [field]: { lte: secondValue } });
    }
    return { AND: conditions };
  }

  return undefined;
}

function buildRelativeToTodayCondition(
  field: string,
  filter: ExtendedColumnFilter<Record<string, unknown>>
): PrismaCondition | undefined {
  if (
    (filter.variant === 'date' || filter.variant === 'dateRange') &&
    typeof filter.value === 'string'
  ) {
    const today = new Date();
    const [amount, unit] = filter.value.split(' ') ?? [];

    if (!amount || !unit) return undefined;

    let startDate: Date;
    let endDate: Date;

    switch (unit) {
      case 'days':
        startDate = startOfDay(addDays(today, Number.parseInt(amount, 10)));
        endDate = endOfDay(startDate);
        break;
      case 'weeks':
        startDate = startOfDay(addDays(today, Number.parseInt(amount, 10) * 7));
        endDate = endOfDay(addDays(startDate, 6));
        break;
      case 'months':
        startDate = startOfDay(
          addDays(today, Number.parseInt(amount, 10) * 30)
        );
        endDate = endOfDay(addDays(startDate, 29));
        break;
      default:
        return undefined;
    }

    return {
      AND: [{ [field]: { gte: startDate } }, { [field]: { lte: endDate } }],
    };
  }

  return undefined;
}
