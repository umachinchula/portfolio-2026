import { useEffect, useRef } from "react";
import SectionFrame from "./SectionFrame";
import Reveal from "./Reveal";
import ArrowButton from "./ArrowButton";
import { getLenis } from "../lib/useLenis";
import { applyStickyStack } from "../lib/stickyStack";

/* Cards stack vertically below md (768px) and go side-by-side at md+, so the
   sticky-stack "flow" effect only applies below that breakpoint. */
const TESTIMONIAL_STICKY_TOP = (i: number) => 76 + i * 10;

/* -----------------------------------------------------------------------------
   Testimonials — "(05) //TESTIMONIALS FROM PAST CLIENTS." with the oversized
   quote-mark graphic; three cards, each washed by its own color glow
   (yellow / pink / green) with avatar, name, and role at the base.
   -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    id: "{01}",
    quote:
      "Uma doesn't just solve problems—he understands the conflict behind them. He always comes with 2-3 solid alternatives and collaborates seamlessly with devs, understanding our system architecture inside out.",
    name: "Md Irfan Habib",
    role: "FOUNDER & CTO, PLUTONAPSS",
    glow: "rgba(251,225,84,0.95)",
  },
  {
    id: "{02}",
    quote:
      "Uma grasps the depth of a problem fast. Working with tight time constraints, he still delivered—and built us a centralized design system we never had before.",
    name: "Sharam",
    role: "PRODUCT MANAGER, IPROTECHS",
    glow: "rgba(254,195,214,0.95)",
  },
  {
    id: "{03}",
    quote:
      "We've done two projects together and Uma keeps delivering. He understood my vision and shipped a dev-ready ed-tech app in just 2 months. His attention to detail is unmatched.",
    name: "Swathi Rusheetha",
    role: "CEO, KNOWVATION LEARNINGS",
    glow: "rgba(28,192,57,0.9)",
  },
] as const;

function Handle({ className }: { className: string }) {
  return <span className={`absolute size-1.5 bg-[#8a877f] ${className}`} />;
}

function Card({
  t,
  delay,
  stickyTop,
  cardRef,
}: {
  t: (typeof TESTIMONIALS)[number];
  delay: number;
  stickyTop: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={cardRef} className="sticky flex-1 md:static" style={{ top: stickyTop }}>
      <Reveal delay={delay}>
        <article
          className="relative flex h-full min-h-[290px] flex-col justify-between overflow-hidden p-6"
          style={{ background: "#111110", border: "1px solid var(--border-hairline)" }}
        >
          {/* Color wash */}
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-[340px] w-[130%] -translate-x-1/2 rounded-full blur-[70px]"
            style={{ background: `radial-gradient(closest-side, ${t.glow}, transparent)` }}
          />
          {/* Figma-style selection handles */}
          <Handle className="-left-0.5 -top-0.5" />
          <Handle className="-right-0.5 -top-0.5" />
          <Handle className="-bottom-0.5 -left-0.5" />
          <Handle className="-bottom-0.5 -right-0.5" />

          <div className="relative flex flex-col gap-10">
            <span className="text-h5 self-end" style={{ color: "var(--text-primary)" }}>
              {t.id}
            </span>
            <p
              style={{ color: "var(--color-white)", fontSize: "17px", lineHeight: 1.4, letterSpacing: "-0.3px", fontWeight: 500 }}
            >
              {t.quote}
            </p>
          </div>

          <div className="relative mt-10 flex flex-col gap-0.5">
            <span className="text-sm font-bold" style={{ color: "var(--color-white)" }}>
              {t.name}
            </span>
            <span className="text-h6" style={{ color: "var(--color-white)" }}>
              {t.role}
            </span>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

export default function Testimonials({
  blurb = "Every project starts with a conversation and ends with a relationship. Here's what clients have to say about working with me—from first ideas to final launch.",
  ctaLabel = "LETS CONNECT NOW",
}: {
  blurb?: string;
  ctaLabel?: string;
}) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Same sticky-stack "flow" as Works/Case Studies, but only while the cards
  // are stacked vertically (below the md breakpoint where they go side-by-side).
  useEffect(() => {
    const onScroll = () => {
      const wrappers = cardRefs.current;
      if (window.innerWidth >= 768) {
        wrappers.forEach((el) => el && (el.style.transform = ""));
        return;
      }
      applyStickyStack(wrappers, TESTIMONIAL_STICKY_TOP);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const lenis = getLenis();
    lenis?.on("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-x-clip"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <SectionFrame tone="dark" className="flex flex-col gap-14 py-24">
        {/* Heading with giant quote mark */}
        <div className="relative px-5 lg:pl-[400px]">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-5 select-none lg:left-40"
            style={{ color: "#2c2b29", fontSize: "220px", lineHeight: 1, fontWeight: 700, fontFamily: "Georgia, serif" }}
          >
            ”
          </span>
          <div className="relative">
            <SectionHeadingLocal />
          </div>
        </div>

        <div className="flex flex-col gap-14 lg:flex-row lg:gap-0">
          {/* Sidebar */}
          <aside className="flex w-full shrink-0 flex-col justify-end gap-5 px-5 lg:w-[360px]">
            <Reveal>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)", letterSpacing: "-0.16px" }}>
                (TESTIMONIALS)
              </span>
              <p className="text-body mt-5 max-w-[280px]" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
                {blurb}
              </p>
              <div className="mt-6">
                <ArrowButton label={ctaLabel} variant="yellow" />
              </div>
            </Reveal>
          </aside>

          {/* Cards */}
          <div className="flex flex-1 flex-col gap-5 px-5 md:flex-row lg:pl-10">
            {TESTIMONIALS.map((t, i) => (
              <Card
                key={t.id}
                t={t}
                delay={i * 90}
                stickyTop={TESTIMONIAL_STICKY_TOP(i)}
                cardRef={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}

/* Heading kept local so the quote glyph can overlap it. */
function SectionHeadingLocal() {
  return (
    <Reveal>
      <div className="flex flex-col gap-3">
        <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
          (05)
        </span>
        <h2
          className="uppercase"
          style={{ color: "#d9d6cd", fontSize: "clamp(36px, 4.5vw, 58px)", lineHeight: 1.04, letterSpacing: "-2.5px", fontWeight: 600 }}
        >
          <span className="block">//TESTIMONIALS FROM</span>
          <span className="block">PAST CLIENTS.</span>
        </h2>
      </div>
    </Reveal>
  );
}
