import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8">
      <h1 className="font-display text-5xl text-balance text-ink">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("lede")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
