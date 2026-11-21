import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

export async function WhatsAppFloat() {
  const t = await getTranslations("nav");

  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-[#1f8f4e] text-paper shadow-[0_10px_24px_rgba(7,24,43,0.28)] hover:bg-[#187743]"
    >
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12.1 3.2A8.7 8.7 0 0 0 4.6 16.3L3.4 20.6l4.4-1.2A8.7 8.7 0 1 0 12.1 3.2Zm4.9 12.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-.3-.1-.7-.2-1.3-.5-2.2-1-3.6-3.2-3.7-3.4-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.4c-.1.1-.2.2-.1.4.2.3.7 1.2 1.6 1.9 1.1.9 2 1.1 2.3 1.2.2.1.4.1.5-.1l.6-.7c.1-.2.3-.1.5-.1.2.1 1.3.6 1.5.7.2.1.3.2.4.3.1.2.1.6-.1 1.1Z"
        />
      </svg>
    </a>
  );
}
