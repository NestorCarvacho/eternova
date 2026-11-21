import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { localizedPath, pageMeta } from "@/lib/seo";
import { findService, services, site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "contactTitle", "contactDescription", "/contacto");
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const form = await getTranslations("contact.form");
  const plans = await getTranslations("services.items");
  const requested = typeof query.plan === "string" ? query.plan : "";
  const planDefault = findService(requested)?.slug ?? "";

  return (
    <>
      <PageHero title={t("title")} lede={t("lede")} />
      <section className="mx-auto grid w-full max-w-[90rem] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <p className="text-muted">{t("channels")}</p>
          <a href={site.phoneHref} className="mt-6 block">
            <span className="block text-sm text-gold-deep">{t("call")}</span>
            <span className="text-2xl text-ink">{site.phoneDisplay}</span>
          </a>
          <a href={site.whatsappHref} className="mt-5 block">
            <span className="block text-sm text-gold-deep">{t("whatsapp")}</span>
            <span className="text-2xl text-ink">{site.whatsappDisplay}</span>
          </a>
          <p className="mt-6 text-sm text-muted">{t("hours")}</p>
        </aside>
        <ContactForm
          planDefault={planDefault}
          placeholders={{
            name: form("namePlaceholder"),
            email: form("emailPlaceholder"),
            phone: form("phonePlaceholder"),
            message: form("messagePlaceholder"),
          }}
          labels={{
            name: form("name"),
            email: form("email"),
            phone: form("phone"),
            message: form("message"),
            plan: form("plan"),
            planEmpty: form("planEmpty"),
            plans: services.map((service) => ({
              value: service.slug,
              label: plans(`${service.id}.name`),
            })),
            submit: form("submit"),
            sending: form("sending"),
            privacy: form("privacy"),
            privacyHref: localizedPath("/privacidad", locale),
            privacyLink: form("privacyLink"),
            termsLead: form("termsLead"),
            termsLink: form("termsLink"),
            termsHref: localizedPath("/terminos", locale),
            company: form("company"),
          }}
        />
      </section>
    </>
  );
}
