import Reveal from "./Reveal";
import { scrollToAnchor } from "../lib/useLenis";
import { useRouter } from "../lib/router";

/* -----------------------------------------------------------------------------
   Footer — holographic gradient band with the large outlined UMA MAHESH
   wordmark (from the design export), then logo + mission, nav links,
   social links, and legal links.
   -------------------------------------------------------------------------- */

const NAV = [
  { label: "ABOUT", sup: "", hash: "#about", route: "/about" },
  { label: "WORKS", sup: "06", hash: "#works" },
  { label: "CASE STUDIES", sup: "", hash: "#blog" },
  { label: "CONTACT", sup: "", hash: "#contact" },
];

const SOCIALS = [
  { label: "MAIL", href: "mailto:umamahesh.chinchula@gmail.com", external: false },
  { label: "GITHUB", href: "https://github.com/umachinchula", external: true },
  { label: "INSTAGRAM", href: "https://www.instagram.com/raw.withuma/", external: true },
];
const LEGAL = ["PRIVACY POLICY", "404"];

function LinkList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="flex min-w-[180px] flex-col">{children}</ul>;
}

const rowStyle = {
  borderBottom: "1px dashed rgba(255,255,255,0.15)",
} as const;

export default function Footer() {
  const { path, navigate } = useRouter();
  const goSection = (hash: string, route?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (route) {
      navigate(route);
      return;
    }
    if (path !== "/") {
      navigate("/");
      setTimeout(() => scrollToAnchor(hash), 80);
    } else {
      scrollToAnchor(hash);
    }
  };
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "#050505" }}>
      {/* Gradient band with outlined wordmark — one continuous piece with the links below */}
      <Reveal>
        <img
          src="/ref/footer-band.jpg"
          alt="UMA MAHESH"
          className="block aspect-[1440/527] w-full object-cover"
        />
      </Reveal>

      {/* Link area — continues the gradient with a text-free strip (no wordmark), so it
          never shows reversed/mirrored text no matter how tall the stacked mobile layout gets */}
      <div className="relative">
        <img
          src="/ref/footer-strip.jpg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.25), rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.97) 82%, #050505)" }}
        />
        <div className="relative mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-10 pb-16 pt-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {/* Logo + mission */}
        <div className="flex max-w-[260px] flex-col gap-3">
          <a href="#home" onClick={goSection("#home")} className="flex items-center">
            <span className="text-h5" style={{ color: "var(--text-primary)" }}>
              UMA MAHESH
            </span>
          </a>
          <p className="text-h6 leading-4" style={{ color: "rgba(254,249,237,0.45)" }}>
            I BELIEVE GREAT DESIGN SHOULD DO MORE THAN LOOK GOOD. IT SHOULD
            COMMUNICATE CLEARLY, BUILD TRUST, AND HELP PRODUCTS GROW WITH
            CONFIDENCE.
          </p>
        </div>

        {/* Nav links */}
        <LinkList>
          {NAV.map((l) => (
            <li key={l.label} style={rowStyle}>
              <a
                href={l.route ?? l.hash}
                onClick={goSection(l.hash, l.route)}
                className="text-button flex items-center py-2.5 transition-opacity hover:opacity-60"
                style={{ color: "var(--text-primary)" }}
              >
                {l.label}
                {l.sup && <sup className="ml-0.5 text-[8px]">{l.sup}</sup>}
              </a>
            </li>
          ))}
        </LinkList>

        {/* Socials */}
        <LinkList>
          {SOCIALS.map((s) => (
            <li key={s.label} style={rowStyle}>
              <a
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="text-button flex items-center gap-2 py-2.5 transition-opacity hover:opacity-60"
                style={{ color: "var(--text-primary)" }}
              >
                <span aria-hidden className="text-[10px] opacity-60">
                  ↗
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </LinkList>

        {/* Legal */}
        <LinkList>
          {LEGAL.map((s) => (
            <li key={s} style={rowStyle}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-button flex items-center py-2.5 transition-opacity hover:opacity-60"
                style={{ color: "var(--text-primary)" }}
              >
                {s}
              </a>
            </li>
          ))}
        </LinkList>
        </div>
      </div>
    </footer>
  );
}
