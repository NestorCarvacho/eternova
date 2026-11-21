import { Link } from "@/i18n/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { adjacentServices, type Service } from "@/lib/site";

const controlClass =
  "plan-carousel-control plan-carousel-pulse motion-press group inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/70 bg-paper text-gold-deep shadow-[0_8px_24px_rgba(7,24,43,0.08)] hover:border-gold hover:bg-cream sm:size-12";

export function ServicePlanCarouselPrev({
  current,
  prevName,
  prevHint,
}: {
  current: Service;
  prevName: string;
  prevHint: string;
}) {
  const { prev } = adjacentServices(current.slug);
  if (!prev) return <span className="size-11 shrink-0 sm:size-12" aria-hidden="true" />;

  return (
    <Link
      href={`/servicios/${prev.slug}`}
      className={`${controlClass} plan-carousel-control-prev`}
      aria-label={`${prevHint}: ${prevName}`}
    >
      <ChevronLeftIcon className="transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
    </Link>
  );
}

export function ServicePlanCarouselNext({
  current,
  nextName,
  nextHint,
}: {
  current: Service;
  nextName: string;
  nextHint: string;
}) {
  const { next } = adjacentServices(current.slug);
  if (!next) return <span className="size-11 shrink-0 sm:size-12" aria-hidden="true" />;

  return (
    <Link
      href={`/servicios/${next.slug}`}
      className={`${controlClass} plan-carousel-control-next`}
      aria-label={`${nextHint}: ${nextName}`}
    >
      <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
    </Link>
  );
}

export function ServicePlanDots({
  current,
  ariaLabel,
}: {
  current: Service;
  ariaLabel: string;
}) {
  const { index } = adjacentServices(current.slug);

  return (
    <ol className="plan-nav-dots mt-4" aria-label={ariaLabel}>
      {[0, 1, 2].map((step) => (
        <li key={step}>
          <span
            className={`plan-nav-dot${step === index ? " is-active" : ""}${step < index ? " is-passed" : ""}`}
          />
        </li>
      ))}
    </ol>
  );
}