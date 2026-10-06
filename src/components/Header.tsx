"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { MarketTicker } from "./MarketTicker";
import { MailIcon } from "./icons";
import { languages, nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50">
      {/* Narrow live market strip — topmost, per brief */}
      <MarketTicker />

      {/* Corporate utility bar */}
      <div className="bg-navy-900 text-white/75">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[12px] sm:px-6">
          <div className="flex items-center gap-4 truncate">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 hover:text-gold-300"
            >
              <MailIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{site.email}</span>
            </a>
            <span className="hidden text-white/20 md:inline">|</span>
            <span className="hidden truncate text-white/55 md:inline">
              A Subsidiary of Abughazaleh Trading Company (ABCO)
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Primary navigation — sticks to top on scroll */}
      <div className="sticky top-0 border-b border-navy-100 bg-white/95 shadow-[0_1px_0_rgba(11,37,69,0.04)] backdrop-blur">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-[12.5px] font-bold tracking-wide whitespace-nowrap uppercase transition-colors ${
                  isActive(item.href)
                    ? "text-navy-800"
                    : "text-navy-800/60 hover:text-navy-800"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-[25px] left-0 h-[3px] w-full bg-gold-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-sm bg-gold-500 px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase shadow-sm transition hover:bg-gold-400 sm:inline-flex sm:items-center sm:gap-2"
            >
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              className="rounded-sm border border-navy-100 p-2.5 text-navy-800 lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-navy-100 bg-white lg:hidden" aria-label="Mobile">
            <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block border-b border-navy-50 py-3.5 text-sm font-bold tracking-wide uppercase ${
                      isActive(item.href) ? "text-gold-600" : "text-navy-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <Link
                  href="/contact"
                  className="block rounded-sm bg-gold-500 px-5 py-3 text-center text-[12px] font-bold tracking-[0.1em] text-navy-900 uppercase"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

/** Globe dropdown. English is live; other locales are flagged "Soon". */
function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = languages.find((l) => l.live) ?? languages[0];

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 rounded-sm border border-white/15 px-2.5 py-1 text-[12px] font-semibold text-white/85 transition hover:border-gold-400 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
        </svg>
        <span>{current.native}</span>
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-sm border border-navy-100 bg-white py-1 text-navy-800 shadow-xl">
          {languages.map((l) =>
            l.live ? (
              <li key={l.code}>
                <Link
                  href={l.href}
                  className="flex items-center justify-between px-3 py-2 text-[13px] font-semibold hover:bg-navy-50"
                >
                  {l.native}
                  <span className="text-[10px] font-bold tracking-wide text-brazil-green-600 uppercase">
                    ●
                  </span>
                </Link>
              </li>
            ) : (
              <li
                key={l.code}
                className="flex cursor-not-allowed items-center justify-between px-3 py-2 text-[13px] text-navy-800/40"
                title="Coming soon"
              >
                {l.native}
                <span className="rounded-full bg-navy-50 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-navy-600/60 uppercase">
                  Soon
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
