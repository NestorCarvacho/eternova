import { getTranslations } from "next-intl/server";
import { CheckIcon, XMarkIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { formatClp } from "@/lib/format";
import { comparisonRows } from "@/lib/serviceComparison";
import { services } from "@/lib/site";

function InclusionIcon({ included, yesLabel, noLabel }: { included: boolean; yesLabel: string; noLabel: string }) {
  return (
    <span className="inline-flex items-center justify-center" title={included ? yesLabel : noLabel}>
      <span className="sr-only">{included ? yesLabel : noLabel}</span>
      {included ? <CheckIcon className="size-5 text-gold-deep" /> : <XMarkIcon className="size-5 text-line" />}
    </span>
  );
}

export async function ServiceCompareTable({
  locale,
  hireLabel,
  yesLabel,
  noLabel,
  featureColumnLabel,
}: {
  locale: string;
  hireLabel: string;
  yesLabel: string;
  noLabel: string;
  featureColumnLabel: string;
}) {
  const t = await getTranslations("services");
  const items = await getTranslations("services.items");
  const rows = await getTranslations("services.compare.rows");

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-paper shadow-[0_12px_32px_rgba(7,24,43,0.06)]">
      <table className="w-full min-w-[44rem] border-collapse text-sm">
        <caption className="sr-only">{t("compare.caption")}</caption>
        <thead>
          <tr className="border-b border-line bg-cream/80">
            <th scope="col" className="px-4 py-4 text-left font-medium text-ink">
              {featureColumnLabel}
            </th>
            {services.map((service) => (
              <th
                key={service.id}
                scope="col"
                className="px-3 py-4 text-center font-display text-lg text-ink"
              >
                <span className="block">{items(`${service.id}.name`)}</span>
                <span className="mt-1 block text-sm font-sans tabular-nums text-muted">
                  {formatClp(service.price, locale)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, rowIndex) => (
            <tr
              key={row.key}
              className={rowIndex % 2 === 0 ? "bg-paper" : "bg-cream/40"}
            >
              <th scope="row" className="px-4 py-3 text-left font-normal leading-snug text-ink">
                {rows(row.key)}
              </th>
              {services.map((service) => (
                <td key={service.id} className="px-3 py-3 text-center">
                  <InclusionIcon
                    included={row.included[service.id]}
                    yesLabel={yesLabel}
                    noLabel={noLabel}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-line bg-cream/60">
            <td className="px-4 py-4" />
            {services.map((service) => (
              <td key={service.id} className="px-3 py-4 text-center">
                <Link
                  href={`/contacto?plan=${service.slug}`}
                  className="motion-press inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-xs font-medium text-paper hover:bg-ink-soft sm:text-sm"
                >
                  {hireLabel}
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}