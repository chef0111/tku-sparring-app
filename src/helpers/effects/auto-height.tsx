import React from "react";
import { motion } from "motion/react";
import type { HTMLMotionProps, Transition } from "motion/react";

import { useAutoHeight } from "@/hooks/use-auto-height";
import { Slot } from "@/helpers/animate/slot";

export interface AutoHeightProps extends Omit<
  HTMLMotionProps<"div">,
  "animate" | "transition"
> {
  children?: React.ReactNode;
  deps?: React.DependencyList;
  transition?: Transition;
  animate?: { height?: number } & Record<string, number | string>;
  render?: React.ReactElement<{ children?: React.ReactNode }>;
}

function AutoHeight({
  children,
  deps = [],

  transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.01,
  },

  style,
  animate,
  render,
  ...props
}: AutoHeightProps) {
  const { ref, height } = useAutoHeight(deps);

  const motionProps = {
    style: { overflow: "hidden" as const, ...style },
    animate: { height, ...animate },
    transition,
  };

  if (render) {
    return (
      <Slot {...motionProps} {...props}>
        {React.cloneElement(render, {
          children: (
            <>
              {render.props.children}
              <div ref={ref}>{children}</div>
            </>
          ),
        })}
      </Slot>
    );
  }

  return (
    <motion.div {...motionProps} {...props}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

export { AutoHeight };
