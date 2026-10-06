"use client";

import { useState } from "react";
import { rfqCategories, paymentMethods } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

const fieldBase =
  "w-full rounded-sm border border-navy-100 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-600/40 transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30";

export function RfqForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/send-rfq", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await res.json().catch(() => ({ success: false }));

      if (res.ok && result.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(
          result.error ||
            "Transmission error. Please contact our desk directly at inquiry@brazilagri.com."
        );
      }
    } catch {
      setStatus("error");
      setError(
        "Network error. Please route your inquiry manually to inquiry@brazilagri.com."
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-sm border border-brazil-green-100 bg-brazil-green-100/40 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brazil-green-600 text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display mt-4 text-xl font-bold text-navy-800">
          Procurement request received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-600">
          Your request has been routed to our sourcing desk. A trade representative
          will respond within 24–48 business hours. A confirmation has been sent to
          your email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[12px] font-bold tracking-[0.1em] text-gold-600 uppercase hover:text-gold-700"
        >
          Submit another request →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company Name" required>
          <input name="companyName" required placeholder="Company Name" className={fieldBase} />
        </Field>
        <Field label="Buyer Email" required>
          <input
            type="email"
            name="buyerEmail"
            required
            placeholder="purchasing@company.com"
            className={fieldBase}
          />
        </Field>
      </div>

      <Field label="Company Website" required>
        <input
          type="url"
          name="websiteUrl"
          required
          placeholder="https://company.com"
          className={fieldBase}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Product Category" required>
          <select name="category" required defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Select a category…
            </option>
            {rfqCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Required Quantity" required>
          <input
            name="quantity"
            required
            placeholder="e.g. 500 MT"
            className={fieldBase}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Destination Port" required>
          <input
            name="destinationPort"
            required
            placeholder="e.g. CIF Shanghai"
            className={fieldBase}
          />
        </Field>
        <Field label="Payment Instrument" required>
          <select name="paymentMethod" required defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Select an instrument…
            </option>
            {paymentMethods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Letter of Intent (LOI)" required hint="PDF or Word · max 10 MB">
        <input
          type="file"
          name="loiFile"
          accept=".pdf,.doc,.docx"
          required
          className="w-full rounded-sm border border-dashed border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-600 file:mr-4 file:rounded-sm file:border-0 file:bg-navy-800 file:px-4 file:py-2 file:text-xs file:font-bold file:tracking-wide file:text-white file:uppercase hover:file:bg-navy-700"
        />
      </Field>

      <Field label="Additional Specifications">
        <textarea
          name="message"
          rows={4}
          placeholder="Grade specifications, target shipment window, incoterms, certificates required…"
          className={`${fieldBase} resize-y`}
        />
      </Field>

      {status === "error" && (
        <p className="rounded-sm border border-ticker-down/30 bg-ticker-down/5 px-4 py-3 text-sm text-ticker-down">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold-500 px-6 py-3.5 text-[12px] font-bold tracking-[0.12em] text-navy-900 uppercase shadow-sm transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" />
            Processing Cargo Data Request…
          </>
        ) : (
          <>
            Submit Formal Procurement Inquiry <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-navy-600/70">
        Submitting this form sends your request to our sourcing desk and triggers an
        automated acknowledgment to your email. Your information is handled under our
        confidentiality notice.
      </p>
    </form>
  );
}

function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-[12px] font-bold tracking-wide text-navy-800 uppercase">
          {label}
          {required && <span className="ml-0.5 text-gold-600">*</span>}
        </span>
        {hint && <span className="text-[11px] text-navy-600/60">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
