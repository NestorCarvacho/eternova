import Image from "next/image";

export function ServicePlanBanner({
  image,
  imageAlt,
  title,
  featured,
  featuredLabel,
}: {
  image: string;
  imageAlt: string;
  title: string;
  featured: boolean;
  featuredLabel: string;
}) {
  return (
    <div className="service-plan-banner relative h-36 w-full overflow-hidden rounded-2xl sm:h-40 lg:aspect-[4/3] lg:h-auto">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20"
        aria-hidden="true"
      />
      {featured ? (
        <p className="absolute top-3 left-3 z-10 rounded-full bg-gold px-3 py-1 text-sm font-medium text-ink">
          {featuredLabel}
        </p>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 lg:p-6">
        <h1 className="font-display text-3xl leading-none text-balance text-paper sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
    </div>
  );
}