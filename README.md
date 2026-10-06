# BrazilAgri — brazilagri.com

Corporate website for **BrazilAgri**, the specialized sourcing arm of
Abughazaleh Trading Company (ABCO) LLC — Brazilian agricultural commodities for
global markets.

Built with **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript**,
designed for deployment on **Vercel**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Montserrat + Open Sans, Header/Footer)
│   ├── globals.css             # Brand tokens (navy / gold / Brazil-flag colors) + animations
│   ├── page.tsx                # Home
│   ├── about/page.tsx          # About Us
│   ├── products/page.tsx       # Our Products (anchors: #poultry-meat, #grains-sugar, #feed-co-products)
│   ├── quality-logistics/page.tsx  # Quality, Logistics & Compliance
│   ├── contact/page.tsx        # Contact / RFQ intake portal
│   └── api/
│       ├── market/route.ts     # Commodity price feed for the ticker (indicative + live seam)
│       └── send-rfq/route.ts   # RFQ handler + Resend auto-responder
├── components/                 # Logo, Header, Footer, MarketTicker, RfqForm, WorldMap, ui, icons
└── lib/site.ts                 # Single source of truth for all copy & structured content
```

## Content & branding

- **All copy and product data** live in `src/lib/site.ts` — edit there, not in pages.
- **Logo**: `BRAZIL` (Brazilian-flag blue) · `AGRI` (flag green) · `.com` (black),
  with ™ and a globe mark; adapts to dark/light backgrounds.
- **Team portraits**: drop real photos into `public/team/` (see `public/team/README.md`).
  Until then, elegant drawn placeholders render — never a stranger's face.
- **Compliance marks** (SGS / Bureau Veritas / SIF / MAPA) are respectful
  typographic references; replace with licensed official artwork when supplied.

## Market ticker

The narrow top strip reads `/api/market`, which serves representative commodity
prices with an hourly drift (so it updates on its own, no API key required). To
wire a real paid feed, implement `fetchLive()` in `src/app/api/market/route.ts` —
that is the only change needed.

## RFQ email (Resend)

The contact form posts to `/api/send-rfq`, which emails the sourcing desk (with
the LOI attached) and sends the buyer an automated acknowledgment via
[Resend](https://resend.com).

**Set `RESEND_API_KEY`** in the Vercel project (Settings → Environment Variables).
Until it is set, the form fails gracefully and directs buyers to email
`inquiry@brazilagri.com`. Verify the `brazilagri.com` domain in Resend so the
`from` addresses (`portal@` / `inquiry@`) can send.

## Languages

English is live now. The header language switcher lists Português / العربية /
简体中文 as "Soon"; their routes (`/pt`, `/ar`, `/zh`) can be added later using
the translation matrix in the deployment blueprint.

## Deploy (Vercel)

Vercel auto-detects Next.js. Import the repo, set `RESEND_API_KEY`, and deploy.
`vercel.json` adds the security headers (HSTS, nosniff, frame-deny) and clean URLs.
