import Reveal from "./Reveal";

/* -----------------------------------------------------------------------------
   SectionHeading — "(NN)" eyebrow + large //HEADING, shared across sections.
   Dark tone uses the dimmed warm white the design uses for big headings.
   -------------------------------------------------------------------------- */

export default function SectionHeading({
  index,
  lines,
  tone = "dark",
}: {
  index: string;
  lines: string[];
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "#d9d6cd" : "var(--color-cod-gray)";
  return (
    <Reveal>
      <div className="flex flex-col gap-3">
        <span className="text-h6" style={{ color: tone === "dark" ? "var(--text-secondary)" : "rgba(21,21,21,0.6)" }}>
          ({index})
        </span>
        <h2
          className="uppercase"
          style={{
            color,
            fontSize: "clamp(36px, 4.5vw, 58px)",
            lineHeight: 1.04,
            letterSpacing: "-2.5px",
            fontWeight: 600,
          }}
        >
          {lines.map((l, i) => (
            <span key={i} className="block">
              {i === 0 ? "//" : ""}
              {l}
            </span>
          ))}
        </h2>
      </div>
    </Reveal>
  );
}
