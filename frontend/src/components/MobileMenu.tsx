"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

type MenuItem = {
  href: string;
  label: string;
  indent?: boolean;
};

export function MobileMenu({
  menuLabel,
  items,
  phoneHref,
  phoneDisplay,
  whatsappHref,
  whatsappLabel,
}: {
  menuLabel: string;
  items: MenuItem[];
  phoneHref: string;
  phoneDisplay: string;
  whatsappHref: string;
  whatsappLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const node = rootRef.current;
      if (node && !node.contains(event.target as Node)) setOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative min-[1120px]:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={menuLabel}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/40"
      >
        <span aria-hidden="true" className="flex w-4 flex-col gap-1">
          <span className={`h-px bg-paper transition-transform duration-200 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px bg-paper transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`h-px bg-paper transition-transform duration-200 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label={menuLabel}
            className="fixed inset-0 z-40 bg-ink/35 motion-reduce:transition-none"
            onClick={close}
          />
          <nav
            aria-label={menuLabel}
            className="plan-nav-panel absolute right-0 z-50 mt-2 w-[min(100vw-2rem,18rem)] rounded-2xl border border-line bg-paper p-3 text-ink shadow-[0_16px_40px_rgba(7,24,43,0.16)]"
          >
            {items.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={close}
                className={`block rounded-xl px-3 py-2 hover:bg-cream ${item.indent ? "pl-6 text-sm text-muted" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <a href={phoneHref} onClick={close} className="mt-1 block whitespace-nowrap rounded-xl px-3 py-2 tabular-nums hover:bg-cream">
              {phoneDisplay}
            </a>
            <a href={whatsappHref} onClick={close} className="block rounded-xl px-3 py-2 hover:bg-cream">
              {whatsappLabel}
            </a>
          </nav>
        </>
      ) : null}
    </div>
  );
}