import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ProcessBand } from "@/components/ProcessBand";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "processTitle", "processDescription", "/proceso");
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("process");
  const services = await getTranslations("services");

  return (
    <>
      <PageHero title={t("title")} lede={t("pageLede")} />
      <ProcessBand detailed />
      <section className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8">
        <Link
          href="/servicios"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          {services("title")}
        </Link>
      </section>
    </>
  );
}
