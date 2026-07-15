import type { WorkDetail } from "../data/works";
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-h6 rounded-full px-3 py-1.5"
      style={{ background: "#242423", color: "var(--text-primary)" }}
    >
      {children}
    </span>
  );
}

function YellowBar({ label, arrow, to, href }: { label: string; arrow: string; to?: string; href?: string }) {
  const inner = (
    <span className="text-button flex h-[42px] w-full items-center justify-center gap-1.5" style={{ color: "var(--color-cod-gray)" }}>
      <span aria-hidden>{arrow}</span> {label}
    </span>
  );
  if (to) {
    return (
      <RouteLink to={to} className="block w-full transition-opacity hover:opacity-90" style={{ background: "var(--cta)" }}>
        {inner}
      </RouteLink>
    );
  }
  return (
    <a
      href={href ?? "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={href ? undefined : (e) => e.preventDefault()}
      className="block w-full transition-opacity hover:opacity-90"
      style={{ background: "var(--cta)" }}
    >
      {inner}
    </a>
  );
}

export default function WorkPage({ work }: { work: WorkDetail }) {
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
                <MetaRow label="SERVICES">
                  <div className="flex flex-wrap gap-2">
                    {work.services.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </MetaRow>
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

        {/* Back */}
        <div className="mt-4 lg:pl-[340px]">
          <div className="px-5 lg:px-10">
            <YellowBar label="BACK TO ALL WORKS" arrow="↵" to="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
