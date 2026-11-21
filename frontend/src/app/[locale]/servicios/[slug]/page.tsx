import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { asStrings } from "@/lib/content";
import { formatClp } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { findService, services } from "@/lib/site";

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

  return (
    <article className="mx-auto grid w-full max-w-[90rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={service.image}
          alt={t(`items.${service.id}.imageAlt`)}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        {service.featured ? (
          <p className="mb-3 inline-flex rounded-full bg-gold px-3 py-1 text-sm font-medium text-ink">
            {t("featured")}
          </p>
        ) : null}
        <h1 className="font-display text-5xl leading-none text-balance text-ink">
          {t(`items.${service.id}.name`)}
        </h1>
        <p className="mt-3 text-lg text-muted">{t(`items.${service.id}.summary`)}</p>
        <p className="mt-6 font-display text-5xl text-ink tabular-nums">{formatClp(service.price, locale)}</p>
        <h2 className="mt-8 font-display text-3xl text-ink">{t("includes")}</h2>
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 leading-7">
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/contacto?plan=${service.slug}`}
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          {t("hire")}
        </Link>
      </div>
    </article>
  );
}
