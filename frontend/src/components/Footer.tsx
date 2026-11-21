import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const links = [
    { href: "/servicios" as const, label: nav("services") },
    { href: "/preguntas-frecuentes" as const, label: nav("faq") },
    { href: "/crematorios" as const, label: nav("crematoriums") },
    { href: "/contacto" as const, label: nav("contact") },
    { href: "/privacidad" as const, label: t("privacy") },
    { href: "/terminos" as const, label: t("terms") },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Link href="/" aria-label={nav("home")} className="inline-flex items-center gap-2">
            <Logo className="h-7 w-11 text-gold" />
            <span aria-hidden="true" translate="no" className="font-display text-xl tracking-[0.22em]">
              ETERNOVA
            </span>
          </Link>
          <p className="mt-4 max-w-sm font-display text-2xl leading-snug text-pretty text-paper/90">
            {t("tagline")}
          </p>
        </div>
        <nav aria-label={t("navLabel")} className="flex flex-col items-start gap-1 md:items-end">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-1 py-1.5 text-sm text-paper/80 hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
