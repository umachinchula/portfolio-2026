import type { ReactNode } from "react";

/* -----------------------------------------------------------------------------
   HeroFrame — the shared hero container spec used by BOTH the Home and About
   heroes so their frames, guides, and column can never drift apart.

   Three nested layers:
   1. Outer frame:   100vw × 100vh, 40px padding on all sides (#000 / #fff).
   2. Bordered box:  fills the padded area, 1px border, 6px corner marks
                     positioned on ITS corners. The hero portrait fills this
                     box edge-to-edge behind the content.
   3. Content column: max-w-[1360px], mx-auto, px-5 — identical geometry to
      SectionFrame, so its edges and the dashed guides (left edge, 360px
      split, right edge — positioned relative to the COLUMN, never the
      viewport) land on the same X as every other section.
   -------------------------------------------------------------------------- */

export default function HeroFrame({
  tone,
  portrait,
  portraitPosition = "70% 18%",
  children,
}: {
  tone: "dark" | "light";
  portrait: string;
  portraitPosition?: string;
  children: ReactNode;
}) {
  const borderColor = tone === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const markColor = tone === "dark" ? "#d9d6cd" : "#151515";
  const guide = tone === "dark" ? "border-white/15" : "border-black/15";

  // Marks sit 3px outside the border, which itself sits `padding` in from the
  // edge — 16px padding on mobile (p-4), 40px on desktop (lg:p-10).
  const mark = (edges: string, key: string) => (
    <span key={key} className={`absolute z-20 size-[6px] ${edges}`} style={{ background: markColor }} />
  );

  return (
    <section
      className="h-dvh relative w-full p-4 lg:p-10"
      style={{ background: tone === "dark" ? "#000" : "#fff" }}
    >
      {/* Bordered inner container */}
      <div
        className="relative size-full overflow-hidden"
        style={{ border: `1px solid ${borderColor}`, background: tone === "dark" ? "#151515" : "#fff" }}
      >
        {/* Portrait fills the bordered box */}
        <img
          src={portrait}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none select-none object-cover"
          style={{ objectPosition: portraitPosition }}
        />

        {/* Content column — same geometry as SectionFrame */}
        <div className="relative mx-auto flex h-full max-w-[1360px] flex-col px-5">
          {/* Single column-divider guide (no side guides in the hero frame) */}
          <div className={`pointer-events-none absolute inset-y-0 left-[360px] z-10 hidden border-l border-dashed lg:block ${guide}`} />
          {children}
        </div>
      </div>

      {/* Corner marks on the bordered container */}
      {mark("top-[13px] left-[13px] lg:top-[37px] lg:left-[37px]", "tl")}
      {mark("top-[13px] right-[13px] lg:top-[37px] lg:right-[37px]", "tr")}
      {mark("bottom-[13px] left-[13px] lg:bottom-[37px] lg:left-[37px]", "bl")}
      {mark("bottom-[13px] right-[13px] lg:bottom-[37px] lg:right-[37px]", "br")}
    </section>
  );
}
