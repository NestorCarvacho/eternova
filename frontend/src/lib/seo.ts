import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeCodes } from "@/lib/locales";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const openGraphLocale: Record<string, string> = {
  es: "es_CL",
  en: "en_US",
  fr: "fr_FR",
  it: "it_IT",
  pt: "pt_PT",
};

export function localizedPath(path: string, locale: string) {
  if (locale === "es") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export async function pageMeta(
  locale: string,
  titleKey: string,
  descriptionKey: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(titleKey);
  const description = t(descriptionKey);
  const canonical = localizedPath(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        localeCodes.map((code) => [code, localizedPath(path, code)]),
      ),
    },
    openGraph: {
      title: `${title} · ${t("siteName")}`,
      description,
      locale: openGraphLocale[locale] ?? "es_CL",
      type: "website",
      url: canonical,
      images: [{ url: "/images/hero.jpg", width: 1200, height: 675, alt: t("heroAlt") }],
    },
  };
}

export function metadataBase() {
  return new URL(siteUrl);
}
