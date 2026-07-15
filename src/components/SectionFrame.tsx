import type { ReactNode } from "react";

/* -----------------------------------------------------------------------------
   SectionFrame — shared layout container for every page section.
   Draws the same three vertical dashed alignment guides (left edge, 360px
   column split, right edge) as the hero so all sections share one grid.
   -------------------------------------------------------------------------- */

export default function SectionFrame({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const border = tone === "dark" ? "border-white/15" : "border-black/15";
  return (
    <div className={`relative mx-auto w-full max-w-[1360px] px-5 ${className}`}>
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 border-l border-dashed ${border}`} />
      <div className={`pointer-events-none absolute inset-y-0 left-[360px] z-10 hidden border-l border-dashed lg:block ${border}`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 border-l border-dashed ${border}`} />
      {children}
    </div>
  );
}
