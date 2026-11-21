import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "@/i18n/navigation";
import { asStrings } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "servicesTitle", "servicesDescription", "/servicios");
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <PageHero title={t("title")} lede={t("lede")} />
      <section className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8">
        <p className="mb-8 text-center">
          <Link
            href="/servicios/comparar"
            className="inline-flex min-h-11 items-center rounded-full border border-gold/60 bg-cream px-5 text-sm font-medium text-ink hover:border-gold"
          >
            {t("compare.cta")}
          </Link>
        </p>
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.16fr)_minmax(0,0.9fr)] lg:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
              name={t(`items.${service.id}.name`)}
              summary={t(`items.${service.id}.summary`)}
              imageAlt={t(`items.${service.id}.imageAlt`)}
              features={asStrings(t.raw(`items.${service.id}.features`))}
              moreLabel={t("more")}
              featuredLabel={t("featured")}
            />
          ))}
        </div>
      </section>
    </>
  );
}
