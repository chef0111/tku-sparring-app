import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner } from 'sonner';
import { Spinner } from './spinner';
import type { ToasterProps } from 'sonner';
import { useTheme } from '@/contexts/themes';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system', forcedTheme } = useTheme();

  return (
    <Sonner
      theme={(forcedTheme ?? theme) as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Spinner className="size-4" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
          closeButton: 'opacity-0 group-hover:opacity-100 transition-opacity',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
