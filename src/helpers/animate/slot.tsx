import React from 'react';
import { isMotionComponent, motion } from 'motion/react';
import type { MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type ReactRef<T> = React.RefCallback<T> | React.RefObject<T | null> | null;

function mergeRefs<T>(...refs: Array<ReactRef<T>>): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

interface MergeableProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

function mergeProps(
  childProps: MergeableProps,
  slotProps: MergeableProps
): MergeableProps {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...childProps.style,
      ...slotProps.style,
    };
  }

  return merged;
}

export interface SlotProps extends MotionProps {
  children: React.ReactElement<{
    ref?: ReactRef<HTMLElement>;
    [key: string]: unknown;
  }>;
  ref?: ReactRef<HTMLElement>;
}

function Slot({ children, ref, ...props }: SlotProps) {
  if (!React.isValidElement(children)) return null;

  const childType = children.type as React.ElementType;
  const isAlreadyMotion =
    typeof childType === 'object' &&
    childType !== null &&
    isMotionComponent(childType);

  const Base = React.useMemo(
    () => (isAlreadyMotion ? childType : motion.create(childType)),
    [isAlreadyMotion, childType]
  );

  const { ref: childRef, ...childProps } = children.props as {
    ref?: ReactRef<HTMLElement>;
    [key: string]: unknown;
  };

  const mergedProps = mergeProps(
    childProps as MergeableProps,
    props as MergeableProps
  );

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef ?? null, ref ?? null)} />
  );
}

export { Slot };
