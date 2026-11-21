import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "aboutTitle", "aboutDescription", "/sobre-eternova");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <PageHero title={t("title")} lede={t("lede")} />
      <section className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
        <div className="space-y-5 text-lg leading-8 text-pretty text-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
          >
            {t("cta")}
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center rounded-full border border-ink/15 px-6 text-sm font-medium hover:border-ink"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
