interface HorizonArcProps {
  className?: string;
  tone?: "sage" | "lavender" | "clay";
  flip?: boolean;
}

const tones: Record<string, string> = {
  sage: "#6F7D55",
  lavender: "#9A85B8",
  clay: "#C79B6B",
};

/**
 * The recurring "gentle horizon" motif used throughout the site —
 * a soft rising arc that stands in for first steps, new days, and
 * gradual forward movement. Used as a section divider, hero backdrop,
 * and process-timeline base.
 */
export default function HorizonArc({
  className = "",
  tone = "sage",
  flip = false,
}: HorizonArcProps) {
  const color = tones[tone];
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className={`horizon-divider ${className}`}
      aria-hidden="true"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0,160 C 250,40 550,40 700,90 C 900,155 1000,60 1200,90 L1200,200 L0,200 Z"
        fill={color}
        opacity="0.12"
      />
      <path
        d="M0,180 C 300,90 500,150 720,120 C 950,90 1020,140 1200,110 L1200,200 L0,200 Z"
        fill={color}
        opacity="0.18"
      />
    </svg>
  );
}
