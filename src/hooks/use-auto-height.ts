import { useCallback, useLayoutEffect, useRef, useState } from "react";

export interface UseAutoHeightOptions {
  includeParentBox?: boolean;
  includeSelfBox?: boolean;
}

export interface UseAutoHeightReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  height: number;
}

export function useAutoHeight(
  deps: React.DependencyList = [],
  options: UseAutoHeightOptions = {
    includeParentBox: true,
    includeSelfBox: false,
  }
): UseAutoHeightReturn {
  const ref = useRef<HTMLDivElement>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;

    const base = el.getBoundingClientRect().height || 0;

    let extra = 0;

    if (options.includeParentBox && el.parentElement) {
      const cs = getComputedStyle(el.parentElement);
      const paddingY =
        (parseFloat(cs.paddingTop || "0") || 0) +
        (parseFloat(cs.paddingBottom || "0") || 0);
      const borderY =
        (parseFloat(cs.borderTopWidth || "0") || 0) +
        (parseFloat(cs.borderBottomWidth || "0") || 0);
      const isBorderBox = cs.boxSizing === "border-box";
      if (isBorderBox) {
        extra += paddingY + borderY;
      }
    }

    if (options.includeSelfBox) {
      const cs = getComputedStyle(el);
      const paddingY =
        (parseFloat(cs.paddingTop || "0") || 0) +
        (parseFloat(cs.paddingBottom || "0") || 0);
      const borderY =
        (parseFloat(cs.borderTopWidth || "0") || 0) +
        (parseFloat(cs.borderBottomWidth || "0") || 0);
      const isBorderBox = cs.boxSizing === "border-box";
      if (isBorderBox) {
        extra += paddingY + borderY;
      }
    }

    const dpr =
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const total = Math.ceil((base + extra) * dpr) / dpr;

    return total;
  }, [options.includeParentBox, options.includeSelfBox]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    setHeight(measure());

    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    const ro = new ResizeObserver(() => {
      const next = measure();
      requestAnimationFrame(() => setHeight(next));
    });

    ro.observe(el);
    if (options.includeParentBox && el.parentElement) {
      ro.observe(el.parentElement);
    }

    roRef.current = ro;

    return () => {
      ro.disconnect();
      roRef.current = null;
    };
  }, [options.includeParentBox, options.includeSelfBox, measure]);

  // Trigger height recalculation when deps change
  useLayoutEffect(() => {
    const next = measure();
    if (next !== height) setHeight(next);
  }, deps);

  useLayoutEffect(() => {
    if (height === 0) {
      const next = measure();
      if (next !== 0) setHeight(next);
    }
  }, [height, measure]);

  return {
    ref,
    height,
  };
}
