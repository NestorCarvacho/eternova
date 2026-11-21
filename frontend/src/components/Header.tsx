import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { services, site } from "@/lib/site";

const linkClass =
  "whitespace-nowrap rounded-full px-2 py-2 text-sm text-paper/90 hover:text-paper";

export async function Header() {
  const t = await getTranslations("nav");
  const plans = await getTranslations("services.items");

  const links = [
    { href: "/preguntas-frecuentes" as const, label: t("faq") },
    { href: "/crematorios" as const, label: t("crematoriums") },
    { href: "/sobre-eternova" as const, label: t("about") },
    { href: "/contacto" as const, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-paper">
      <div className="flex w-full items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t("home")} className="flex shrink-0 items-center gap-2">
          <Logo className="h-7 w-11 text-gold" />
          <span aria-hidden="true" translate="no" className="font-display text-xl tracking-[0.22em]">
            ETERNOVA
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <nav aria-label={t("services")} className="hidden items-center min-[1120px]:flex">
            <div className="group relative">
              <Link href="/servicios" className={linkClass}>
                {t("services")}
              </Link>
              <div className="pointer-events-none absolute left-0 top-full z-50 min-w-60 pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 motion-reduce:transition-none">
                <div className="rounded-2xl border border-line bg-paper p-2 text-ink shadow-[0_16px_40px_rgba(7,24,43,0.12)]">
                  <Link href="/servicios" className="block rounded-xl px-3 py-2 text-sm hover:bg-cream">
                    {t("allServices")}
                  </Link>
                  <Link href="/servicios/comparar" className="block rounded-xl px-3 py-2 text-sm hover:bg-cream">
                    {t("comparePlans")}
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/servicios/${service.slug}`}
                      className="block rounded-xl px-3 py-2 text-sm hover:bg-cream"
                    >
                      {plans(`${service.id}.name`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={site.phoneHref}
            aria-label={t("call")}
            className="hidden h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-gold/50 px-3.5 text-sm tabular-nums text-paper hover:border-gold min-[1320px]:inline-flex"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsappHref}
            className="hidden h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-gold/50 px-3.5 text-sm text-paper hover:border-gold min-[1120px]:inline-flex"
          >
            {t("whatsapp")}
          </a>
          <LocaleSwitcher label={t("language")} />
          <MobileMenu
            menuLabel={t("menu")}
            phoneHref={site.phoneHref}
            phoneDisplay={site.phoneDisplay}
            whatsappHref={site.whatsappHref}
            whatsappLabel={t("whatsapp")}
            items={[
              { href: "/servicios", label: t("services") },
              { href: "/servicios/comparar", label: t("comparePlans") },
              ...services.map((service) => ({
                href: `/servicios/${service.slug}`,
                label: plans(`${service.id}.name`),
                indent: true,
              })),
              ...links.map((link) => ({ href: link.href, label: link.label })),
            ]}
          />
        </div>
      </div>
    </header>
  );
}
