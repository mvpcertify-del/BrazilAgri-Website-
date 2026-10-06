import Link from "next/link";

/**
 * BRAZILAGRI.com wordmark.
 *
 * Per the client's brand direction:
 *   - "BRAZIL" bold in DARK green
 *   - "AGRI"   bold in LIGHT green
 *   - ".com"   in black
 *   - a ™ mark and a globe symbol alongside the word
 *
 * On dark backgrounds the dark-green "BRAZIL" and black ".com" lose contrast,
 * so the `tone="light"` variant lifts them to white / light-green while
 * keeping the two-tone green intent on navy headers and the footer.
 */
export function Logo({
  tone = "dark",
  withTagline = true,
  className = "",
  href = "/",
}: {
  tone?: "dark" | "light";
  withTagline?: boolean;
  className?: string;
  href?: string | null;
}) {
  const brazil = tone === "light" ? "text-white" : "text-brazil-green-700";
  const agri = tone === "light" ? "text-brazil-green-300" : "text-brazil-green-500";
  const dotcom = tone === "light" ? "text-white/90" : "text-navy-950";
  const taglineInk = tone === "light" ? "text-white/55" : "text-navy-600/70";

  const mark = (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <GlobeMark tone={tone} className="h-9 w-9 shrink-0" />
      <span className="inline-flex flex-col">
        <span className="font-display text-[1.45rem] leading-none font-extrabold tracking-tight">
          <span className={brazil}>BRAZIL</span>
          <span className={agri}>AGRI</span>
          <span className={dotcom}>.com</span>
          <sup
            className={`ml-0.5 align-super text-[0.5rem] font-bold ${
              tone === "light" ? "text-white/70" : "text-navy-600/70"
            }`}
          >
            ™
          </sup>
        </span>
        {withTagline && (
          <span
            className={`mt-1 text-[8.5px] font-semibold tracking-[0.28em] uppercase ${taglineInk}`}
          >
            Sourcing Arm of ABCO
          </span>
        )}
      </span>
      <span className="sr-only">BrazilAgri — Sourcing Arm of Abughazaleh Trading Company</span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="BrazilAgri — home" className="shrink-0">
      {mark}
    </Link>
  );
}

/** Globe with a Brazilian-green orbit and a gold trade arc. */
function GlobeMark({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const ring = tone === "light" ? "#ffffff" : "#009739";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="none" stroke={ring} strokeWidth="2.4" />
      <ellipse cx="24" cy="24" rx="20" ry="8.5" fill="none" stroke={ring} strokeWidth="1.8" opacity="0.8" />
      <path d="M24 4v40M4 24h40" stroke={ring} strokeWidth="1.6" opacity="0.8" />
      <path
        d="M10 30 C 20 23, 30 23, 40 15"
        fill="none"
        stroke="#FFDF00"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3.4" fill="#FFDF00" />
    </svg>
  );
}
