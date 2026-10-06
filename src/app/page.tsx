import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  site,
  hero,
  ctaImage,
  trustStats,
  homeIntro,
  commodityTiles,
  team,
  inspectionPoints,
  processSteps,
  sourcingRegions,
  destinationMarkets,
} from "@/lib/site";
import {
  SectionHeading,
  Button,
  Portrait,
  ComplianceMark,
} from "@/components/ui";
import { Icon } from "@/components/icons";
import { WorldMap } from "@/components/WorldMap";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

/* ------------------------------------------------------------------ */
/* Small presentational helpers (home page only)                     */
/* ------------------------------------------------------------------ */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* 1) HERO ----------------------------------------------------- */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-900 lg:min-h-screen">
        <Image
          src={hero.image}
          alt="Containerized agricultural cargo at a Brazilian export terminal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Left-weighted scrim keeps copy legible while the ship stays clearly visible on the right */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 from-5% via-navy-900/55 via-45% to-transparent to-85%"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent"
          aria-hidden="true"
        />
        <Container className="relative w-full py-12 sm:py-14 lg:py-16">
          <div className="animate-fade-up max-w-xl md:max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-gold-400 uppercase sm:text-[12px] sm:tracking-[0.2em]">
              <span className="h-px w-6 bg-gold-400/70" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="font-display mt-4 text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-4xl">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-[15px]">
              {hero.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={hero.primaryCta.href} variant="gold" className="w-full justify-center sm:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline-light" className="w-full justify-center sm:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Compact "Watch Our Story" for small screens */}
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-3 text-white/90 transition hover:text-gold-400 lg:hidden"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
                Watch Our Story
              </span>
            </Link>
          </div>
        </Container>

        {/* Watch Our Story — right side, matching the approved mockup */}
        <Link
          href="/about"
          aria-label="Watch our story"
          className="group absolute top-1/2 right-10 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:right-20"
        >
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 text-white backdrop-blur-sm transition duration-300 group-hover:scale-105 group-hover:border-gold-400 group-hover:text-gold-400">
            <span className="absolute -inset-2.5 rounded-full border border-white/15" aria-hidden="true" />
            <span className="absolute -inset-5 rounded-full border border-white/5" aria-hidden="true" />
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">
            Watch Our Story
          </span>
        </Link>
        <div
          className="brazil-ribbon absolute inset-x-0 bottom-0 h-1.5"
          aria-hidden="true"
        />
      </section>

      {/* 2) TRUST STRIP --------------------------------------------- */}
      <section className="bg-navy-800 text-white">
        <Container className="py-10 sm:py-12">
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {trustStats.map((stat, i) => (
              <li
                key={stat.label}
                className={`flex items-center gap-4 px-2 py-5 sm:px-6 lg:py-3 ${
                  i > 0 ? "lg:border-l lg:border-white/10" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/40 text-gold-400">
                  <Icon name={stat.icon} className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-2xl font-extrabold tracking-tight text-gold-400">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-white/70">
                    {stat.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3) WHO WE ARE ---------------------------------------------- */}
      <section className="bg-white">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={homeIntro.eyebrow}
                title={homeIntro.title}
              />
              <p className="mt-6 text-lg leading-relaxed text-navy-600">
                {homeIntro.body}
              </p>
              <div className="mt-8">
                <Button href="/about" variant="outline">
                  About BrazilAgri
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -top-5 -left-5 h-24 w-24 bg-gold-500/90"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl ring-1 ring-navy-100">
                <Image
                  src={commodityTiles[1].image}
                  alt="Brazilian soybean harvest at origin"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="animate-float absolute -bottom-6 -right-2 w-48 rounded-sm bg-navy-800 p-5 text-white shadow-xl sm:-right-6">
                <p className="font-display text-3xl font-extrabold tracking-tight text-gold-400">
                  1975
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/70">
                  Trade legacy of our parent group, {site.parentShort}.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4) OUR COMMODITIES ----------------------------------------- */}
      <section className="bg-navy-50">
        <Container className="py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Our Products" title="Our Commodities" />
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.1em] text-navy-800 uppercase transition hover:text-gold-600"
            >
              View All Products
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {commodityTiles.map((tile) => (
              <li key={tile.name}>
                <Link
                  href={tile.href}
                  className="group relative block h-full overflow-hidden rounded-sm border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span
                    className="absolute inset-x-0 top-0 z-10 h-1 scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    <Image
                      src={tile.image}
                      alt={tile.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-5">
                    <span className="font-display block text-lg font-bold text-navy-800">
                      {tile.name}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-navy-600">
                      {tile.detail}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] text-gold-600 uppercase">
                      View
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5) PEOPLE + INSPECTION ------------------------------------- */}
      <section className="bg-white">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — People */}
            <div>
              <SectionHeading
                eyebrow="Our Team"
                title="The People Behind BrazilAgri"
              />
              <p className="mt-6 max-w-md text-navy-600">
                Local expertise at origin, matched to global reach — the people
                who source, audit and move every shipment.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6">
                {team.map((member) => (
                  <div
                    key={member.slug}
                    className="overflow-hidden rounded-sm border border-navy-100 shadow-sm"
                  >
                    <Portrait member={member} className="aspect-[4/5] w-full" />
                    <div className="bg-navy-800 px-4 py-4">
                      <p className="font-display text-base font-bold text-white">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-[12px] font-semibold text-gold-400">
                        {member.role}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-white/50">
                        {member.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Inspection */}
            <div>
              <SectionHeading
                eyebrow="Quality Assurance"
                title="Independent Inspection. Verified Before Shipment."
              />
              <div className="mt-8 rounded-sm border border-navy-100 bg-white p-7 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy-800">
                      Inspection of Goods
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-600">
                      No container leaves port without independent weight, grade
                      and sanitary verification.
                    </p>
                  </div>
                  <ComplianceMark kind="sgs" />
                </div>

                <div className="my-6 h-px bg-navy-100" aria-hidden="true" />

                <ul className="grid grid-cols-2 gap-5">
                  {inspectionPoints.map((point) => (
                    <li key={point.label} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600">
                        <Icon name={point.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-navy-800">
                        {point.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-navy-100 pt-5 text-[12px] leading-relaxed text-navy-600">
                  Independent inspection and verification available through SGS
                  or Bureau Veritas, subject to transaction requirements.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6) HOW BRAZILAGRI WORKS ------------------------------------ */}
      <section className="bg-navy-50">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Our Process"
            title="How BrazilAgri Works"
            className="mx-auto max-w-2xl"
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-navy-600">
            From verified origin to reliable delivery — a transparent,
            institution-grade workflow behind every transaction.
          </p>

          <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {processSteps.map((step, i) => (
              <li key={step.no} className="relative text-center">
                {i < processSteps.length - 1 && (
                  <span
                    className="absolute top-8 left-1/2 hidden h-px w-full bg-navy-100 lg:block"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex flex-col items-center">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-800 shadow-sm">
                    <Icon name={step.icon} className="h-7 w-7" />
                    <span className="font-display absolute -top-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[11px] font-extrabold text-navy-900">
                      {step.no}
                    </span>
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold text-navy-800">
                    {step.step}
                  </h3>
                  <p className="mt-1.5 max-w-[12rem] text-sm leading-snug text-navy-600">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 7) GLOBAL REACH + QUOTE ------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-800 text-white">
        <div
          className="dot-grid absolute inset-0 text-white/10"
          aria-hidden="true"
        />
        <Container className="relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* (a) copy */}
            <div className="lg:col-span-4">
              <SectionHeading
                tone="light"
                eyebrow="Global Reach"
                title="From Brazil to the World"
              />
              <p className="mt-6 text-white/70">
                Sourced at origin across Brazil&apos;s key agricultural zones,
                shipped reliably to buyers on five continents.
              </p>

              <dl className="mt-8 space-y-4">
                {sourcingRegions.map((region) => (
                  <div
                    key={region.name}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <dt className="font-display font-bold text-white">
                      {region.name}
                    </dt>
                    <dd className="text-sm text-gold-400">{region.note}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {destinationMarkets.map((market) => (
                  <span
                    key={market}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-white/80"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>

            {/* (b) map */}
            <div className="flex items-center justify-center lg:col-span-5">
              <WorldMap showArcs className="w-full text-white/20" />
            </div>

            {/* (c) CTA card */}
            <div className="lg:col-span-3">
              <div className="rounded-sm bg-gold-500 p-7 text-navy-900 shadow-xl">
                <h3 className="font-display text-xl font-extrabold tracking-tight">
                  Request a Commodity Quote
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-900/80">
                  Tell us the commodity, volume and destination — our desk
                  responds with origin availability and terms.
                </p>
                <div className="mt-6">
                  <Button href="/contact" variant="navy">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8) FINAL CTA BAND ------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={ctaImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-navy-950/85"
          aria-hidden="true"
        />
        <div
          className="dot-grid absolute inset-0 text-white/5"
          aria-hidden="true"
        />
        <div
          className="brazil-ribbon absolute inset-x-0 top-0 h-1.5"
          aria-hidden="true"
        />
        <Container className="relative py-20 text-center sm:py-24">
          <h2 className="font-display mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to Source from Brazil?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Partner with the sourcing arm of a 50-year global trading group —
            verified origin, independent inspection, reliable delivery.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact" variant="gold">
              Request a Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
