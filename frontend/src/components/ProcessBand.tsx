import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowIcon, StepIcon } from "@/components/icons";
import { asSteps } from "@/lib/content";

export async function ProcessBand({ detailed = false }: { detailed?: boolean }) {
  const t = await getTranslations("process");
  const steps = asSteps(t.raw("steps"));

  return (
    <section
      className="relative bg-ink text-paper shadow-[inset_0_1px_0_rgba(198,161,91,0.7),inset_0_-1px_0_rgba(198,161,91,0.35)]"
      aria-labelledby="proceso-titulo"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(198,161,91,0.16),transparent_46%)]" />
      <div className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:py-9">
        <div className="lg:w-60 lg:shrink-0">
          <h2 id="proceso-titulo" className="font-display text-4xl leading-tight text-balance">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-[28ch] text-pretty text-paper/75">{detailed ? t("pageLede") : t("lede")}</p>
          {detailed ? null : (
            <Link
              href="/proceso"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold px-5 text-sm font-medium text-gold hover:bg-gold hover:text-ink"
            >
              {t("cta")}
              <ArrowIcon />
            </Link>
          )}
        </div>
        <ol className="grid flex-1 grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <li key={step.title} className="relative min-w-0 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full border border-gold text-gold">
                <StepIcon index={index} />
              </span>
              {index < steps.length - 1 ? (
                <span className="absolute top-3.5 -right-2 hidden text-gold lg:block" aria-hidden="true">
                  <ArrowIcon />
                </span>
              ) : null}
              <p className="mt-2 text-xs leading-4 text-pretty">
                <span aria-hidden="true">{index + 1}. </span>
                {step.title}
              </p>
              {detailed ? <p className="mt-2 text-left text-sm leading-6 text-pretty text-paper/70">{step.text}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
