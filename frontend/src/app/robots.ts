import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = siteOrigin();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
