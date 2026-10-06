/**
 * Stylized global-reach map. Not a survey-accurate projection — a clean,
 * abstract dotted world with simplified landmasses, a highlighted Brazil
 * origin node and gold trade arcs to key destination regions. Scales
 * crisply in both decorative (faint) and feature contexts.
 */
export function WorldMap({
  className = "",
  decorative = false,
  showArcs = false,
}: {
  className?: string;
  decorative?: boolean;
  showArcs?: boolean;
}) {
  // Simplified landmass blobs on a 1000×480 field.
  const land =
    decorative ? "currentColor" : "#1b4e86";
  const landOpacity = decorative ? 1 : 0.55;

  // Origin (Brazil) and destination nodes (approx. positions on the field).
  const origin = { x: 352, y: 330 };
  const dests = [
    { x: 520, y: 150, label: "Europe" },
    { x: 610, y: 215, label: "Middle East" },
    { x: 760, y: 235, label: "Asia" },
    { x: 520, y: 320, label: "Africa" },
  ];

  const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - 70;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <svg viewBox="0 0 1000 480" className={className} aria-hidden="true">
      <g fill={land} opacity={landOpacity}>
        {/* North America */}
        <path d="M120 70 C80 90 70 140 110 170 C150 200 150 150 200 160 C240 168 250 120 220 95 C190 70 160 55 120 70 Z" />
        {/* South America */}
        <path d="M300 250 C280 270 300 320 330 360 C345 410 375 420 385 380 C400 330 390 290 370 265 C350 245 320 235 300 250 Z" />
        {/* Europe */}
        <path d="M480 95 C460 110 470 140 500 145 C540 150 560 120 540 100 C520 85 500 85 480 95 Z" />
        {/* Africa */}
        <path d="M490 175 C470 195 480 250 510 300 C535 345 560 330 560 290 C565 240 560 200 540 180 C525 165 505 162 490 175 Z" />
        {/* Asia */}
        <path d="M580 90 C560 110 590 140 640 150 C720 165 800 160 830 130 C855 105 820 80 760 78 C680 74 620 72 580 90 Z" />
        {/* Australia */}
        <path d="M780 330 C760 345 775 375 815 375 C855 375 870 345 845 330 C820 318 800 320 780 330 Z" />
      </g>

      {showArcs && (
        <>
          {dests.map((d) => (
            <g key={d.label}>
              <path
                d={arc(origin, d)}
                fill="none"
                stroke="#eeb902"
                strokeWidth="1.6"
                strokeOpacity="0.8"
                strokeDasharray="2 5"
                strokeLinecap="round"
              />
              <circle cx={d.x} cy={d.y} r="4" fill="#eeb902" />
            </g>
          ))}
          {/* Brazil origin */}
          <circle cx={origin.x} cy={origin.y} r="9" fill="#009739" opacity="0.3" />
          <circle cx={origin.x} cy={origin.y} r="4.5" fill="#009739" />
        </>
      )}
    </svg>
  );
}
