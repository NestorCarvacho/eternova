import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqList } from "@/components/FaqList";
import { ArrowIcon, ChatIcon, PhoneIcon } from "@/components/icons";
import { ProcessBand } from "@/components/ProcessBand";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "@/i18n/navigation";
import { asFaq, asStrings } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { services, site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "homeTitle", "homeDescription", "/");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const servicesT = await getTranslations("services");
  const faqT = await getTranslations("faq");
  const meta = await getTranslations("meta");
  const items = asFaq(faqT.raw("items")).slice(0, 4);

  return (
    <>
      <section className="relative min-h-[36rem] overflow-hidden bg-ink text-paper lg:min-h-[42rem]">
        <Image
          src="/images/hero.jpg"
          alt={meta("heroAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[28%_center] lg:object-[72%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,24,43,0.55)_0%,rgba(7,24,43,0.28)_36%,rgba(7,24,43,0.08)_62%,rgba(7,24,43,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(198,161,91,0.16),transparent_38%)]" />
        <div className="relative mx-auto flex min-h-[36rem] w-full max-w-[90rem] items-center px-5 py-20 sm:px-8 lg:min-h-[42rem]">
          <div className="hero-copy max-w-xl">
            <p translate="no" className="font-display text-4xl tracking-[0.32em] text-paper">
              ETERNOVA
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-medium text-balance sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-pretty text-paper/85">{t("lede")}</p>
            <Link
              href="/servicios"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium text-ink hover:bg-[#d7b56d]"
            >
              {t("cta")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
        <p className="pointer-events-none absolute right-10 bottom-16 hidden max-w-56 text-right font-script text-4xl leading-tight text-paper lg:block">
          {t("script")}
        </p>
      </section>

      <section className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8" aria-labelledby="servicios-titulo">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="servicios-titulo" className="font-display text-4xl text-balance text-ink sm:text-5xl">
            {t("servicesTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("servicesLede")}</p>
        </div>
        <div className="mt-10 grid items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.16fr)_minmax(0,0.9fr)] lg:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
              name={servicesT(`items.${service.id}.name`)}
              summary={servicesT(`items.${service.id}.summary`)}
              imageAlt={servicesT(`items.${service.id}.imageAlt`)}
              features={asStrings(servicesT.raw(`items.${service.id}.features`))}
              moreLabel={servicesT("more")}
              featuredLabel={servicesT("featured")}
            />
          ))}
        </div>
      </section>

      <ProcessBand />

      <section className="mx-auto grid w-full max-w-[90rem] gap-6 px-5 py-16 sm:px-8 xl:grid-cols-[1.15fr_0.95fr_0.8fr]">
        <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 sm:p-8">
          <div className="mb-4 hidden justify-end xl:flex">
            <Image src="/images/lily.jpg" alt="" width={120} height={160} className="h-28 w-auto rounded-xl object-cover" />
          </div>
          <h2 className="font-display text-4xl text-ink">{faqT("title")}</h2>
          <div className="mt-4 flex-1">
            <FaqList items={items} empty={faqT("empty")} />
          </div>
          <Link href="/preguntas-frecuentes" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
            {faqT("all")}
            <ArrowIcon />
          </Link>
        </article>

        <article className="overflow-hidden rounded-2xl border border-line bg-paper">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/crematorium.jpg"
              alt={t("crematoriumsAlt")}
              fill
              sizes="(min-width: 1280px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="font-display text-3xl text-balance text-ink">{t("crematoriumsTitle")}</h2>
            <p className="mt-3 leading-7 text-pretty text-muted">{t("crematoriumsLede")}</p>
            <p className="mt-4 text-sm font-medium text-ink">{t("crematoriumsPlace")}</p>
            <Link
              href="/crematorios"
              className="mt-5 inline-flex min-h-11 items-center rounded-full border border-ink/15 px-5 text-sm font-medium hover:border-ink"
            >
              {t("crematoriumsCta")}
            </Link>
          </div>
        </article>

        <aside className="relative overflow-hidden rounded-2xl border border-gold/70 bg-ink p-6 text-paper shadow-[inset_0_0_0_1px_rgba(198,161,91,0.25)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_0%,rgba(198,161,91,0.32),transparent_60%)]" />
          <div className="relative">
            <div className="mb-4 h-px w-16 bg-gold" />
            <h2 className="font-display text-4xl text-balance">{t("helpTitle")}</h2>
            <p className="mt-3 text-paper/75">{t("helpLede")}</p>
            <div className="mt-6 space-y-4">
              <a href={site.phoneHref} className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold/15 text-gold">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="block text-sm text-gold">{t("call")}</span>
                  <span className="text-lg">{site.phoneDisplay}</span>
                </span>
              </a>
              <a href={site.whatsappHref} className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold/15 text-gold">
                  <ChatIcon />
                </span>
                <span>
                  <span className="block text-sm text-gold">{t("whatsapp")}</span>
                  <span className="text-lg">{site.whatsappDisplay}</span>
                </span>
              </a>
            </div>
            <p className="mt-6 rounded-xl border border-gold/40 px-3 py-2 text-sm text-gold">{t("hours")}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
