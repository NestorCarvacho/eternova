import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckIcon } from "@/components/icons";
import { ServicePlanBanner } from "@/components/ServicePlanBanner";
import { ServiceDetailSwipe } from "@/components/ServiceDetailSwipe";
import {
  ServicePlanCarouselNext,
  ServicePlanCarouselPrev,
  ServicePlanDots,
} from "@/components/ServicePlanNav";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { asStrings } from "@/lib/content";
import { formatClp } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { adjacentServices, findService, services } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = findService(slug);
  const t = await getTranslations({ locale, namespace: "services.items" });
  const meta = await pageMeta(locale, "servicesTitle", "serviceDescription", `/servicios/${slug}`);
  if (!service) return meta;
  return { ...meta, title: t(`${service.id}.name`) };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const features = asStrings(t.raw(`items.${service.id}.features`));
  const { prev, next } = adjacentServices(service.slug);
  const currentName = t(`items.${service.id}.name`);
  const prevName = prev ? t(`items.${prev.id}.name`) : "";
  const nextName = next ? t(`items.${next.id}.name`) : "";

  return (
    <ServiceDetailSwipe prevSlug={prev?.slug ?? null} nextSlug={next?.slug ?? null}>
      <article className="mx-auto w-full max-w-[90rem] px-3 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
          <ServicePlanCarouselPrev
            current={service}
            prevName={prevName}
            prevHint={t("prevPlan")}
          />
          <div className="min-w-0 flex-1">
            <p className="mb-4 text-center text-sm text-muted lg:hidden">{t("swipeHint")}</p>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              <ServicePlanBanner
                image={service.image}
                imageAlt={t(`items.${service.id}.imageAlt`)}
                title={currentName}
                featured={service.featured}
                featuredLabel={t("featured")}
              />
              <div>
                <ServicePlanDots current={service} ariaLabel={t("planNav")} />
                <p className="mt-3 text-lg text-muted">{t(`items.${service.id}.summary`)}</p>
                <p className="mt-6 font-display text-5xl text-ink tabular-nums">
                  {formatClp(service.price, locale)}
                </p>
                <h2 className="mt-8 font-display text-3xl text-ink">{t("includes")}</h2>
                <ul className="mt-4 space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2 leading-7">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/contacto?plan=${service.slug}`}
                    className="motion-press inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
                  >
                    {t("hire")}
                  </Link>
                  <Link
                    href="/servicios/comparar"
                    className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-6 text-sm font-medium text-ink hover:border-ink"
                  >
                    {t("compare.cta")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ServicePlanCarouselNext
            current={service}
            nextName={nextName}
            nextHint={t("nextPlan")}
          />
        </div>
      </article>
    </ServiceDetailSwipe>
  );
}