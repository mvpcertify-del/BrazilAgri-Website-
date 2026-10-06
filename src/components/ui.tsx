import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Member } from "@/lib/site";

/* --- Section heading --------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`text-[12px] font-bold tracking-[0.2em] uppercase ${
            tone === "light" ? "text-gold-400" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-[2.1rem] ${
          tone === "light" ? "text-white" : "text-navy-800"
        } ${centered ? "rule-gold-center" : "rule-gold"}`}
      >
        {title}
      </h2>
    </div>
  );
}

/* --- Buttons ----------------------------------------------------------- */

export function Button({
  href,
  children,
  variant = "gold",
  className = "",
  withArrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "navy" | "green" | "outline" | "outline-light";
  className?: string;
  withArrow?: boolean;
}) {
  const styles = {
    gold: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-sm",
    navy: "bg-navy-800 text-white hover:bg-navy-700",
    green: "bg-brazil-green-600 text-white hover:bg-brazil-green-700",
    outline: "border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white",
    "outline-light": "border border-white/70 text-white hover:bg-white hover:text-navy-900",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[12px] font-bold tracking-[0.1em] uppercase transition ${styles} ${className}`}
    >
      {children}
      {withArrow && <span aria-hidden="true">→</span>}
    </Link>
  );
}

/* --- Page hero (interior pages) --------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  lead,
  image = "/images/fields2.jpg",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Background photograph; pass "" for a plain navy band. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-800 py-20 text-white sm:py-24">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-900/80 to-navy-900/55"
            aria-hidden="true"
          />
        </>
      )}
      <div className="dot-grid absolute inset-0 text-white/10" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
      <div className="brazil-ribbon absolute inset-x-0 bottom-0 h-1" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-[12px] font-bold tracking-[0.2em] text-gold-400 uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{lead}</p>
        )}
      </div>
    </section>
  );
}

/* --- Stat tile --------------------------------------------------------- */

export function Stat({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <p
        className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          tone === "light" ? "text-gold-400" : "text-navy-800"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-1.5 text-[13px] leading-snug ${
          tone === "light" ? "text-white/70" : "text-navy-600"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

/* --- Portrait with graceful fallback ---------------------------------- */

/**
 * Renders the member's photograph if a file exists at `member.photo` in
 * /public; otherwise a drawn bust with initials. A stranger's stock face is
 * never shown under a real person's name.
 */
export function Portrait({
  member,
  className = "",
  sizes = "(max-width: 768px) 100vw, 360px",
  priority = false,
}: {
  member: Member;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const initials = member.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", member.photo));

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      {hasPhoto ? (
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <>
          <div className="dot-grid absolute inset-0 text-white/10" aria-hidden="true" />
          <div
            className="absolute inset-x-0 -bottom-4 mx-auto h-[78%] w-[62%] rounded-full bg-gold-500/[0.07] blur-2xl"
            aria-hidden="true"
          />
          <SuitedSilhouette className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent pt-10 pb-4">
            <span className="font-display text-lg font-bold text-gold-400/90">
              {initials}
            </span>
            <span className="text-[9px] tracking-[0.2em] text-white/35 uppercase">
              Portrait to follow
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function SuitedSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 250"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ba-bust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b4e86" />
          <stop offset="100%" stopColor="#0b2545" />
        </linearGradient>
      </defs>
      <path
        d="M100 132c-34 0-62 20-70 48-4 14-6 30-6 44h152c0-14-2-30-6-44-8-28-36-48-70-48Z"
        fill="url(#ba-bust)"
      />
      <path d="M100 132 78 186l10 38h24l10-38-22-54Z" fill="#04101f" opacity="0.5" />
      <path d="M100 134l-13 12 13 16 13-16-13-12Z" fill="#ffffff" opacity="0.25" />
      <path d="M100 162l-6 8 6 44 6-44-6-8Z" fill="#009739" opacity="0.6" />
      <circle cx="100" cy="86" r="38" fill="url(#ba-bust)" />
      <path
        d="M100 48a38 38 0 0 1 38 38"
        fill="none"
        stroke="#eeb902"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --- Compliance marks (SGS / Bureau Veritas / SIF / MAPA) ------------- */

/**
 * Typographic compliance marks. These are respectful references, not the
 * official registered logos — drop official artwork into /public and swap
 * these for <Image> when the client supplies licensed files.
 */
export function ComplianceMark({
  kind,
  className = "",
}: {
  kind: string;
  className?: string;
}) {
  if (kind === "sgs") {
    return (
      <span className={`inline-flex flex-col leading-none ${className}`}>
        <span className="font-display text-2xl font-extrabold tracking-tight text-[#e2231a]">
          SGS
        </span>
        <span className="mt-1 text-[8px] font-semibold tracking-[0.18em] text-navy-600/70 uppercase">
          Inspection of Goods
        </span>
      </span>
    );
  }
  if (kind === "bv") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#0b2545" strokeWidth="2" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="#0b2545" strokeWidth="1.3" />
          <path d="M20 3v34M3 20h34" stroke="#0b2545" strokeWidth="1" opacity="0.5" />
        </svg>
        <span className="font-display text-sm font-bold leading-tight text-navy-800">
          Bureau
          <br />
          Veritas
        </span>
      </span>
    );
  }
  if (kind === "sif") {
    return (
      <span className={`inline-flex flex-col items-center leading-none ${className}`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brazil-green-600 font-display text-[11px] font-extrabold text-brazil-green-600">
          SIF
        </span>
        <span className="mt-1 text-[8px] font-semibold tracking-[0.12em] text-navy-600/70 uppercase">
          Registered
        </span>
      </span>
    );
  }
  // mapa
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy-700 font-display text-[9px] font-extrabold text-navy-700">
        MAPA
      </span>
      <span className="mt-1 text-[8px] font-semibold tracking-[0.12em] text-navy-600/70 uppercase">
        Compliance
      </span>
    </span>
  );
}
