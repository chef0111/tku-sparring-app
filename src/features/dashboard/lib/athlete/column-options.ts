import type { AthleteProfileData } from '@/contracts/athlete/profile';
import type { DataTableRowAction } from '@/lib/data-table/features';

export type ColumnOptions = {
  onRowAction: (action: DataTableRowAction<AthleteProfileData>) => void;
  nameFilterQueryKey?: 'name' | 'query';
};
