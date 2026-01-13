import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import type React from "react";
import { cn } from "@/lib/utils";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const annotation = annotate(element, annotationConfig);

    annotationRef.current = annotation;
    annotationRef.current.show();

    let lastRect = element.getBoundingClientRect();
    let updateTimeout: NodeJS.Timeout | null = null;

    const updateAnnotationPosition = () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }

      updateTimeout = setTimeout(() => {
        const currentRect = element.getBoundingClientRect();

        if (
          currentRect.top !== lastRect.top ||
          currentRect.left !== lastRect.left ||
          currentRect.width !== lastRect.width ||
          currentRect.height !== lastRect.height
        ) {
          lastRect = currentRect;

          if (annotationRef.current) {
            annotationRef.current.remove();
          }

          const instantAnnotation = annotate(element, {
            ...annotationConfig,
            animationDuration: 0,
          });

          annotationRef.current = instantAnnotation;
          instantAnnotation.show();
        }
      }, 10);
    };

    const intersectionObserver = new IntersectionObserver(
      () => {
        updateAnnotationPosition();
      },
      { threshold: [0, 0.1, 0.5, 0.9, 1] }
    );

    const resizeObserver = new ResizeObserver(() => {
      updateAnnotationPosition();
    });

    intersectionObserver.observe(element);
    resizeObserver.observe(element);

    let parent = element.parentElement;
    while (parent && parent !== document.body) {
      resizeObserver.observe(parent);
      parent = parent.parentElement;
    }
    resizeObserver.observe(document.body);

    const mutationObserver = new MutationObserver(() => {
      updateAnnotationPosition();
    });

    const formAncestor = element.closest("form") || document.body;
    mutationObserver.observe(formAncestor, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "data-invalid"],
    });

    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span
      ref={elementRef}
      className={cn("relative inline-block bg-transparent", className)}
    >
      {children}
    </span>
  );
}
