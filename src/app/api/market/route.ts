import { NextResponse } from "next/server";
import { commodities } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Commodity price feed for the home-page ticker.
 *
 * Strategy (matches the chosen "free source + graceful fallback" approach):
 *   1. Serve representative values derived from the baselines in site.ts,
 *      with a deterministic drift that advances each hour — so the strip
 *      genuinely updates on its own, hourly, with the day's change %.
 *   2. `fetchLive()` is a single, isolated seam: drop a real/free feed there
 *      and its values override the baseline; any failure silently falls back.
 *
 * No API key is required for the site to work.
 */

// Small deterministic PRNG so a given (symbol, period) always yields the same
// value — prices look stable within the hour and shift at the top of each hour.
function seeded(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 0..1
  return ((h >>> 0) % 100000) / 100000;
}

function indicativeQuotes() {
  const now = new Date();
  const dayKey = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
  const hourKey = `${dayKey}-${now.getUTCHours()}`;

  return commodities.map((c) => {
    // Day's trend: -2.6% .. +2.6%
    const dayPct = (seeded(`${c.symbol}-${dayKey}`) - 0.5) * 5.2;
    // Hourly micro-move within the day, so the number refreshes each hour.
    const hourPct = (seeded(`${c.symbol}-${hourKey}`) - 0.5) * 0.9;
    const changePct = +(dayPct + hourPct).toFixed(2);
    const price = +(c.base * (1 + changePct / 100)).toFixed(Math.max(c.decimals, 2));
    return {
      symbol: c.symbol,
      name: c.name,
      unit: c.unit,
      price,
      changePct,
    };
  });
}

/**
 * Seam for a real feed. Returns null today (no free keyless commodity spot
 * API is reliable enough to hard-depend on). To go live, fetch here and map
 * results to { symbol -> { price, changePct } }, returning the merged quotes.
 */
async function fetchLive() {
  return null;
}

export async function GET() {
  let quotes = indicativeQuotes();
  let source = "Indicative";

  try {
    const live = await fetchLive();
    if (live) {
      quotes = live;
      source = "Live";
    }
  } catch {
    /* fall back to indicative */
  }

  return NextResponse.json(
    {
      updatedAt: new Date().toISOString(),
      source,
      quotes,
    },
    {
      headers: {
        // Allow CDN caching for a few minutes; the client also polls.
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
