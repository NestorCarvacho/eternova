import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedPath, siteOrigin } from "@/lib/seo";
import { services } from "@/lib/site";

export const dynamic = "force-dynamic";

const paths = [
  "/",
  "/servicios",
  "/servicios/comparar",
  ...services.map((service) => `/servicios/${service.slug}`),
  "/proceso",
  "/preguntas-frecuentes",
  "/crematorios",
  "/sobre-eternova",
  "/contacto",
  "/privacidad",
  "/terminos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteOrigin();
  const now = new Date();

  return paths.map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(localizedPath(path, locale), base).toString(),
      ]),
    );
    const defaultUrl = languages.es ?? Object.values(languages)[0]!;

    return {
      url: defaultUrl,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/servicios") ? 0.9 : 0.7,
      alternates: {
        languages: {
          ...languages,
          "x-default": defaultUrl,
        },
      },
    };
  });
}