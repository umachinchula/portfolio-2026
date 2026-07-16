import { WORK_DETAILS, type WorkDetail } from "../data/works";
import Reveal from "./Reveal";
import { RouteLink } from "../lib/router";

/* -----------------------------------------------------------------------------
   WorkPage — case-study detail page, matching the project page designs:
   (WORK 0N) label left; category chips, title, intro, client/timeline/services,
   full-width yellow LIVE PROJECT button, media band, then label-left /
   copy-right narrative rows, and BACK TO ALL WORKS.
   -------------------------------------------------------------------------- */

/** Render `**…**` emphasis markers in body copy as white highlights. */
function renderEm(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <span key={i} className="hl-white">
        {p}
      </span>
    ) : (
      p
    )
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-t py-4" style={{ borderColor: "var(--border-hairline)" }}>
      <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function YellowBar({ label, arrow, href }: { label: string; arrow: string; href?: string }) {
  return (
    <a
      href={href ?? "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={href ? undefined : (e) => e.preventDefault()}
      className="block w-full transition-opacity hover:opacity-90"
      style={{ background: "var(--cta)" }}
    >
      <span className="text-button flex h-[42px] w-full items-center justify-center gap-1.5" style={{ color: "var(--color-cod-gray)" }}>
        <span aria-hidden>{arrow}</span> {label}
      </span>
    </a>
  );
}

/* Prev/Next CTA — primary keeps the solid accent-yellow style; secondary is
   black with a 1px light stroke. Text hides on mobile (icon-only). */
function NavCta({
  to,
  variant,
  className = "",
  children,
}: {
  to: string;
  variant: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <RouteLink
      to={to}
      className={`text-button flex h-[42px] items-center justify-center gap-1.5 px-6 transition-opacity hover:opacity-90 ${className}`}
      style={
        variant === "primary"
          ? { background: "var(--cta)", color: "var(--color-cod-gray)" }
          : { background: "#0e0e0d", color: "var(--color-white)", border: "1px solid rgba(255,255,255,0.25)" }
      }
    >
      {children}
    </RouteLink>
  );
}

export default function WorkPage({ work }: { work: WorkDetail }) {
  // Prev/next derived from the shared works list order — stays correct as
  // projects are added or reordered.
  const idx = WORK_DETAILS.findIndex((w) => w.slug === work.slug);
  const prev = idx > 0 ? WORK_DETAILS[idx - 1] : null;
  const next = idx >= 0 && idx < WORK_DETAILS.length - 1 ? WORK_DETAILS[idx + 1] : null;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-24 pt-28">
        {/* Dashed guides */}
        <div className="pointer-events-none absolute inset-y-0 left-5 z-10 border-l border-dashed border-white/15" />
        <div className="pointer-events-none absolute inset-y-0 left-[360px] z-10 hidden border-l border-dashed border-white/15 lg:block" />
        <div className="pointer-events-none absolute inset-y-0 right-5 z-10 border-l border-dashed border-white/15" />

        <div className="flex flex-col gap-0 lg:flex-row">
          {/* Side label */}
          <div className="w-full shrink-0 px-5 lg:w-[360px]">
            <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
              ( WORK {work.workNo} )
            </span>
          </div>

          {/* Intro column */}
          <div className="flex max-w-[780px] flex-1 flex-col px-5 lg:px-10">
            <Reveal>
              <div className="flex items-center gap-2">
                {work.categories.map((c, i) => (
                  <span key={c} className="flex items-center gap-2">
                    {i > 0 && <span className="size-1 rounded-full" style={{ background: "var(--cta)" }} />}
                    <span className="text-h6" style={{ color: "var(--text-primary)" }}>
                      {c}
                    </span>
                  </span>
                ))}
              </div>
              <h1
                className="mt-4"
                style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.15, letterSpacing: "-1.2px", fontWeight: 600, color: "var(--color-white)" }}
              >
                {work.title}
              </h1>
              <p className="text-body mt-4 max-w-[620px]" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
                {work.intro}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 flex flex-col">
                <MetaRow label="CLIENT">
                  <span className="text-button" style={{ color: "var(--text-primary)" }}>
                    {work.client}
                  </span>
                </MetaRow>
                <MetaRow label="TIMELINE">
                  <span className="text-button" style={{ color: "var(--text-primary)" }}>
                    {work.timeline}
                  </span>
                </MetaRow>
                {/* Outcome metrics — value (+ arrow, "(from …)" note) over label */}
                <div
                  className="grid grid-cols-2 gap-x-6 gap-y-5 border-t py-5 sm:grid-cols-3"
                  style={{ borderColor: "var(--border-hairline)" }}
                >
                  {work.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1.5">
                      <span
                        style={{ color: "var(--color-white)", fontSize: "17px", fontWeight: 600, letterSpacing: "-0.3px" }}
                      >
                        {m.dir === "down" ? "↓ " : m.dir === "up" ? "↑ " : ""}
                        {m.value}
                        {m.from && (
                          <span className="ml-1.5 text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                            (from {m.from})
                          </span>
                        )}
                      </span>
                      <span className="text-h6" style={{ color: "var(--text-secondary)", textTransform: "none" }}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <YellowBar label="LIVE PROJECT" arrow="↳" href={work.liveUrl} />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Media band */}
        <Reveal delay={150}>
          <div className="mt-10 px-5 lg:px-0">
            <img src={work.media} alt={work.title} className="w-full" />
          </div>
        </Reveal>

        {/* Narrative rows — strict two-column grid so labels never collide with body */}
        <div className="mt-6 flex flex-col">
          {work.sections.map((s) => (
            <Reveal key={s.label}>
              <div
                className="grid grid-cols-1 items-start gap-4 border-t border-dashed py-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-0"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <div className="min-w-0 px-5">
                  <p className="text-sm font-bold max-w-[280px]" style={{ letterSpacing: "-0.16px", lineHeight: "18px" }}>
                    {s.label}
                  </p>
                </div>
                <div className="flex min-w-0 max-w-[640px] flex-col gap-4 px-5 lg:px-10">
                  {s.paras.map((p, i) => (
                    <span key={i} className="contents">
                      <p className="text-body" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
                        {renderEm(p)}
                      </p>
                      {s.bullets && s.bulletsAfter === i && (
                        <ul className="flex list-disc flex-col gap-2 pl-5">
                          {s.bullets.map((b) => (
                            <li key={b} className="text-body" style={{ color: "var(--text-secondary)", lineHeight: "20px" }}>
                              {renderEm(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Prev/Next project navigation */}
        <div className="mt-4 lg:pl-[340px]">
          <div className="flex gap-3 px-5 lg:px-10">
            {prev && (
              <NavCta to={`/work/${prev.slug}`} variant="secondary" className="shrink-0">
                <span aria-hidden>←</span>
                <span className="hidden sm:inline">PREVIOUS PROJECT</span>
              </NavCta>
            )}
            {next ? (
              <NavCta to={`/work/${next.slug}`} variant="primary" className="flex-1">
                <span className="hidden sm:inline">NEXT PROJECT</span>
                <span aria-hidden>→</span>
              </NavCta>
            ) : (
              <NavCta to="/" variant="primary" className="flex-1">
                <span aria-hidden>←</span>
                <span className="hidden sm:inline">BACK TO ALL WORKS</span>
              </NavCta>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
