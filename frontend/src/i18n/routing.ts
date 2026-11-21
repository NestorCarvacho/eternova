import { defineRouting } from "next-intl/routing";
import { localeCodes } from "@/lib/locales";

export const routing = defineRouting({
  locales: [...localeCodes],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
