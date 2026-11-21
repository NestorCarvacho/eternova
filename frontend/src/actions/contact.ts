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

  const startedRaw = String(formData.get("started_at") ?? "").trim();
  const startedAt = Number(startedRaw);
  if (
    startedRaw &&
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < 1500
  ) {
    return fail("message", t("errors.fastSubmit"));
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
  const outboundHeaders: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  };
  const forwarded = requestHeaders.get("x-forwarded-for");
  const realIp = requestHeaders.get("x-real-ip");
  if (forwarded) outboundHeaders["x-forwarded-for"] = forwarded;
  else if (realIp) outboundHeaders["x-forwarded-for"] = realIp;

  const payload = JSON.stringify({
    name,
    email,
    phone,
    message,
    plan: plan || null,
    locale,
  });

  try {
    const response = await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: outboundHeaders,
      body: payload,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("[contact] API responded", response.status);
      return { ok: false, message: t("errors.send"), nonce: Date.now() };
    }
  } catch (error) {
    console.error("[contact] API unreachable", error);
    return { ok: false, message: t("errors.send"), nonce: Date.now() };
  }

  return { ok: true, message: t("success"), nonce: Date.now() };
}
