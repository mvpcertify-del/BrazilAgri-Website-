import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productCategories, complianceBodies } from "@/lib/site";
import { Button, PageHero, SectionHeading, ComplianceMark } from "@/components/ui";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Brazilian agricultural commodities sourced at origin — Halal frozen poultry, frozen beef, soybeans & meal, yellow corn, ICUMSA 45 refined sugar and corn DDGS, delivered via bulk vessel or container.",
};

function CheckRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-brazil-green-100 text-brazil-green-700"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[13.5px] leading-snug text-navy-600">{label}</span>
    </li>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Commodities Sourced at Origin"
        lead="Selected at origin, structured for global markets — poultry & meat, grains & oilseeds, sugar and feed co-products, delivered via bulk vessel or container."
        image="/images/harvest.jpg"
      />

      {/* In-page category nav */}
      <nav
        aria-label="Product categories"
        className="sticky top-0 z-30 border-b border-navy-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ul className="flex flex-wrap items-center gap-2 py-3">
            <li className="mr-1 text-[11px] font-bold tracking-[0.2em] text-navy-600/70 uppercase">
              Jump to
            </li>
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`#${category.slug}`}
                  className="inline-flex rounded-full border border-navy-100 bg-navy-50 px-3.5 py-1.5 text-[12px] font-semibold text-navy-700 transition hover:border-gold-500 hover:bg-gold-100 hover:text-navy-900"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Category sections */}
      {productCategories.map((category, i) => {
        const dark = i % 2 === 1;
        const cols =
          category.products.length >= 3
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2";
        return (
          <section
            key={category.slug}
            id={category.slug}
            className={`scroll-mt-28 py-16 sm:py-20 ${dark ? "bg-navy-50" : "bg-white"}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <SectionHeading
                  eyebrow={`0${i + 1} — Commodity Category`}
                  title={category.name}
                />
                <p className="mt-5 text-base leading-relaxed text-navy-600">
                  {category.intro}
                </p>
              </div>

              <div className={`mt-10 grid grid-cols-1 gap-6 ${cols}`}>
                {category.products.map((product) => (
                  <article
                    key={product.slug}
                    className="group flex flex-col overflow-hidden rounded-sm border border-navy-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="brazil-ribbon absolute inset-x-0 bottom-0 h-1" aria-hidden="true" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl font-bold tracking-tight text-navy-800">
                        {product.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] font-medium italic text-gold-700">
                        {product.tagline}
                      </p>

                      <ul className="mt-5 space-y-2.5 border-t border-navy-100 pt-5">
                        {product.specs.map((spec) => (
                          <CheckRow key={spec} label={spec} />
                        ))}
                      </ul>

                      <div className="mt-6 flex-1" />
                      <Link
                        href="/contact"
                        className="group/cta inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] text-navy-700 uppercase transition hover:text-gold-700"
                      >
                        Request Quote
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover/cta:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/contact" variant={dark ? "navy" : "outline"}>
                  Request a quote for {category.name}
                </Button>
              </div>
            </div>
          </section>
        );
      })}

      {/* Compliance reassurance band */}
      <section className="relative overflow-hidden bg-navy-800 py-16 text-white sm:py-20">
        <div className="dot-grid absolute inset-0 text-white/10" aria-hidden="true" />
        <div className="brazil-ribbon absolute inset-x-0 top-0 h-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-2 text-gold-400">
              <Icon name="shield" className="h-6 w-6" />
              <span className="text-[12px] font-bold tracking-[0.2em] uppercase">
                Independently Verified
              </span>
            </span>
            <p className="max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Every shipment is independently inspected before departure.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 rounded-sm bg-white p-6 sm:grid-cols-4 sm:gap-8 sm:p-8">
            {complianceBodies.map((body) => (
              <div
                key={body.kind}
                className="flex flex-col items-center gap-3 text-center"
              >
                <ComplianceMark kind={body.kind} />
                <span className="text-[11px] font-semibold tracking-[0.12em] text-navy-600/80 uppercase">
                  {body.role}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/quality-logistics"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.08em] text-gold-400 uppercase transition hover:text-gold-300"
            >
              See our Quality &amp; Logistics standards
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start gap-6 rounded-sm border border-navy-100 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div className="max-w-2xl">
              <SectionHeading eyebrow="Start a Conversation" title="Request a Product Quote" />
              <p className="mt-5 text-base leading-relaxed text-navy-600">
                Tell us the commodity, specification and destination port — our desk
                responds with availability, inspection terms and delivered pricing.
              </p>
            </div>
            <div className="flex-none">
              <Button href="/contact" variant="gold">
                Request a Product Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
