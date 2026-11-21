import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceCompareTable } from "@/components/ServiceCompareTable";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "compareTitle", "compareDescription", "/servicios/comparar");
}

export default async function ServiceComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <PageHero title={t("compare.title")} lede={t("compare.lede")} />
      <section className="mx-auto w-full max-w-[90rem] px-5 pb-16 sm:px-8">
        <p className="mb-6 max-w-3xl text-sm text-muted">{t("compare.note")}</p>
        <ServiceCompareTable
          locale={locale}
          hireLabel={t("hire")}
          yesLabel={t("compare.included")}
          noLabel={t("compare.notIncluded")}
          featureColumnLabel={t("compare.featureColumn")}
        />
      </section>
    </>
  );
}