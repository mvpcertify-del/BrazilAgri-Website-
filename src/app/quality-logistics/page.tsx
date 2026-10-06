import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  SectionHeading,
  Button,
  PageHero,
  ComplianceMark,
} from "@/components/ui";
import { Icon } from "@/components/icons";
import { WorldMap } from "@/components/WorldMap";
import {
  site,
  compliancePillars,
  inspectionPoints,
  complianceBodies,
  processSteps,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Quality & Logistics",
  description:
    "Inspected at origin, verified before shipment. Zero-tolerance compliance protocols — SIF-registered plants, independent SGS / Bureau Veritas pre-shipment inspection and institutional trade routing backed by Abughazaleh Trading Company (ABCO).",
};

/** Icons for the three compliance pillars, in order. */
const pillarIcons = ["shield", "badge", "handshake"] as const;

export default function QualityLogisticsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Quality, Logistics & Compliance"
        title="Inspected at Origin. Verified Before Shipment."
        lead="Zero-tolerance compliance protocols protect every importer — from SIF-registered plants to independent pre-shipment inspection by SGS or Bureau Veritas."
        image="/images/port.jpg"
      />

      {/* 2 — COMPLIANCE PILLARS -------------------------------------------- */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Compliance Framework"
            title="Transactional security, end to end"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {compliancePillars.map((pillar, i) => (
              <article
                key={pillar.title}
                className="group relative overflow-hidden rounded-sm border border-navy-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 bg-gold-500"
                  aria-hidden="true"
                />
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-sm bg-navy-50 text-navy-800 ring-1 ring-navy-100">
                  <Icon name={pillarIcons[i]} className="h-7 w-7" />
                </span>
                <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-navy-800">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-600">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — SGS INSPECTION FEATURE ---------------------------------------- */}
      <section className="bg-navy-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — headline + SGS mark */}
            <div>
              <p className="text-[12px] font-bold tracking-[0.2em] text-gold-600 uppercase">
                The Inspection Mandate
              </p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy-800 sm:text-[2.1rem]">
                Independent Inspection of Goods
              </h2>
              <div className="mt-6 inline-flex items-center gap-4 rounded-sm border border-navy-100 bg-white px-6 py-4 shadow-sm">
                <ComplianceMark kind="sgs" />
                <span className="h-10 w-px bg-navy-100" aria-hidden="true" />
                <span className="text-[13px] font-semibold leading-snug text-navy-600">
                  Third-party
                  <br />
                  verification
                </span>
              </div>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-navy-600">
                No container leaves port on trust alone. Weight, grade and
                sanitary condition are certified at loading by an independent
                inspector — so importers settle against verified facts, never
                a seller&rsquo;s word. This is the safeguard that neutralises
                quality and quantity disputes before they can arise.
              </p>
            </div>

            {/* Right — 2x2 inspection points */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {inspectionPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-start gap-4 rounded-sm border border-navy-100 bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy-800 text-gold-400">
                    <Icon name={point.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display pt-1 text-base font-bold leading-tight text-navy-800">
                    {point.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 border-t border-navy-100 pt-6 text-[13px] leading-relaxed text-navy-500">
            Independent inspection is carried out by SGS or Bureau Veritas,
            with the specific scope and certification set subject to each
            transaction&rsquo;s requirements.
          </p>
        </div>
      </section>

      {/* 4 — ACCREDITATION ROW --------------------------------------------- */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Recognised Frameworks"
            title="Working within recognised inspection and regulatory frameworks"
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-navy-100 bg-navy-100 sm:grid-cols-4">
            {complianceBodies.map((body) => (
              <div
                key={body.name}
                className="flex flex-col items-center gap-4 bg-white px-6 py-10 text-center"
              >
                <div className="flex h-14 items-center justify-center">
                  <ComplianceMark kind={body.kind} />
                </div>
                <div>
                  <p className="font-display text-sm font-bold tracking-tight text-navy-800">
                    {body.name}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-navy-500">
                    {body.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — FROM ORIGIN TO DESTINATION ------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-800 py-20 text-white sm:py-24">
        <div
          className="dot-grid absolute inset-0 text-white/10"
          aria-hidden="true"
        />
        <WorldMap
          className="pointer-events-none absolute top-1/2 left-1/2 w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 text-white/[0.04]"
          decorative
        />
        <div className="brazil-ribbon absolute inset-x-0 top-0 h-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="From Origin to Destination"
            title="A controlled chain from the field to your port"
            tone="light"
            align="center"
            className="mx-auto max-w-3xl"
          />

          <ol className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4">
            {processSteps.map((step, i) => (
              <li
                key={step.no}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector line to next step (desktop only) */}
                {i < processSteps.length - 1 && (
                  <span
                    className="absolute top-9 left-1/2 hidden h-px w-full bg-white/15 lg:block"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/15 bg-navy-900 text-gold-400">
                  <Icon name={step.icon} className="h-8 w-8" />
                </span>
                <span className="font-display mt-5 text-sm font-bold tracking-[0.2em] text-gold-400">
                  {step.no}
                </span>
                <h3 className="font-display mt-1 text-lg font-bold tracking-tight text-white">
                  {step.step}
                </h3>
                <p className="mt-2 max-w-[14rem] text-[13px] leading-relaxed text-white/60">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 — PARENT COMPANY GUARANTEE -------------------------------------- */}
      <section className="bg-navy-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <figure className="relative mx-auto max-w-4xl overflow-hidden rounded-sm border border-navy-100 bg-white px-8 py-14 text-center shadow-sm sm:px-16">
            <span
              className="absolute inset-y-0 left-0 w-1.5 bg-gold-500"
              aria-hidden="true"
            />
            <span className="font-display text-6xl leading-none text-gold-500/40" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="font-display -mt-6 text-2xl font-bold leading-snug tracking-tight text-navy-800 sm:text-[1.7rem]">
              All international commercial routing is fully backed by the
              infrastructure of {site.parent}, connecting trade lanes reliably
              since {site.parentFounded}.
            </blockquote>
            <figcaption className="mt-8">
              <span className="brazil-ribbon mx-auto block h-0.5 w-16" aria-hidden="true" />
              <p className="mt-5 text-[12px] font-bold tracking-[0.2em] text-gold-600 uppercase">
                Parent Company Guarantee
              </p>
              <p className="mt-2 text-[14px] text-navy-600">
                {site.legalName}
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 7 — CTA BAND ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <Image
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=2200&q=80"
          alt="Container terminal at a Brazilian export port"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy-900/70" aria-hidden="true" />
        <div className="brazil-ribbon absolute inset-x-0 bottom-0 h-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="text-[12px] font-bold tracking-[0.2em] text-gold-400 uppercase">
            Ready When You Are
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Request a Quote with full compliance documentation
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Every offer is accompanied by the inspection, sanitary and trade
            documentation your import desk requires — reviewed before a single
            container is booked.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="gold">
              Request a Quote
            </Button>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-white/80 uppercase transition hover:text-white"
            >
              Explore Our Products
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
