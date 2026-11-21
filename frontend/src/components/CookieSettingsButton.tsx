"use client";

import { useTranslations } from "next-intl";
import { requestCookieChoice } from "@/lib/cookies";

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