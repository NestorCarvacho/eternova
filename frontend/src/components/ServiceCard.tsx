import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { formatClp } from "@/lib/format";
import type { Service } from "@/lib/site";

export function ServiceCard({
  service,
  locale,
  name,
  summary,
  imageAlt,
  features,
  moreLabel,
  featuredLabel,
}: {
  service: Service;
  locale: string;
  name: string;
  summary: string;
  imageAlt: string;
  features: string[];
  moreLabel: string;
  featuredLabel: string;
}) {
  return (
    <article
      className={`service-card flex h-full flex-col rounded-2xl bg-paper ${
        service.featured
          ? "relative z-10 border-2 border-gold shadow-[0_18px_40px_rgba(7,24,43,0.12)] lg:scale-[1.07]"
          : "border border-line"
      }`}
    >
      <div className="relative">
        {service.featured ? (
          <p className="absolute top-3 left-3 z-10 rounded-full bg-gold px-3 py-1 text-sm font-medium text-ink">
            {featuredLabel}
          </p>
        ) : null}
        <div className="service-card-media relative aspect-[4/3] overflow-hidden rounded-t-2xl">
          <Image
            src={service.image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={`font-display leading-none text-balance text-ink ${service.featured ? "text-4xl" : "text-3xl"}`}>
          {name}
        </h3>
        <p className="mt-2 text-muted">{summary}</p>
        <p className={`mt-4 font-display text-ink tabular-nums ${service.featured ? "text-5xl" : "text-4xl"}`}>
          {formatClp(service.price, locale)}
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-ink">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/servicios/${service.slug}`}
          className={`motion-press mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium ${
            service.featured
              ? "bg-ink text-paper hover:bg-ink-soft"
              : "border border-ink/15 text-ink hover:border-ink"
          }`}
        >
          {moreLabel}
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
