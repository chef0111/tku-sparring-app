import { settingTabs } from '@/common/constants';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AppSettings = () => {
  return (
    <DialogContent
      className="bg-card min-h-180 min-w-3xl p-0"
      closeButtonClassName="[&_svg:not([class*='size-'])]:size-6 no-focus"
    >
      <DialogHeader className="max-h-17 w-full border-b-2 pt-4">
        <DialogTitle className="text-center text-4xl font-semibold tracking-wide">
          MATCH SETTINGS
        </DialogTitle>
      </DialogHeader>

      <Tabs
        className="absolute top-17 h-163 flex-row"
        defaultValue={settingTabs[0].value}
      >
        <TabsList
          variant="underline"
          direction="vertical"
          underlinePosition="right"
          className="bg-background h-full w-30 justify-start rounded-bl-2xl border-r-2"
        >
          {settingTabs.map((tab) => (
            <TabsTrigger
              className="data-active:text-foreground no-focus max-h-10! text-lg font-light transition-all duration-300 data-active:font-semibold!"
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </DialogContent>
  );
};
