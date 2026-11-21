import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "termsTitle", "termsDescription", "/terminos");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  const sections = [
    { title: t("s1"), body: t("p1") },
    { title: t("s2"), body: t("p2") },
    { title: t("s3"), body: t("p3") },
    { title: t("s4"), body: t("p4") },
    { title: t("s5"), body: t("p5") },
  ];

  return (
    <>
      <PageHero title={t("title")} lede={t("lede")} />
      <section className="mx-auto w-full max-w-3xl space-y-8 px-5 py-14 sm:px-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-3xl text-ink">{section.title}</h2>
            <p className="mt-3 max-w-[68ch] leading-8 text-pretty text-muted">{section.body}</p>
          </section>
        ))}
        <Link
          href="/contacto"
          className="motion-press inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          {t("cta")}
        </Link>
      </section>
    </>
  );
}