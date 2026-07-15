import Reveal from "./Reveal";
import HeroFrame from "./HeroFrame";

/* -----------------------------------------------------------------------------
   Hero — dark full-viewport opener built on the shared HeroFrame spec:
   nav overlays the top of the column (fixed Header), content anchored to the
   bottom — Trustpilot proof left, eyebrow + display statement + resume CTA
   on one shared left edge, scroll cue bottom-right.
   -------------------------------------------------------------------------- */

function Trustpilot() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5">
        <span className="text-lg leading-none" style={{ color: "#00b67a" }}>
          ★
        </span>
        <span className="text-strong" style={{ color: "var(--color-white)" }}>
          TRUSTPILOT
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="flex size-[15px] items-center justify-center text-[10px] leading-none"
              style={{ background: "#00b67a", color: "#fff" }}
            >
              ★
            </span>
          ))}
        </span>
        <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
          Got some few beautiful reviews
        </span>
      </div>
    </div>
  );
}

function Headline() {
  const muted = { color: "rgba(254,249,237,0.5)" };
  const grey = { color: "#cfccc4" };
  return (
    <h1
      className="uppercase"
      style={{ fontSize: "clamp(22px, 2.3vw, 33px)", lineHeight: 1.4, letterSpacing: "-0.8px", fontWeight: 600 }}
    >
      <span style={muted}>I'M </span>
      <span style={{ color: "var(--color-white)" }}>UMA MAHESWARA RAO</span>
      <span style={muted}> , </span>
      <span style={grey}>PRODUCT DESIGNER</span>
      <br />
      <span style={grey}>I DESIGN WITH CLARITY,</span>
      <br />
      <span style={grey}>BUILT WITH PURPOSE.</span>
    </h1>
  );
}

function ResumeCta() {
  return (
    <a
      href="https://drive.google.com/file/d/1x8nD_EqXnXdS8teW1oQL5l3P3krHgChW/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-[52px] w-full max-w-[500px] items-stretch gap-1.5"
    >
      {/* White arrow box with dark arrow, like the mock */}
      <span
        className="flex w-[52px] shrink-0 items-center justify-center"
        style={{ background: "var(--color-white)" }}
      >
        <img
          src="/hero/arrow.svg"
          alt=""
          className="size-[20px] invert transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />
      </span>
      <span
        className="text-button flex flex-1 items-center justify-center px-6 transition-opacity group-hover:opacity-90"
        style={{ background: "var(--color-white)", color: "var(--color-cod-gray)" }}
      >
        VIEW MY RESUME
      </span>
    </a>
  );
}

function ScrollDown() {
  return (
    <div className="flex items-end gap-1.5">
      <span className="text-h6" style={{ color: "rgba(254,249,237,0.4)" }}>
        SCROLL DOWN
      </span>
      <span className="animate-nudge flex flex-col items-center gap-px pb-0.5">
        <img src="/hero/chevron.svg" alt="" className="h-[5px] w-[9px] invert opacity-40" />
        <img src="/hero/chevron.svg" alt="" className="h-[5px] w-[9px] invert opacity-70" />
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <div id="home">
      <HeroFrame tone="dark" portrait="/hero/portrait-dark.jpg" portraitPosition="68% 15%">
        {/* Content anchored to the bottom of the column (nav overlays the top);
            headline block starts exactly at the 360px column divider */}
        <div className="relative z-20 mt-auto flex flex-col gap-8 pb-7 lg:flex-row lg:items-end lg:gap-0">
          <Reveal className="flex w-full flex-col pr-8 lg:w-[360px] lg:shrink-0">
            <Trustpilot />
          </Reveal>

          <Reveal delay={120} className="flex flex-1 flex-col gap-4">
            <Headline />
            <ResumeCta />
          </Reveal>
        </div>

        {/* Scroll cue pinned bottom-right of the column */}
        <Reveal delay={240} className="absolute bottom-6 right-5 z-20">
          <ScrollDown />
        </Reveal>
      </HeroFrame>
    </div>
  );
}
