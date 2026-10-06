"use client";

import { useEffect, useState } from "react";
import { commodities } from "@/lib/site";

type Quote = {
  symbol: string;
  name: string;
  unit: string;
  price: number;
  changePct: number;
};

type MarketPayload = {
  updatedAt: string;
  source: string;
  quotes: Quote[];
};

/** Seed used before the first fetch resolves, so the strip is never empty. */
const seed: Quote[] = commodities.map((c) => ({
  symbol: c.symbol,
  name: c.name,
  unit: c.unit,
  price: c.base,
  changePct: 0,
}));

function fmt(q: Quote) {
  const decimals = q.price >= 100 ? 2 : q.price >= 10 ? 3 : 4;
  return q.price.toFixed(decimals);
}

/**
 * Narrow, auto-refreshing commodity price strip. Reads /api/market, which
 * serves representative prices with an hourly drift and (optionally) a live
 * source. Re-fetches every 10 minutes; degrades to seed values on error.
 */
export function MarketTicker() {
  const [data, setData] = useState<MarketPayload>({
    updatedAt: "",
    source: "Indicative",
    quotes: seed,
  });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/market", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as MarketPayload;
        if (active && json?.quotes?.length) setData(json);
      } catch {
        /* keep last good / seed values */
      }
    };
    load();
    const id = setInterval(load, 10 * 60 * 1000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const updated = data.updatedAt
    ? new Date(data.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  // Rendered twice back-to-back for a seamless -50% marquee loop.
  const row = (keyPrefix: string) =>
    data.quotes.map((q) => {
      const up = q.changePct >= 0;
      return (
        <span
          key={`${keyPrefix}-${q.symbol}`}
          className="inline-flex items-baseline gap-1.5 px-5 whitespace-nowrap"
        >
          <span className="text-[11px] font-bold tracking-wide text-white/90">
            {q.name}
          </span>
          <span className="text-[11px] font-semibold text-white tabular-nums">
            {fmt(q)}
            {q.unit && <span className="text-white/45"> {q.unit}</span>}
          </span>
          <span
            className="text-[11px] font-bold tabular-nums"
            style={{ color: up ? "var(--color-ticker-up)" : "var(--color-ticker-down)" }}
          >
            {up ? "▲" : "▼"} {up ? "+" : ""}
            {q.changePct.toFixed(2)}%
          </span>
          <span className="px-2 text-white/15">|</span>
        </span>
      );
    });

  return (
    <div className="border-b border-white/10 bg-navy-950">
      <div className="mx-auto flex h-8 max-w-[100rem] items-center">
        {/* Fixed label */}
        <div className="hidden shrink-0 items-center gap-2 border-r border-white/10 px-4 sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brazil-green-500 opacity-70 animate-pulse-dot" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brazil-green-500" />
          </span>
          <span className="text-[10px] font-bold tracking-[0.18em] text-gold-400 uppercase">
            Live Market Data
          </span>
        </div>

        {/* Scrolling track */}
        <div className="ticker-track relative flex-1 overflow-hidden">
          <div className="animate-ticker flex w-max" aria-hidden="false">
            {row("a")}
            {row("b")}
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-navy-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-navy-950 to-transparent" />
        </div>

        {/* Source / updated */}
        <div className="hidden shrink-0 items-center gap-1.5 border-l border-white/10 px-4 lg:flex">
          <span className="text-[10px] text-white/35">
            {data.source} · {updated}
          </span>
        </div>
      </div>
    </div>
  );
}
