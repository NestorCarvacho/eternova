"use client";

import { useEffect, useRef, type InputHTMLAttributes } from "react";
import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import { initialContactState, type ContactLabels } from "@/lib/contact";

export function ContactForm({
  labels,
  planDefault,
  placeholders,
}: {
  labels: ContactLabels;
  planDefault: string;
  placeholders: { name: string; email: string; phone: string; message: string };
}) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  const dirty = useRef(false);
  const formStartedAt = useRef(String(Date.now()));

  useEffect(() => {
    if (!state.field) return;
    document.getElementById(state.field)?.focus();
  }, [state.field, state.nonce]);

  useEffect(() => {
    if (state.ok) dirty.current = false;
  }, [state.ok, state.nonce]);

  useEffect(() => {
    const onLeave = (event: BeforeUnloadEvent) => {
      if (!dirty.current || state.ok) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      onInput={() => {
        dirty.current = true;
      }}
      className="grid gap-4"
    >
      <div hidden>
        <label htmlFor="company">{labels.company}</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        <input
          type="hidden"
          name="started_at"
          defaultValue={formStartedAt.current}
          readOnly
        />
      </div>

      <Field
        id="name"
        name="name"
        label={labels.name}
        autoComplete="name"
        placeholder={placeholders.name}
        error={state.field === "name" ? state.message : ""}
      />
      <Field
        id="email"
        name="email"
        type="email"
        inputMode="email"
        label={labels.email}
        autoComplete="email"
        spellCheck={false}
        placeholder={placeholders.email}
        error={state.field === "email" ? state.message : ""}
      />
      <Field
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        label={labels.phone}
        autoComplete="tel"
        placeholder={placeholders.phone}
        error={state.field === "phone" ? state.message : ""}
      />

      <div>
        <label htmlFor="plan" className="text-sm font-medium text-ink">
          {labels.plan}
        </label>
        <select
          id="plan"
          name="plan"
          defaultValue={planDefault}
          className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-ink"
        >
          <option value="">{labels.planEmpty}</option>
          {labels.plans.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={placeholders.message}
          aria-invalid={state.field === "message" || undefined}
          aria-describedby={state.field === "message" ? "message-error" : undefined}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 text-ink"
        />
        {state.field === "message" ? (
          <p id="message-error" className="mt-1 text-sm text-danger">
            {state.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" role="status">
        {state.nonce > 0 && state.message && !state.field ? (
          <p className={state.ok ? "text-sm text-moss" : "text-sm text-danger"}>{state.message}</p>
        ) : null}
      </div>

      <p className="text-sm text-muted">
        {labels.privacy}{" "}
        <a href={labels.privacyHref} className="underline decoration-gold-deep underline-offset-4">
          {labels.privacyLink}
        </a>
        {labels.termsHref && labels.termsLink ? (
          <>
            {" "}
            {labels.termsLead}{" "}
            <a href={labels.termsHref} className="underline decoration-gold-deep underline-offset-4">
              {labels.termsLink}
            </a>
            .
          </>
        ) : null}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft disabled:opacity-70"
      >
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  ...props
}: {
  id: string;
  label: string;
  error: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-ink"
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
