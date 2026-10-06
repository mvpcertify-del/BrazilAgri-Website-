import Link from "next/link";
import { Logo } from "./Logo";
import { WorldMap } from "./WorldMap";
import { LinkedInIcon, XIcon, MailIcon } from "./icons";
import { languages, productCategories, site } from "@/lib/site";

const company = [
  { href: "/about", label: "About Company" },
  { href: "/quality-logistics", label: "Quality & Logistics" },
  { href: "/products", label: "Our Products" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <WorldMap
        decorative
        className="pointer-events-none absolute top-1/2 right-0 hidden w-[50%] -translate-y-1/2 text-white/[0.05] lg:block"
      />
      <div className="brazil-ribbon h-1 w-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: LinkedInIcon, label: "LinkedIn" },
                { Icon: XIcon, label: "X" },
                { Icon: MailIcon, label: "Email" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href={label === "Email" ? `mailto:${site.email}` : "#"}
                  aria-label={`BrazilAgri on ${label}`}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[12px] font-bold tracking-[0.16em] text-gold-400 uppercase">
              Products
            </h3>
            <ul className="mt-5 space-y-2.5">
              {productCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products#${c.slug}`}
                    className="text-sm text-white/60 transition hover:text-gold-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-bold tracking-[0.16em] text-gold-400 uppercase">
              Company
            </h3>
            <ul className="mt-5 space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-[12px] font-bold tracking-[0.16em] text-gold-400 uppercase">
              Languages
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-white/55">
              {languages.map((l, i) => (
                <li key={l.code} className="flex items-center gap-3">
                  <span className={l.live ? "text-white/85" : "text-white/40"}>
                    {l.native}
                  </span>
                  {i < languages.length - 1 && <span className="text-white/15">·</span>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-bold tracking-[0.16em] text-gold-400 uppercase">
              Corporate
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold-300">
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed">{site.originHub}</li>
              <li className="leading-relaxed">{site.corporateHq}</li>
            </ul>
            <div className="mt-6 border-l-2 border-gold-500/60 pl-4">
              <p className="text-[11px] leading-relaxed text-white/50">
                A sourcing arm of Abughazaleh Trading Company (ABCO) LLC —
                connecting international trade lanes reliably since{" "}
                {site.parentFounded}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} BrazilAgri. All rights reserved.
            Confidentiality Notice Applies.
          </p>
          <p>{site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
