"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  COOKIE_CHOICE_EVENT,
  readCookieChoice,
  requestCookieChoice,
  saveCookieChoice,
  type CookieChoice,
} from "@/lib/cookies";

export function CookieNotice() {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readCookieChoice() === null);
    const show = () => setOpen(true);
    window.addEventListener(COOKIE_CHOICE_EVENT, show);
    return () => window.removeEventListener(COOKIE_CHOICE_EVENT, show);
  }, []);

  function choose(choice: CookieChoice) {
    saveCookieChoice(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4 sm:bottom-4 sm:pr-24 sm:pl-6">
      <section
        aria-label={t("label")}
        className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-gold/50 bg-paper p-5 text-ink shadow-[0_16px_40px_rgba(7,24,43,0.18)] sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-xl">
          <h2 className="font-display text-2xl">{t("label")}</h2>
          <p className="mt-2 text-sm leading-6 text-pretty text-muted">{t("body")}</p>
          <Link href="/privacidad" className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-gold underline-offset-4">
            {t("privacy")}
          </Link>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-stretch">
          <button
            type="button"
            onClick={() => choose("all")}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d7b56d]"
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/20 px-5 text-sm font-medium text-ink hover:border-ink"
          >
            {t("reject")}
          </button>
        </div>
      </section>
    </div>
  );
}

export function CookieSettingsButton() {
  const t = useTranslations("cookies");

  return (
    <button
      type="button"
      onClick={requestCookieChoice}
      className="inline-flex min-h-11 items-center rounded-full border border-gold px-5 text-sm font-medium text-ink hover:bg-gold"
    >
      {t("change")}
    </button>
  );
}
