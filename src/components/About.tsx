import { useEffect, useRef, useState } from "react";
import SectionFrame from "./SectionFrame";
import Reveal from "./Reveal";
import ArrowButton from "./ArrowButton";
import { useRouter } from "../lib/router";
import { getLenis } from "../lib/useLenis";

/* -----------------------------------------------------------------------------
   About / Intro strip — pinned scroll section: the section sticks to the
   viewport while scroll progress reveals the statement word by word
   (gray → black); once the last words are revealed the pin releases and
   scrolling continues to the next section.
   -------------------------------------------------------------------------- */

const PARA_1 =
  "I design product experiences for platforms where decisions actually cost something: a B2B fundraising platform where investors evaluate real deals, and a 0→1 creator product built from a single sentence. My approach is research-first: I don't ship a design decision I can't defend with evidence.";
const PARA_2 =
  "Every project starts by finding what's actually broken, not what looks unfinished, but what's quietly costing users time, trust, or money, and ends with a decision I can explain in one sentence.";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/* Word list colored by an externally-driven progress (0..1). */
function WordReveal({
  text,
  progress,
  style,
}: {
  text: string;
  progress: number;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  const visible = Math.round(progress * words.length);
  return (
    <p style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            color: i < visible ? "#151515" : "rgba(21,21,21,0.22)",
            transition: "color 0.25s ease",
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export default function About() {
  const { navigate } = useRouter();
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  // Progress through the tall scroll runway (0 = section just pinned,
  // 1 = pin about to release).
  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const runway = el.offsetHeight - window.innerHeight;
      if (runway <= 0) {
        setProgress(1);
        return;
      }
      setProgress(clamp01(-rect.top / runway));
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

  // Paragraph 1 reveals through the first half of the pin,
  // paragraph 2 through the second half — done slightly before release.
  const p1 = clamp01((progress - 0.04) / 0.44);
  const p2 = clamp01((progress - 0.5) / 0.4);

  const statementStyle: React.CSSProperties = {
    fontSize: "clamp(20px, 2.2vw, 30px)",
    lineHeight: 1.19,
    letterSpacing: "-0.2px",
    fontWeight: 600,
  };

  return (
    <section id="about" ref={wrapRef} className="relative w-full" style={{ height: "280vh" }}>
      {/* Pinned viewport-tall panel */}
      <div
        className="sticky top-0 flex h-screen w-full items-center overflow-hidden"
        style={{ background: "var(--color-orange-white)", color: "var(--color-cod-gray)" }}
      >
        {/* SectionFrame stretches the full panel height so the vertical
            guides connect seamlessly to the sections above and below */}
        <SectionFrame tone="light" className="flex h-full flex-col justify-center gap-10 lg:flex-row lg:items-center lg:gap-0">
          {/* Side label */}
          <div className="w-full shrink-0 px-5 lg:w-[360px]">
            <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
              (ABOUT ME)
            </span>
          </div>

          {/* Content */}
          <div className="flex max-w-[760px] flex-col gap-8 px-5 lg:px-10">
            <Reveal>
              <div className="flex items-center py-1">
                {["/about/photo-1.jpg", "/about/photo-2.jpg", "/about/photo-3.jpg"].map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt="Moments from work and life"
                    className="size-[62px] rounded-lg border-2 object-cover"
                    style={{
                      borderColor: "rgba(255,255,255,0.9)",
                      transform: `rotate(${["-6deg", "5deg", "-5deg"][i]})`,
                      marginLeft: i ? -9 : 0,
                    }}
                  />
                ))}
              </div>
            </Reveal>

            <WordReveal text={PARA_1} progress={p1} style={statementStyle} />
            <WordReveal text={PARA_2} progress={p2} style={statementStyle} />

            <Reveal delay={200}>
              <div className="border-t border-dashed border-black/20 pt-7">
                <ArrowButton
                  label="MORE ABOUT ME"
                  variant="dark"
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                  }}
                />
              </div>
            </Reveal>
          </div>
        </SectionFrame>
      </div>
    </section>
  );
}
