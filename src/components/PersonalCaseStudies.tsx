import { useEffect, useRef } from "react";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ArrowButton from "./ArrowButton";
import { getLenis } from "../lib/useLenis";
import useIsMobile from "../lib/useIsMobile";
import { applyStickyStack } from "../lib/stickyStack";

/** Sticky offset per row index — smaller on mobile (shorter fixed pill nav). */
const stickyTopFor = (i: number, mobile: boolean) => (mobile ? 76 + i * 10 : 110 + i * 14);

/* -----------------------------------------------------------------------------
   Personal Case Studies — "(07) //PERSONAL CASE STUDIES.": horizontal rows,
   image left, category + date top-right, title + case-study link bottom-right.
   -------------------------------------------------------------------------- */

type Study = {
  img: string;
  mobileImg: string;
  category: string;
  date: string;
  title: string;
  href?: string;
};

const STUDIES: Study[] = [
  {
    img: "/ref/cs-housing.jpg",
    mobileImg: "/ref/cs-housing-mobile.jpg",
    category: "UX STRATEGY",
    date: "25 JUNE 2024",
    title: "RENTERS THINK IN COMMUTE ZONES. HOUSING THINKS IN POSTCODES.",
    href: "https://medium.com/@umamahesh.chinchula/renters-think-in-commute-zones-housing-thinks-in-postcodes-8c977aee1634?sharedUserId=umamahesh.chinchula",
  },
  {
    img: "/ref/cs-gpay.jpg",
    mobileImg: "/ref/cs-gpay-mobile.jpg",
    category: "FINTECH UX",
    date: "25 APRIL 2026",
    title: "GPAY SMART SETTLE",
    href: "https://medium.com/@umamahesh.chinchula/gpay-smart-settle-f5ef780ce638?sharedUserId=umamahesh.chinchula",
  },
  {
    img: "/ref/cs-ixigo.jpg",
    mobileImg: "/ref/cs-ixigo-mobile.jpg",
    category: "AI PRODUCT DESIGN",
    date: "09 MAY 2025",
    title: "IXIGO AI: FROM INFORMATION TO DECISION",
  },
];

function StudyRow({ study, delay }: { study: Study; delay: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={study.href ?? "#"}
        target={study.href ? "_blank" : undefined}
        rel={study.href ? "noopener noreferrer" : undefined}
        onClick={study.href ? undefined : (e) => e.preventDefault()}
        className="group relative flex h-[70dvh] flex-col overflow-hidden md:h-auto md:flex-row"
        style={{ background: "#1a1a19", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 -4px 14px rgba(0,0,0,0.18)" }}
      >
        {/* Artwork — portrait crop filling the 70dvh card on mobile, landscape
            crop at its fixed ratio on md+ */}
        <div className="relative min-h-0 flex-1 p-3.5 md:w-[46%] md:flex-none">
          <picture className="contents">
            <source media="(max-width: 767px)" srcSet={study.mobileImg} />
            <img
              src={study.img}
              alt={study.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.015] md:aspect-[475/250] md:h-auto"
            />
          </picture>
        </div>

        {/* Copy — hugs its content on mobile so the artwork gets the space */}
        <div className="relative flex shrink-0 flex-col justify-between gap-8 p-5 md:flex-1">
          <div className="flex items-center gap-6">
            <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
              {study.category}
            </span>
            <span className="text-h6" style={{ color: "var(--text-primary)" }}>
              {study.date}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <h3
              className="max-w-[420px] uppercase"
              style={{ color: "#d9d6cd", fontSize: "17px", lineHeight: 1.3, letterSpacing: "-0.2px", fontWeight: 600 }}
            >
              {study.title}
            </h3>
            <span
              className="text-h6 inline-flex w-fit items-center gap-1 border-b pb-0.5 transition-opacity group-hover:opacity-70"
              style={{ color: "var(--text-primary)", borderColor: "var(--border-default)" }}
            >
              <span aria-hidden>↳</span> REAL FULL CASE STUDY
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export default function PersonalCaseStudies() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  // Stack "flow" (mobile and desktop): a pinned row scales toward 80% as the
  // next row slides up to cover it.
  useEffect(() => {
    const onScroll = () => {
      const mobileNow = window.innerWidth < 1024;
      applyStickyStack(rowRefs.current, (i) => stickyTopFor(i, mobileNow));
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
      id="blog"
      className="relative w-full overflow-x-clip"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <SectionFrame tone="dark" className="flex flex-col gap-14 py-24">
        <div className="px-5 lg:pl-[400px]">
          <SectionHeading index="07" lines={["PERSONAL", "CASE STUDIES."]} />
        </div>

        <div className="flex flex-col gap-14 lg:flex-row lg:gap-0">
          {/* Sidebar */}
          <aside className="flex w-full shrink-0 flex-col gap-5 px-5 lg:sticky lg:top-28 lg:w-[360px] lg:self-start">
            <Reveal>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)", letterSpacing: "-0.16px" }}>
                (PERSONAL CASE STUDIES)
              </span>
              <p className="text-body mt-5 max-w-[280px]" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
                Design trends come and go. Strong ideas, smart strategy, and good
                storytelling tend to stick around.
              </p>
              <div className="mt-6">
                <ArrowButton label="SEE MORE" sup="05" variant="yellow" />
              </div>
            </Reveal>
          </aside>

          {/* Rows — sticky overlapping stack on both mobile and desktop */}
          <div className="flex flex-1 flex-col gap-5 px-5 lg:pl-10">
            {STUDIES.map((s, i) => (
              <div
                key={s.img}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="sticky"
                style={{ top: stickyTopFor(i, isMobile) }}
              >
                <StudyRow study={s} delay={i * 70} />
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}
