import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  SectionHeading,
  Button,
  PageHero,
  Stat,
  Portrait,
} from "@/components/ui";
import { Icon } from "@/components/icons";
import {
  site,
  hero,
  aboutIntro,
  sourcingFlow,
  trustStats,
  team,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BrazilAgri is the specialized sourcing arm of Abughazaleh Trading Company (ABCO) LLC — bridging verified Brazilian agricultural production at origin with reliable global distribution, strict compliance and 50 years of trade legacy.",
};

/* Container helper — keeps every band on the same rhythm. */
const container = "mx-auto max-w-7xl px-4 sm:px-6";

/* Split the mandate copy into readable paragraphs without duplicating it. */
const mandateParagraphs = aboutIntro.body
  .split(". ")
  .reduce<string[]>((acc, sentence, i) => {
    const text = sentence.endsWith(".") ? sentence : `${sentence}.`;
    const bucket = Math.floor(i / 2);
    acc[bucket] = acc[bucket] ? `${acc[bucket]} ${text}` : text;
    return acc;
  }, []);

/* Map the 4-step sourcing flow to gold indices and icon accents. */
const sourcingIcons = ["leaf", "search", "doc", "ship"] as const;

export default function AboutPage() {
  return (
    <>
      {/* 1 — HERO ------------------------------------------------------ */}
      <PageHero
        eyebrow="About Us"
        title="Bridging Fields to Global Ports"
        lead="Engineered to solve the vulnerabilities of agricultural procurement — we select, audit and partner with Brazil's most reliable producers, backed by a multi-decade global trade legacy."
        image="/images/farm.jpg"
      />

      {/* 2 — MANDATE --------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div className="animate-fade-up">
            <SectionHeading
              eyebrow="Our Mandate"
              title="Engineered for secure agricultural procurement"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-navy-600">
              {mandateParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/contact" variant="outline">
                Start a Conversation
              </Button>
            </div>
          </div>

          {/* Framed image + overlapping quote card */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl ring-1 ring-navy-100 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={hero.image}
                alt="Container terminal handling Brazilian agricultural exports bound for global ports"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden="true" />
              <div className="brazil-ribbon absolute inset-x-0 bottom-0 h-1" aria-hidden="true" />
            </div>

            <div className="relative z-10 -mt-12 ml-4 max-w-xs rounded-sm bg-navy-800 p-6 shadow-2xl sm:ml-8">
              <div className="rule-gold">
                <p className="font-display text-lg leading-snug font-bold text-white">
                  {site.tagline}
                </p>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-white/70">
                The sourcing arm of {site.parent}, operating from {site.originHub}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — TRUST STATS BAND ----------------------------------------- */}
      <section className="relative overflow-hidden bg-navy-800 py-16 text-white sm:py-20">
        <div className="dot-grid absolute inset-0 text-white/5" aria-hidden="true" />
        <div className={`${container} relative`}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/5 text-gold-400 ring-1 ring-white/10">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <Stat value={s.value} label={s.label} tone="light" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — HOW WE SOURCE -------------------------------------------- */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            eyebrow="How We Source"
            title="Four controlled steps from origin to delivery"
            align="center"
            className="mx-auto max-w-2xl"
          />

          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Connecting line — horizontal on desktop, vertical on mobile */}
            <span
              className="absolute top-6 left-6 hidden h-px w-[calc(100%-3rem)] bg-navy-100 md:block"
              aria-hidden="true"
            />
            <span
              className="absolute top-6 bottom-6 left-6 w-px bg-navy-100 md:hidden"
              aria-hidden="true"
            />

            {sourcingFlow.map((item, i) => (
              <li key={item.step} className="relative pl-16 md:pl-0">
                <div className="flex items-center gap-4 md:flex-col md:items-start">
                  <span className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-sm bg-navy-800 text-gold-400 shadow-md md:relative">
                    <Icon name={sourcingIcons[i]} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-3xl font-extrabold tracking-tight text-gold-500 md:mt-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy-800">
                  {item.step}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-600">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — PARENT COMPANY (ABCO) ------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="dot-grid absolute inset-0 text-white/5" aria-hidden="true" />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
        <div className={`${container} relative grid gap-12 lg:grid-cols-12 lg:items-center`}>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our Parent Company"
              title="Backed by 50 years of global trade"
              tone="light"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-white/70">
              <p>{site.description}</p>
              <p>
                Connecting international trade lanes reliably since{" "}
                {site.parentFounded}, {site.parent} provides BrazilAgri with
                financial solidity, institutional compliance frameworks and
                established distribution logistics — the infrastructure that
                lets us circumvent seasonal supply bottlenecks and protect
                every transaction.
              </p>
            </div>
            <div className="brazil-ribbon mt-8 h-1 w-40 rounded-full" aria-hidden="true" />
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-sm bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm">
              <p className="font-display text-sm font-bold tracking-[0.2em] text-gold-400 uppercase">
                {site.parentShort}
              </p>
              <p className="font-display mt-2 text-xl font-extrabold text-white">
                {site.parent}
              </p>
              <dl className="mt-6 space-y-5 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">
                    Established
                  </dt>
                  <dd className="font-display mt-1 text-2xl font-extrabold text-gold-400">
                    {site.parentFounded}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">
                    Corporate HQ
                  </dt>
                  <dd className="mt-1 text-[15px] text-white/80">{site.corporateHq}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">
                    Origin Hub
                  </dt>
                  <dd className="mt-1 text-[15px] text-white/80">{site.originHub}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — PEOPLE --------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            eyebrow="Our People"
            title="The desk behind every shipment"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-2">
            {team.map((member) => (
              <Link
                key={member.slug}
                href="/contact"
                className="group flex items-center gap-5 rounded-sm bg-navy-50 p-5 ring-1 ring-navy-100 transition hover:ring-gold-500"
              >
                <Portrait
                  member={member}
                  sizes="96px"
                  className="h-24 w-20 shrink-0 rounded-sm"
                />
                <div>
                  <h3 className="font-display text-lg font-bold text-navy-800">
                    {member.name}
                  </h3>
                  <p className="text-[13px] font-semibold tracking-wide text-gold-600 uppercase">
                    {member.role}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-navy-600">
                    {member.focus}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold tracking-[0.1em] text-navy-800 uppercase transition group-hover:text-gold-600">
                    Connect <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — CTA BAND ------------------------------------------------- */}
      <section className="relative overflow-hidden bg-navy-800 py-20 text-white sm:py-24">
        <div className="dot-grid absolute inset-0 text-white/5" aria-hidden="true" />
        <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
        <div className={`${container} relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between`}>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Partner with BrazilAgri
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Secure Brazilian-origin agricultural commodities through a sourcing
              desk built for operational transparency, strict compliance and
              reliable global delivery.
            </p>
          </div>
          <div className="shrink-0">
            <Button href="/contact" variant="gold">
              Partner with BrazilAgri
            </Button>
          </div>
        </div>
        <div className="brazil-ribbon absolute inset-x-0 bottom-0 h-1" aria-hidden="true" />
      </section>
    </>
  );
}
