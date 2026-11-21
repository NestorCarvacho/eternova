"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Flag } from "@/components/Flag";
import { isLocale, localeOptions, type LocaleCode } from "@/lib/locales";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(en|fr|it|pt)(?=\/|$)/, "") || "/";
}

function switchHref(pathname: string, search: string, target: LocaleCode) {
  const bare = stripLocale(pathname);
  const path = target === "es" ? bare : bare === "/" ? `/${target}` : `/${target}${bare}`;
  return search ? `${path}?${search}` : path;
}

function currentLocale(pathname: string): LocaleCode {
  const match = pathname.match(/^\/(en|fr|it|pt)(?=\/|$)/);
  return match && isLocale(match[1]) ? match[1] : "es";
}

function Switcher({ label }: { label: string }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const current = currentLocale(pathname);
  const active = localeOptions.find((item) => item.code === current) ?? localeOptions[0];

  return (
    <details className="group relative">
      <summary
        aria-label={label}
        className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-gold/50 px-3 text-sm text-paper hover:border-gold"
      >
        <Flag code={active.code} />
        <span className="font-medium tracking-wide">{active.code.toUpperCase()}</span>
        <svg viewBox="0 0 16 16" className="size-3.5 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true">
          <path d="M4 6.5 8 10.5 12 6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 z-50 mt-2 min-w-48 rounded-2xl border border-line bg-paper p-1.5 text-ink shadow-[0_16px_40px_rgba(7,24,43,0.16)]">
        {localeOptions.map((item) => (
          <a
            key={item.code}
            href={switchHref(pathname, search, item.code)}
            hrefLang={item.code}
            lang={item.code}
            aria-current={item.code === current ? "true" : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm hover:bg-cream ${
              item.code === current ? "bg-cream font-medium" : ""
            }`}
          >
            <Flag code={item.code} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </details>
  );
}

export function LocaleSwitcher({ label }: { label: string }) {
  return (
    <Suspense
      fallback={
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/50 px-3 text-sm text-paper">
          ES
        </span>
      }
    >
      <Switcher label={label} />
    </Suspense>
  );
}
