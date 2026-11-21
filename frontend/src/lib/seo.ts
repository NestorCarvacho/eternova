import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeCodes } from "@/lib/locales";

function trimTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

/** URL pública del sitio (canonical, sitemap, OG). */
export function siteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured && !/^https?:\/\/localhost(\b|:)/i.test(configured)) {
    return trimTrailingSlash(configured);
  }
  const railway = process.env.RAILWAY_PUBLIC_DOMAIN?.trim();
  if (railway) {
    return `https://${railway}`;
  }
  return configured ? trimTrailingSlash(configured) : "http://localhost:3000";
}

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

  const openGraphTitle = `${title} · ${t("siteName")}`;
  const image = {
    url: "/images/hero.jpg",
    width: 1200,
    height: 675,
    alt: t("heroAlt"),
  };

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: Object.fromEntries(
        localeCodes.map((code) => [code, localizedPath(path, code)]),
      ),
    },
    openGraph: {
      title: openGraphTitle,
      description,
      siteName: t("siteName"),
      locale: openGraphLocale[locale] ?? "es_CL",
      type: "website",
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [image.url],
    },
  };
}

export function metadataBase() {
  return new URL(siteOrigin());
}
