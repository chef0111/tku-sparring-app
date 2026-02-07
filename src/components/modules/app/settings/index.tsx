import { settingTabs } from './constant/tabs';
import { useSettings } from '@/contexts/settings';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export const AppSettings = () => {
  const { setIsOpen } = useSettings();
  return (
    <DialogContent
      className="bg-background min-h-180 min-w-200 p-0"
      closeButtonClassName="[&_svg:not([class*='size-'])]:size-6 no-focus"
    >
      <DialogHeader className="bg-card max-h-16 w-full rounded-t-xl border-b-2 pt-4">
        <DialogTitle className="text-center text-4xl leading-none font-semibold tracking-wide">
          MATCH SETTINGS
        </DialogTitle>
      </DialogHeader>

      <div className="absolute top-16 h-142 w-full">
        <Tabs
          className="h-full flex-row gap-0"
          defaultValue={settingTabs[0].value}
        >
          <TabsList
            variant="underline"
            orientation="vertical"
            underlinePosition="right"
            className="bg-card h-full w-36 justify-start border-r-2"
          >
            {settingTabs.map((tab) => (
              <TabsTrigger
                className="data-active:text-foreground no-focus max-h-10! text-lg font-light transition-all duration-300 data-active:font-semibold!"
                key={tab.value}
                value={tab.value}
              >
                {tab.icon && <tab.icon className="size-3" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContents mode="layout" className="h-full w-full">
            {settingTabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="h-full w-full overflow-y-auto px-4 py-4"
              >
                <tab.content />
              </TabsContent>
            ))}
          </TabsContents>
        </Tabs>
      </div>

      <DialogFooter className="bg-card fixed bottom-0 h-22 w-full items-center rounded-b-xl border-t-2 px-4">
        <Button
          variant="outline"
          size="xl"
          className="px-4 text-xl"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button size="xl" className="px-4 text-xl">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
