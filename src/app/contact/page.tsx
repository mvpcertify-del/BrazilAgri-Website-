import type { Metadata } from "next";
import { site, complianceBodies } from "@/lib/site";
import { PageHero, SectionHeading, ComplianceMark } from "@/components/ui";
import { Icon, MailIcon } from "@/components/icons";
import { RfqForm } from "@/components/RfqForm";

export const metadata: Metadata = {
  title: "Contact Us · Request a Quote",
  description:
    "Request a commodity quote from BrazilAgri. Submit your RFQ and Letter of Intent — product, volume, destination and payment terms — and our sourcing desk routes it to the right Brazilian origin plant. Response within 24–48 business hours.",
};

const nextSteps = [
  {
    title: "Submit your RFQ + LOI",
    detail: "Share product, volume, destination port and payment instrument with your Letter of Intent.",
  },
  {
    title: "Our desk reviews specs & plant availability",
    detail: "We match your requirement against verified SIF-registered plants and current origin supply.",
  },
  {
    title: "A trade representative responds in 24–48h",
    detail: "A named contact on our sourcing desk follows up directly with next steps.",
  },
  {
    title: "Pricing, documentation & allocation",
    detail: "Firm pricing, contract documentation and cargo allocation toward loading.",
  },
];

const contactCards = [
  {
    icon: "mail" as const,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Direct line to our sourcing desk",
  },
  {
    icon: "ship" as const,
    label: "Sourcing Desk",
    value: site.originHub,
    hint: "Origin logistics & plant coordination",
  },
  {
    icon: "globe" as const,
    label: "Corporate HQ",
    value: site.corporateHq,
    hint: "Trade routing & financial backing",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request a Commodity Quote"
        lead="Tell us what you need — product, volume, destination and payment terms — and our sourcing desk will route it to the right origin plant. Response within 24–48 business hours."
      />

      <section className="bg-navy-50/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* LEFT — why / how + contact details */}
            <div>
              <SectionHeading
                eyebrow="How It Works"
                title="Formal procurement, handled directly"
              />
              <p className="mt-5 text-base leading-relaxed text-navy-600">
                Every inquiry reaches a trade representative — not a queue. Backed by the
                50-year legacy of {site.parent}, our desk sources directly from verified
                origin plants in Brazil and routes each requirement through strict
                compliance and secure logistics.
              </p>

              {/* What happens next */}
              <div className="mt-10">
                <p className="text-[12px] font-bold tracking-[0.2em] text-gold-600 uppercase">
                  What happens next
                </p>
                <ol className="mt-5 space-y-5">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-sm bg-gold-500 font-display text-sm font-extrabold text-navy-900">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-navy-800">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-navy-600">
                          {s.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contact cards */}
              <div className="mt-10 space-y-3">
                {contactCards.map((c) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-sm bg-navy-800 text-gold-400">
                        {c.icon === "mail" ? (
                          <MailIcon className="h-5 w-5" />
                        ) : (
                          <Icon name={c.icon} className="h-5 w-5" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold tracking-[0.18em] text-navy-600/70 uppercase">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block font-display text-sm font-bold break-words text-navy-800">
                          {c.value}
                        </span>
                        <span className="mt-0.5 block text-xs text-navy-600">{c.hint}</span>
                      </span>
                    </>
                  );
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      className="flex items-start gap-4 rounded-sm border border-navy-100 bg-white p-4 shadow-sm transition hover:border-gold-500 hover:shadow-md"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      key={c.label}
                      className="flex items-start gap-4 rounded-sm border border-navy-100 bg-white p-4 shadow-sm"
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>

              {/* Trust row — inspection partners */}
              <div className="mt-10 border-t border-navy-100 pt-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-navy-600/70 uppercase">
                  Inspection partners
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-5">
                  {complianceBodies.map((b) => (
                    <ComplianceMark key={b.kind} kind={b.kind} className="scale-90 origin-left" />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — RFQ portal */}
            <div className="lg:pt-2">
              <div className="rounded-sm border border-navy-100 bg-white p-6 shadow-md sm:p-8">
                <div className="flex items-center gap-3 border-b border-navy-100 pb-5">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-sm bg-navy-800 text-gold-400">
                    <Icon name="doc" className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-extrabold tracking-tight text-navy-800">
                      RFQ Intake Portal
                    </h2>
                    <p className="text-sm text-navy-600">
                      Secure procurement request — all fields routed to our trade desk.
                    </p>
                  </div>
                </div>
                <div className="pt-6">
                  <RfqForm />
                </div>
              </div>

              {/* Reassurance strip */}
              <div className="mt-6 flex items-start gap-3 rounded-sm border border-brazil-green-100 bg-brazil-green-100/30 p-5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brazil-green-600 text-white">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-navy-600">
                  <span className="font-bold text-navy-800">Confidential by default.</span>{" "}
                  Your specifications and LOI are shared only with our sourcing desk.
                  Submitting triggers an automated acknowledgment to your email while a
                  trade representative prepares a direct response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
