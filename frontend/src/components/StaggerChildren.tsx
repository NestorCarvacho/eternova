"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { RevealOnView } from "@/components/RevealOnView";

export function StaggerChildren({
  children,
  stepMs = 90,
  className,
}: {
  children: ReactNode;
  stepMs?: number;
  className?: string;
}) {
  return Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    return (
      <RevealOnView key={child.key ?? index} delayMs={index * stepMs} className={className}>
        {child}
      </RevealOnView>
    );
  });
}