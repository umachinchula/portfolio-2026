import SectionFrame from "./SectionFrame";
import HeroFrame from "./HeroFrame";
import Reveal from "./Reveal";
import ArrowButton from "./ArrowButton";
import Testimonials from "./Testimonials";

/* -----------------------------------------------------------------------------
   About page — from the "About me" design: light story hero, dark about-me
   statement, creative experience rows, "How I Design & Ship" grid, and the
   shared testimonials section.
   -------------------------------------------------------------------------- */

const EXPERIENCE = [
  { logo: "/about/exp-1.jpg", name: "PLUTONAPPS - UI/UX DESIGNER", dates: "OCT 2024 - PRESENT" },
  { logo: "/about/exp-2.jpg", name: "IPROTECHS - UI/UX CONSULTANT", dates: "JUN 2024 - JUL 2024" },
  { logo: "/about/exp-3.jpg", name: "KNOWVATION LEARNINGS - PRODUCT DESIGNER", dates: "JAN 2024 - JUN 2024" },
];

const PRINCIPLES = [
  {
    icon: "/about/icon-1.jpg",
    title: "Design in Code, Not Just Figma",
    blurb: "Prototypes ship as real, working interfaces — not static mockups waiting on a developer.",
  },
  {
    icon: "/about/icon-2.jpg",
    title: "AI as a Creative Partner",
    blurb: "I use Claude Code and modern AI tooling to move from idea to live product in hours, not weeks.",
  },
  {
    icon: "/about/icon-3.jpg",
    title: "Taste Is Still the Job",
    blurb: "AI can generate a hundred options. Knowing which one is actually right is what I bring to the table.",
  },
  {
    icon: "/about/icon-4.jpg",
    title: "Full-Stack Thinking",
    blurb: "I care about how it behaves and performs, not just how it looks on a canvas.",
  },
  {
    icon: "/about/icon-5.jpg",
    title: "Research Before Speed",
    blurb: "Fast iteration means nothing without understanding real user behavior first.",
  },
  {
    icon: "/about/icon-6.jpg",
    title: "Systems, Not Screens",
    blurb: "Every interaction is part of a larger system — I design for how the pieces connect, not just one frame at a time.",
  },
];

function StoryHero() {
  return (
    <HeroFrame tone="light" portrait="/hero/portrait-light.jpg" portraitPosition="68% 15%">
      {/* Content sits center-to-lower-third of the frame */}
      <div className="relative z-10 my-auto flex flex-col gap-6 lg:flex-row lg:gap-0" style={{ color: "var(--color-cod-gray)" }}>
        {/* Side label in the left column */}
        <div className="w-full shrink-0 px-5 lg:w-[360px]">
          <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
            (ABOUT ME)
          </span>
        </div>

        {/* Heading + paragraph, one shared left edge */}
        <Reveal className="flex-1 lg:pl-10">
          <h1
            className="uppercase"
            style={{ fontSize: "clamp(40px, 5.2vw, 72px)", lineHeight: 1.0, letterSpacing: "-3px", fontWeight: 700 }}
          >
            //STORY OF UMA MAHESH
          </h1>
          <p className="text-body mt-6 max-w-[52ch]" style={{ color: "rgba(21,21,21,0.85)", lineHeight: "21px", fontSize: "15px" }}>
            Good design isn't the polish at the end — it's the decisions
            underneath. I got here from mechanical engineering, not design
            school, which means I default to asking what's actually broken
            before I open Figma. Every screen on this site is the result of a
            decision I can explain, not just an outcome I can show.
          </p>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <span className="text-h6 absolute bottom-6 right-5 z-10" style={{ color: "rgba(21,21,21,0.55)" }}>
        SCROLL DOWN ⌄
      </span>
    </HeroFrame>
  );
}

function AboutMe() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <SectionFrame tone="dark" className="flex flex-col gap-8 py-24 lg:flex-row lg:gap-0">
        <div className="w-full shrink-0 px-5 lg:w-[360px]">
          <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
            (ABOUT ME)
          </span>
        </div>
        <Reveal className="max-w-[640px] flex-1 px-5 lg:px-10">
          <h2
            className="uppercase"
            style={{ color: "#d9d6cd", fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.25, letterSpacing: "-0.6px", fontWeight: 600 }}
          >
            I DESIGN FOR PLATFORMS WHERE THE DECISION MATTERS MORE THAN THE
            PIXEL.
          </h2>
          <p className="text-body mt-5 max-w-[520px]" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
            I've spent the last two years on a live B2B fundraising platform
            and a 0→1 creator product — one optimizing decisions that already
            had users and money on the line, the other defining a product from
            a single sentence with no spec at all. Both taught me the same
            lesson: the design that survives contact with real users is the one
            built on evidence, not instinct. I design in Figma, then ship it
            myself in code — so nothing I hand off is a guess about how it'll
            actually feel.
          </p>
        </Reveal>
      </SectionFrame>
    </section>
  );
}

function Experience() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <SectionFrame tone="dark" className="flex flex-col gap-12 pb-24">
        <div className="px-5 lg:pl-[400px]">
          <Reveal>
            <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
              {"{08}"}
            </span>
            <h2
              className="mt-3 uppercase"
              style={{ color: "#d9d6cd", fontSize: "clamp(36px, 4.5vw, 58px)", lineHeight: 1.04, letterSpacing: "-2.5px", fontWeight: 600 }}
            >
              <span className="block">// MY CREATIVE</span>
              <span className="block">EXPERIENCE</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
          <div className="w-full shrink-0 px-5 lg:w-[360px]">
            <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
              (EXPERIENCE)
            </span>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:px-10">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.name} delay={i * 70}>
                <article
                  className="flex h-full items-center gap-4 border-r-[3px] p-3"
                  style={{ background: "#1a1a19", borderColor: "var(--color-white)" }}
                >
                  <img src={e.logo} alt="" className="size-14 shrink-0 object-cover" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-button" style={{ color: "var(--text-primary)" }}>
                      {e.name}
                    </span>
                    <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
                      {e.dates}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}

function HowIWork() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <SectionFrame tone="dark" className="flex flex-col gap-12 pb-28">
        <div className="px-5 lg:pl-[400px]">
          <Reveal>
            <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
              {"{07}"}
            </span>
            <h2
              className="mt-3 uppercase"
              style={{ color: "#d9d6cd", fontSize: "clamp(36px, 4.5vw, 58px)", lineHeight: 1.04, letterSpacing: "-2.5px", fontWeight: 600 }}
            >
              //HOW I DESIGN &amp; SHIP
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
          {/* Sidebar */}
          <aside className="flex w-full shrink-0 flex-col gap-5 px-5 lg:w-[360px] lg:self-end">
            <Reveal>
              <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
                (HOW I WORK)
              </span>
              <p className="text-body mt-5 max-w-[260px]" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
                AI changed how fast ideas become real. What hasn't changed is
                knowing which idea is worth building.
              </p>
              <div className="mt-6">
                <ArrowButton label="LET'S WORK TOGETHER" variant="yellow" />
              </div>
            </Reveal>
          </aside>

          {/* Grid */}
          <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-12 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="flex flex-col gap-4">
                  <img src={p.icon} alt="" className="size-11" />
                  <h3 className="text-h5" style={{ color: "var(--color-white)" }}>
                    {p.title}
                  </h3>
                  <p className="text-h6 max-w-[240px] normal-case" style={{ color: "var(--text-secondary)", lineHeight: "14px", textTransform: "none", fontSize: "11px" }}>
                    {p.blurb}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <StoryHero />
      <AboutMe />
      <Experience />
      <HowIWork />
      <Testimonials
        blurb="Design trends come and go. Strong ideas, smart strategy, and good storytelling tend to stick around."
        ctaLabel="WORK WITH ME"
      />
    </>
  );
}
