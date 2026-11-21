import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedPath, siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";
import { services } from "@/lib/site";

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
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: new URL(localizedPath(path, locale), base).toString(),
    })),
  );
}
