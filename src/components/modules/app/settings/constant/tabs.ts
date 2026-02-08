import { HelpCircle } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { StandardSettings } from '@/components/modules/app/settings/standard';
import { AdvanceSettings } from '@/components/modules/app/settings/advance';

type SettingTab = {
  value: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  > | null;
  content: () => React.ReactNode;
};

export const settingTabs: Array<SettingTab> = [
  {
    value: 'standard',
    label: 'Standard',
    icon: null,
    content: StandardSettings,
  },
  {
    value: 'advance',
    label: 'Advance',
    icon: null,
    content: AdvanceSettings,
  },
  {
    value: 'helps',
    label: 'Helps',
    icon: HelpCircle,
    content: () => null,
  },
] as const;
