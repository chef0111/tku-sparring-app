import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  title?: React.ReactNode;
}

export const Header = ({ children, title, className, action }: HeaderProps) => {
  return (
    <div
      className={cn(
        'flex h-12 shrink-0 items-center gap-2 border-b px-4',
        className
      )}
    >
      <SidebarTrigger className="-ml-2" />
      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-full"
      />
      {action}
      {action && (
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-full"
        />
      )}
      <h1 className="mx-2 text-lg font-semibold">{title}</h1>
      {children}
    </div>
  );
};
