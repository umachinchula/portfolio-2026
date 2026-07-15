import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/* -----------------------------------------------------------------------------
   Contact — dark "(05) //CONTACT ME." with two framed blocks: phone (yellow
   glow) and mail (pink glow), each with Figma-style corner handles.
   -------------------------------------------------------------------------- */

const BLOCKS = [
  {
    label: "{PHONE NUMBER}",
    value: "+91 93901 93755",
    href: "tel:+919390193755",
    glow: "rgba(251,225,84,0.85)",
  },
  {
    label: "{MAIL}",
    value: "umamahesh.chinchula@gmail.com",
    href: "mailto:umamahesh.chinchula@gmail.com",
    glow: "rgba(254,195,214,0.85)",
  },
];

function Handle({ className }: { className: string }) {
  return <span className={`absolute z-10 size-1.5 bg-[#8a877f] ${className}`} />;
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <SectionFrame tone="dark" className="flex flex-col gap-14 pb-32 pt-24">
        <div className="px-5 lg:pl-[400px]">
          <SectionHeading index="05" lines={["CONTACT ME."]} />
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">
          <aside className="w-full shrink-0 px-5 lg:w-[360px]">
            <span className="text-sm font-bold" style={{ color: "var(--text-primary)", letterSpacing: "-0.16px" }}>
              (CONTACT INFO)
            </span>
          </aside>

          <div className="flex flex-1 flex-col gap-1.5 px-5 md:flex-row lg:pl-10">
            {BLOCKS.map((b, i) => (
              <Reveal key={b.label} delay={i * 100} className="flex-1">
                <a
                  href={b.href}
                  className="group relative flex h-[240px] flex-col justify-between overflow-hidden p-5"
                  style={{ border: "1px dashed rgba(255,255,255,0.25)", background: "#131312" }}
                >
                  <Handle className="-left-0.5 -top-0.5" />
                  <Handle className="-right-0.5 -top-0.5" />
                  <Handle className="-bottom-0.5 -left-0.5" />
                  <Handle className="-bottom-0.5 -right-0.5" />

                  {/* Glow accent */}
                  <div
                    className="pointer-events-none absolute -bottom-16 -right-10 size-[260px] rounded-full blur-[60px] transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `radial-gradient(closest-side, ${b.glow}, transparent)` }}
                  />

                  <span className="text-button self-end" style={{ color: "var(--color-white)" }}>
                    {b.label}
                  </span>
                  <span
                    className="relative break-all"
                    style={{ color: "#e8e4da", fontSize: "clamp(18px, 1.9vw, 24px)", letterSpacing: "-0.5px", fontWeight: 500 }}
                  >
                    {b.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}
