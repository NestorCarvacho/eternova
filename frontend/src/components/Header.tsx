import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
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
          <details className="relative min-[1120px]:hidden">
            <summary
              aria-label={t("menu")}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/40"
            >
              <span aria-hidden="true" className="flex w-4 flex-col gap-1">
                <span className="h-px bg-paper" />
                <span className="h-px bg-paper" />
                <span className="h-px bg-paper" />
              </span>
            </summary>
            <nav
              aria-label={t("menu")}
              className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-line bg-paper p-3 text-ink shadow-[0_16px_40px_rgba(7,24,43,0.16)]"
            >
              <Link href="/servicios" className="block rounded-xl px-3 py-2 hover:bg-cream">
                {t("services")}
              </Link>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="block rounded-xl px-3 py-2 pl-6 text-sm text-muted hover:bg-cream"
                >
                  {plans(`${service.id}.name`)}
                </Link>
              ))}
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-2 hover:bg-cream">
                  {link.label}
                </Link>
              ))}
              <a href={site.phoneHref} className="mt-1 block whitespace-nowrap rounded-xl px-3 py-2 tabular-nums hover:bg-cream">
                {site.phoneDisplay}
              </a>
              <a href={site.whatsappHref} className="block rounded-xl px-3 py-2 hover:bg-cream">
                {t("whatsapp")}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
