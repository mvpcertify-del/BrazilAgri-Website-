/**
 * BrazilAgri — single source of truth for site copy and structured content.
 * Every page reads from here, so swapping client-supplied copy, product
 * lists, team members or contact details is a one-file edit.
 */

export const site = {
  name: "BrazilAgri",
  legalName: "BrazilAgri — Sourcing Arm of Abughazaleh Trading Company (ABCO) LLC",
  shortName: "BrazilAgri",
  domain: "brazilagri.com",
  url: "https://brazilagri.com",
  tagline: "Brazilian Origin. Global Reach.",
  parent: "Abughazaleh Trading Company (ABCO) LLC",
  parentShort: "ABCO",
  parentFounded: 1975,
  description:
    "BrazilAgri is the specialized sourcing arm of Abughazaleh Trading Company (ABCO) LLC, bridging verified Brazilian agricultural production at origin with reliable international distribution, strict compliance frameworks and the financial solidity of a 50-year global trading group.",
  email: "inquiry@brazilagri.com",
  originHub: "São Paulo / Santos Port Logistics Hub, Brazil",
  corporateHq: "Abughazaleh Trading Company (ABCO), Dubai, United Arab Emirates",
};

/** Primary navigation. `/markets` anchors to the live market section on home. */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Our Products" },
  { href: "/quality-logistics", label: "Quality & Logistics" },
  { href: "/contact", label: "Contact Us" },
];

/** Language switcher — English live now; other routes scaffolded for later. */
export const languages = [
  { code: "en", label: "English", native: "English", href: "/", live: true },
  { code: "pt", label: "Portuguese", native: "Português", href: "/pt", live: false },
  { code: "ar", label: "Arabic", native: "العربية", href: "/ar", live: false },
  { code: "zh", label: "Chinese", native: "简体中文", href: "/zh", live: false },
];

/* ------------------------------------------------------------------ */
/* HOME                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Sourcing Arm of Abughazaleh Trading Company (ABCO)",
  titleLines: ["Securing Brazil's Agribusiness", "Assets for Global Markets"],
  lead:
    "Driven by the 50-year legacy of Abughazaleh Trading Company (ABCO), BrazilAgri bridges local production at origin with reliable international distribution networks.",
  primaryCta: { label: "Request a Product Quote", href: "/contact" },
  secondaryCta: { label: "Explore Our Products", href: "/products" },
  /** Port + Brazilian fields. Local asset — swap for client photography. */
  image: "/images/hero.jpg",
};

/** Supporting imagery used across interior pages (local assets). */
export const aboutImage = "/images/farm.jpg";
export const logisticsImage = "/images/port.jpg";
export const ctaImage = "/images/fields.jpg";
export const fieldsImage = "/images/fields2.jpg";

/** Trust strip under the hero (blueprint "Counter Stat Targets"). */
export const trustStats = [
  {
    icon: "wreath",
    value: "50+",
    label: "Years of Group Trade Experience",
  },
  {
    icon: "shield",
    value: "100%",
    label: "Vetted SIF / MAPA Approved Plants",
  },
  {
    icon: "badge",
    value: "SGS / BV",
    label: "Independent Inspection Before Shipment",
  },
  {
    icon: "globe",
    value: "Global",
    label: "Export & Logistics Network",
  },
];

export const homeIntro = {
  eyebrow: "Who We Are",
  title: "Brazilian production, institutional-grade trade",
  body:
    "BrazilAgri operates as the specialized sourcing arm of Abughazaleh Trading Company (ABCO) LLC. Sourced directly from origin inside Brazil, we fuse South American production capacity with the financial solidity, strict compliance frameworks and established distribution logistics of our UAE corporate group.",
};

/* ------------------------------------------------------------------ */
/* PRODUCTS                                                           */
/* ------------------------------------------------------------------ */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  specs: string[];
  /** Representative imagery — swap for client photography when supplied. */
  image: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  intro: string;
  products: Product[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "poultry-meat",
    name: "Poultry & Meat Exports",
    intro:
      "Brazil holds a leading position in global animal protein exports. We work alongside strictly audited, SIF-licensed slaughterhouses to supply commercial markets worldwide.",
    products: [
      {
        slug: "halal-frozen-poultry",
        name: "Halal Frozen Poultry",
        tagline: "Processed under strict Islamic slaughter requirements",
        specs: [
          "Whole birds",
          "Chicken paws",
          "Mid-joint wings",
          "Breast fillets",
        ],
        image:
          "/images/poultry.jpg",
      },
      {
        slug: "frozen-beef-cuts",
        name: "Frozen Beef Cuts",
        tagline: "Boneless manufacturing configurations and premium cuts",
        specs: [
          "Boneless manufacturing beef",
          "Premium primal cuts",
          "SIF-registered plants",
          "Container & reefer ready",
        ],
        image:
          "/images/beef.jpg",
      },
    ],
  },
  {
    slug: "grains-sugar",
    name: "Grains & Soft Commodities",
    intro:
      "Sourcing directly from major agricultural zones to deliver industrial quantities via bulk vessels or containerized cargo.",
    products: [
      {
        slug: "soybeans-meal",
        name: "Industrial Soybeans & Meal",
        tagline: "Optimized for global crushing and feed mills",
        specs: [
          "Bulk & containerized",
          "Crushing-grade beans",
          "Soybean meal",
          "Export documentation",
        ],
        image:
          "/images/soybeans.jpg",
      },
      {
        slug: "yellow-corn",
        name: "Yellow Corn / Maize",
        tagline: "Controlled-moisture animal feed grain",
        specs: [
          "Feed-grade maize",
          "Controlled moisture",
          "Bulk vessel loading",
          "Industrial quantities",
        ],
        image:
          "/images/corn.jpg",
      },
      {
        slug: "icumsa-45-sugar",
        name: "ICUMSA 45 Refined Sugar",
        tagline: "Pure white cane sugar for food & beverage manufacturing",
        specs: [
          "ICUMSA 45 refined",
          "Pure white cane sugar",
          "Human-grade",
          "50kg bags / bulk",
        ],
        image:
          "/images/sugar.jpg",
      },
    ],
  },
  {
    slug: "feed-co-products",
    name: "Agri Co-Products & Feed",
    intro:
      "Bringing high-efficiency feed ingredients straight to global livestock, swine and aquaculture producers.",
    products: [
      {
        slug: "corn-ddgs",
        name: "Corn DDGS / DDG",
        tagline: "Distillers Dried Grains with Solubles — 26–28% protein",
        specs: [
          "26–28% protein profile",
          "Livestock & swine feed",
          "Aquaculture programs",
          "Bulk & container",
        ],
        image:
          "/images/grain.jpg",
      },
    ],
  },
];

/** Compact home "Our Commodities" cards (one tile per headline category). */
export const commodityTiles = [
  {
    name: "Poultry & Meat",
    detail: "Halal Frozen Poultry · Frozen Beef Cuts",
    href: "/products#poultry-meat",
    image:
      "/images/poultry.jpg",
  },
  {
    name: "Grains & Oilseeds",
    detail: "Soybeans & Meal · Yellow Corn / Maize",
    href: "/products#grains-sugar",
    image:
      "/images/soybeans.jpg",
  },
  {
    name: "Sugar",
    detail: "ICUMSA 45 Refined Sugar",
    href: "/products#grains-sugar",
    image:
      "/images/sugar.jpg",
  },
  {
    name: "Feed Co-Products",
    detail: "Corn DDGS / DDG · Feed Ingredients",
    href: "/products#feed-co-products",
    image:
      "/images/grain.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* ABOUT / PROCESS                                                    */
/* ------------------------------------------------------------------ */

export const aboutIntro = {
  title: "Bridging Fields to Global Ports",
  body:
    "International commodity buying requires operational transparency, strict contract adherence and secure logistics. BrazilAgri was engineered to solve the vulnerabilities commonly associated with agricultural procurement. We select, audit and partner with the most reliable producers, slaughterhouses and processing plants across Brazil. Supported by our parent company's multi-decade trade legacy, we eliminate the supply-chain bottlenecks that disrupt global markets.",
};

export const sourcingFlow = [
  {
    step: "Origin Sourcing",
    detail: "Direct integration with verified farms, mills and crushing nodes.",
  },
  {
    step: "Quality Inspection",
    detail:
      "Independent pre-shipment container / bulk analytics at dock loading.",
  },
  {
    step: "Verification & Legal",
    detail: "Institutional trade routing protecting transactional capital.",
  },
  {
    step: "Global Freight & Logistics",
    detail:
      "Legacy ABCO freight space to circumvent seasonal supply-crunch bottlenecks.",
  },
];

/** Compact home "How It Works" row (icon labels). */
export const processSteps = [
  { no: "01", icon: "leaf", step: "Source", detail: "Verified Brazilian producers" },
  { no: "02", icon: "search", step: "Inspect", detail: "Independent quality inspection" },
  { no: "03", icon: "doc", step: "Verify", detail: "Documentation & compliance" },
  { no: "04", icon: "ship", step: "Ship", detail: "Global freight & logistics" },
  { no: "05", icon: "globe", step: "Deliver", detail: "Reliable delivery to buyers" },
];

/* ------------------------------------------------------------------ */
/* QUALITY, LOGISTICS & COMPLIANCE                                    */
/* ------------------------------------------------------------------ */

export const compliancePillars = [
  {
    title: "Institutional SIF Verification",
    body:
      "We work exclusively with plants registered under the Brazilian Federal Inspection Service (SIF) and MAPA, ensuring every facility meets sanitary and regulatory standards before a single order is placed.",
  },
  {
    title: "Independent Pre-Shipment Auditing",
    body:
      "No container leaves port without weight, grade and sanitary certifications provided directly by SGS or Bureau Veritas — protecting importers against quality and quantity disputes.",
  },
  {
    title: "Parent Company Guarantee",
    body:
      "All international commercial routing is fully backed by the infrastructure of Abughazaleh Trading Company (ABCO) LLC, connecting trade lanes reliably since 1975.",
  },
];

/** SGS "Inspection of Goods" feature pillars (from approved mockup). */
export const inspectionPoints = [
  { label: "Weight Verification", icon: "scale" },
  { label: "Quality & Grade", icon: "badge" },
  { label: "Sanitary Documentation", icon: "doc" },
  { label: "Pre-Shipment Inspection", icon: "search" },
];

/** Compliance bodies shown as a trust row. Rendered as styled marks. */
export const complianceBodies = [
  { name: "SGS", role: "Independent Inspection", kind: "sgs" },
  { name: "Bureau Veritas", role: "Independent Verification", kind: "bv" },
  { name: "SIF", role: "Registered Plants", kind: "sif" },
  { name: "MAPA", role: "Regulatory Compliance", kind: "mapa" },
];

/* ------------------------------------------------------------------ */
/* SOURCING REGIONS & MARKETS                                         */
/* ------------------------------------------------------------------ */

export const sourcingRegions = [
  { name: "Mato Grosso", note: "Soybeans · Corn" },
  { name: "Goiás", note: "Soybeans · Corn" },
  { name: "São Paulo", note: "Sugar · Coffee" },
  { name: "Santos Port", note: "Global Export Hub" },
];

export const destinationMarkets = ["Europe", "Middle East", "Asia", "Africa", "Americas"];

/* ------------------------------------------------------------------ */
/* TEAM                                                               */
/* ------------------------------------------------------------------ */

export type Member = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  /** Drop a file at this /public path to replace the placeholder bust. */
  photo: string;
  linkedin?: string;
};

/**
 * Two real people lead the client-facing operation. Until photographs are
 * supplied, the Portrait component renders a drawn bust (never a stranger's
 * face). Update `name`, `role` and `bio` below with the final details.
 */
export const team: Member[] = [
  {
    slug: "renato-marques",
    name: "Renato Marques",
    role: "Brazil Operations",
    focus: "Origin sourcing · On-the-ground execution",
    bio: "Renato Marques leads BrazilAgri's operations at origin, managing direct relationships with verified farms, mills and SIF-registered processing plants across Brazil's key agricultural regions.",
    photo: "/team/renato-marques.jpg",
  },
  {
    slug: "midhat-abu-ghazaleh",
    name: "Midhat Abu-Ghazaleh",
    role: "Chief Executive Officer, ABCO",
    focus: "Group strategy · International trade",
    bio: "Midhat Abu-Ghazaleh is Chief Executive Officer of Abughazaleh Trading Company (ABCO) LLC, BrazilAgri's parent group. He backs BrazilAgri's sourcing operation with ABCO's five-decade trade legacy, financial solidity and global distribution infrastructure.",
    photo: "/team/director.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* MARKET TICKER                                                      */
/* ------------------------------------------------------------------ */

/**
 * Baseline commodity reference values for the live ticker. The /api/market
 * route serves these with a small hourly drift so the strip updates on its
 * own; wiring a paid feed later means changing only that route.
 */
export type Commodity = {
  symbol: string;
  name: string;
  unit: string;
  base: number;
  decimals: number;
};

export const commodities: Commodity[] = [
  { symbol: "USD/BRL", name: "USD / BRL", unit: "", base: 5.42, decimals: 4 },
  { symbol: "SUGAR", name: "Sugar", unit: "¢/lb", base: 0.2334, decimals: 4 },
  { symbol: "CORN", name: "Corn", unit: "$/bu", base: 4.4825, decimals: 4 },
  { symbol: "SOYBEANS", name: "Soybeans", unit: "$/bu", base: 11.8725, decimals: 4 },
  { symbol: "WHEAT", name: "Wheat", unit: "$/bu", base: 5.9125, decimals: 4 },
  { symbol: "COFFEE", name: "Coffee", unit: "$/lb", base: 2.165, decimals: 4 },
  { symbol: "BEEF", name: "Live Cattle", unit: "¢/lb", base: 1.895, decimals: 4 },
  { symbol: "CHICKEN", name: "Poultry", unit: "$/lb", base: 0.88, decimals: 4 },
  { symbol: "RICE", name: "Rice", unit: "$/cwt", base: 15.42, decimals: 3 },
];

/* ------------------------------------------------------------------ */
/* CONTACT / RFQ                                                      */
/* ------------------------------------------------------------------ */

export const rfqCategories = [
  "Poultry & Meat",
  "Grains & Sugar",
  "DDGS & Feed Co-Products",
];

export const paymentMethods = [
  "Irrevocable DLC",
  "SBLC",
  "Telegraphic Transfer (TT)",
];
