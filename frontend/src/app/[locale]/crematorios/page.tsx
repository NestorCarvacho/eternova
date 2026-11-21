import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "crematoriumsTitle", "crematoriumsDescription", "/crematorios");
}

export default async function CrematoriumsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("crematoriums");

  return (
    <>
      <PageHero title={t("title")} lede={t("lede")} />
      <section className="mx-auto grid w-full max-w-[90rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
          <Image src="/images/crematorium.jpg" alt={t("alt")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-gold-deep">{t("place")}</p>
          <p className="mt-4 max-w-[62ch] text-lg leading-8 text-pretty text-muted">{t("body")}</p>
          <ul className="mt-6 space-y-3 text-ink">
            <li>{t("point1")}</li>
            <li>{t("point2")}</li>
            <li>{t("point3")}</li>
          </ul>
          <Link
            href="/contacto"
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
          >
            {t("cta")}
          </Link>
        </div>
      </section>
    </>
  );
}
