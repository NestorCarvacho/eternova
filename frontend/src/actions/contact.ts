"use server";

import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import { resolveBackendUrl } from "@/lib/backend-url";
import { services } from "@/lib/site";
import type { ContactField, ContactState } from "@/lib/contact";

const slugs = new Set<string>(services.map((service) => service.slug));

function fail(field: ContactField, message: string): ContactState {
  return { ok: false, message, field, nonce: Date.now() };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = await getLocale();
  const t = await getTranslations("contact.form");

  if (String(formData.get("company") ?? "").trim()) {
    return { ok: true, message: t("success"), nonce: Date.now() };
  }

  const startedAt = Number(formData.get("started_at"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return fail("message", t("errors.send"));
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const planValue = String(formData.get("plan") ?? "").trim();
  const plan = slugs.has(planValue) ? planValue : "";

  if (name.length < 2 || name.length > 120) {
    return fail("name", t("errors.name"));
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return fail("email", t("errors.email"));
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    return fail("phone", t("errors.phone"));
  }
  if (message.length < 10 || message.length > 2000) {
    return fail("message", t("errors.message"));
  }

  const apiUrl = resolveBackendUrl();
  const requestHeaders = await headers();
  const clientIp =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    "";

  try {
    const response = await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        ...(clientIp ? { "x-forwarded-for": clientIp } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        plan: plan || null,
        locale,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("[contact] API responded", response.status, apiUrl);
      return { ok: false, message: t("errors.send"), nonce: Date.now() };
    }
  } catch (error) {
    console.error("[contact] API unreachable", apiUrl, error);
    return { ok: false, message: t("errors.send"), nonce: Date.now() };
  }

  return { ok: true, message: t("success"), nonce: Date.now() };
}
