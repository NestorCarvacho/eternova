import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import { services } from "@/lib/site";

const paths = [
  "/",
  "/servicios",
  ...services.map((service) => `/servicios/${service.slug}`),
  "/proceso",
  "/preguntas-frecuentes",
  "/crematorios",
  "/sobre-eternova",
  "/contacto",
  "/privacidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: new URL(localizedPath(path, locale), base).toString(),
    })),
  );
}
