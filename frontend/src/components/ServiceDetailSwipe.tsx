"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SWIPE_MIN = 56;

export function ServiceDetailSwipe({
  prevSlug,
  nextSlug,
  children,
}: {
  prevSlug: string | null;
  nextSlug: string | null;
  children: ReactNode;
}) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const startX = useRef(0);
  const startY = useRef(0);
  const tracking = useRef(false);

  useEffect(() => {
    if (reduced) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      startX.current = event.touches[0].clientX;
      startY.current = event.touches[0].clientY;
      tracking.current = true;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking.current) return;
      tracking.current = false;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;
      if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;

      if (dx > 0 && prevSlug) {
        router.push(`/servicios/${prevSlug}`);
        return;
      }
      if (dx < 0 && nextSlug) {
        router.push(`/servicios/${nextSlug}`);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [nextSlug, prevSlug, reduced, router]);

  return children;
}