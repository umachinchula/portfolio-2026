import { useEffect, useRef, useState } from "react";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ArrowButton from "./ArrowButton";
import { RouteLink } from "../lib/router";
import { getLenis } from "../lib/useLenis";

/* -----------------------------------------------------------------------------
   Selected Works — "(03) //SELECTED WORKS OF MINE": filter list in the left
   column, stacked full-width project cards (image + one-line description +
   tag metadata) on the right.
   -------------------------------------------------------------------------- */

type Work = {
  img: string;
  alt: string;
  desc: React.ReactNode;
  tags: string[];
  filter: string;
  slug: string;
};

const FILTERS = ["MATCHING", "STATE INDICATORS", "ONBOARDING", "INKWAVE"];

const WORKS: Work[] = [
  {
    img: "/work/card-matching.jpg",
    alt: "Matching — relevance-driven match layer for Pitch40",
    desc: (
      <>
        Build a relevance-driven match layer that{" "}
        <span className="hl-accent">cut evaluation from 7–15 minutes to under 5</span> and grew{" "}
        <span className="hl-accent">matched deal volume from $4.7M to $8.9M</span>.
      </>
    ),
    tags: ["PITCH40", "SOLO DESIGN", "LIVE B2B PLATFORM", "2025"],
    filter: "MATCHING",
    slug: "matching",
  },
  {
    img: "/work/card-state-indicators.jpg",
    alt: "State Indicators — state-aware feed for Pitch40",
    desc: (
      <>
        Design a state-aware feed that{" "}
        <span className="hl-accent">cut redundant evaluation from 22–30 startups a session to 3–5</span> by
        surfacing status the system already knew.
      </>
    ),
    tags: ["PITCH40", "FEED REDESIGN", "OVERRULED THE CTO'S HIDE-IT CALL", "2025"],
    filter: "STATE INDICATORS",
    slug: "state-indicators",
  },
  {
    img: "/work/card-onboarding.jpg",
    alt: "Onboarding — publish-first flow for Pitch40",
    desc: (
      <>
        Rebuild onboarding from a 15-field wall into a publish-first flow that{" "}
        <span className="hl-accent">lifted completion from 41% to 76%</span> and{" "}
        <span className="hl-accent">first match from 2 days to 20 minutes</span>.
      </>
    ),
    tags: ["PITCH40", "FLOW REDESIGN", "CUT AGAINST 2-SIDED EVIDENCE", "2025"],
    filter: "ONBOARDING",
    slug: "onboarding",
  },
  {
    img: "/work/card-inkwave.jpg",
    alt: "Inkwave — publish-first newsletter platform",
    desc: (
      <>
        Build a full product from one sentence — a publish-first newsletter platform that{" "}
        <span className="hl-accent">retained 24 of 30 creators</span> and got{" "}
        <span className="hl-accent">18 of 30 earning in week 1</span>.
      </>
    ),
    tags: ["INKWAVE", "FLOW REDESIGN", "CUT AGAINST 2-SIDED EVIDENCE", "2025"],
    filter: "INKWAVE",
    slug: "inkwave",
  },
];

function WorkCard({ work, delay }: { work: Work; delay: number }) {
  return (
    <Reveal delay={delay}>
      <RouteLink to={`/work/${work.slug}`} className="group block">
        <article
          className="flex flex-col overflow-hidden rounded-sm"
          style={{ background: "#151515", boxShadow: "0 -4px 14px rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Layered media: image as blown-up gray backdrop, sharp inner image centered */}
          <div className="relative aspect-[1000/446] w-full overflow-hidden">
            <img
              src={work.img}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full scale-125 object-cover blur-[3px] grayscale"
            />
            <div className="absolute inset-0" style={{ background: "rgba(21,21,21,0.82)" }} />
            <img
              src={work.img}
              alt={work.alt}
              className="absolute left-1/2 top-1/2 h-[76%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-col gap-2 px-3 py-3" style={{ background: "#1e1d1a" }}>
            <p className="text-button" style={{ color: "var(--color-white)" }}>
              {work.desc}
            </p>
            <ul className="flex flex-wrap items-center gap-4">
              {work.tags.map((tag) => (
                <li key={tag} className="flex items-center gap-1.5">
                  <span className="size-[4px]" style={{ background: "var(--cta)" }} />
                  <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </RouteLink>
    </Reveal>
  );
}

export default function SelectedWorks() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep the sticky sidebar's active option in sync with the card in view,
  // and drive the stack "flow": a pinned card scales down toward 80% as the
  // next card slides up to cover it.
  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.45;
      let current = 0;
      const wrappers = cardRefs.current;
      const desktop = window.innerWidth >= 1024;
      wrappers.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top <= marker) current = i;
        if (!desktop) {
          el.style.transform = "";
          return;
        }
        const next = wrappers[i + 1];
        if (!next) {
          el.style.transform = "";
          return;
        }
        const stickyTop = 100 + i * 14;
        const cover = Math.min(
          1,
          Math.max(0, (stickyTop + el.offsetHeight - next.getBoundingClientRect().top) / el.offsetHeight)
        );
        el.style.transform = `scale(${1 - 0.2 * cover})`;
        el.style.transformOrigin = "center top";
      });
      setActive(current);
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

  const scrollToCard = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -110 });
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
    }
  };

  return (
    <section
      id="works"
      className="relative w-full overflow-x-clip"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <SectionFrame tone="dark" className="flex flex-col gap-14 py-24">
        {/* Heading, aligned to the content column */}
        <div className="px-5 lg:pl-[400px]">
          <SectionHeading index="03" lines={["SELECTED WORKS", "OF MINE"]} />
        </div>

        <div className="flex flex-col gap-14 lg:flex-row lg:gap-0">
          {/* Filter sidebar */}
          <aside className="w-full shrink-0 px-5 lg:sticky lg:top-28 lg:w-[360px] lg:self-start">
            <Reveal>
              <ul className="flex flex-col">
                {FILTERS.map((f, i) => (
                  <li key={f}>
                    <button
                      onClick={() => scrollToCard(i)}
                      className="flex w-full items-center gap-2.5 border-b border-dashed py-3 text-left transition-opacity hover:opacity-100"
                      style={{
                        borderColor: "var(--border-default)",
                        opacity: active === i ? 1 : 0.55,
                      }}
                    >
                      {active === i && <span className="size-[7px]" style={{ background: "var(--cta)" }} />}
                      <span className="text-button" style={{ color: "var(--text-primary)" }}>
                        {f}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ArrowButton label="SEE MORE" sup="06" variant="yellow" />
              </div>
            </Reveal>
          </aside>

          {/* Cards — sticky overlapping stack on desktop */}
          <div className="flex flex-1 flex-col gap-6 px-5 lg:pl-10">
            {WORKS.map((w, i) => (
              <div
                key={w.img}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="lg:sticky"
                style={{ top: 100 + i * 14 }}
              >
                <WorkCard work={w} delay={i * 60} />
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}
