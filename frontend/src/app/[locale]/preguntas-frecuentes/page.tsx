import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { asFaq } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "faqTitle", "faqDescription", "/preguntas-frecuentes");
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const contact = await getTranslations("nav");

  return (
    <>
      <PageHero title={t("title")} lede={t("lede")} />
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8">
        <FaqList items={asFaq(t.raw("items"))} empty={t("empty")} />
        <Link
          href="/contacto"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          {contact("contact")}
        </Link>
      </section>
    </>
  );
}
