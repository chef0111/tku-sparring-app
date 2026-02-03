import * as React from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('inline-block shrink-0', {
  variants: {
    size: {
      xs: 'size-2',
      sm: 'size-3',
      default: 'size-4',
      lg: 'size-6',
      xl: 'size-8',
    },
    variant: {
      default: '[&_rect]:fill-background',
      muted: '[&_rect]:fill-muted-foreground',
      foreground: '[&_rect]:fill-foreground',
      destructive: '[&_rect]:fill-destructive',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>, VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading', ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="20 20 60 60"
        preserveAspectRatio="xMidYMid"
        className={cn(spinnerVariants({ size, variant, className }))}
        role="status"
        aria-label={label}
        aria-live="polite"
        {...props}
      >
        <g>
          <g transform="rotate(0 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.9166666666666666s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(30 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.8333333333333334s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(60 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.75s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(90 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.6666666666666666s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(120 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.5833333333333334s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(150 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.5s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(180 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.4166666666666667s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(210 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.3333333333333333s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(240 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.25s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(270 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.16666666666666666s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(300 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="-0.08333333333333333s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
          <g transform="rotate(330 50 50)">
            <rect height="14" width="6" ry="2.94" rx="2.94" y="23" x="47">
              <animate
                repeatCount="indefinite"
                begin="0s"
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
        </g>
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
