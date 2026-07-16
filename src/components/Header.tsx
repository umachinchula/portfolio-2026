import { useEffect, useState } from "react";
import { getLenis, scrollToAnchor } from "../lib/useLenis";
import { useRouter } from "../lib/router";

/* -----------------------------------------------------------------------------
   Header — logo left, "// NAVIGATION" + links center, meta right.
   Fixed to the top; transparent over the hero, gains a dark backdrop + hairline
   once the page is scrolled.
   -------------------------------------------------------------------------- */

const NAV_LINKS: { label: string; hash?: string; route?: string; sup?: string }[] = [
  { label: "HOME", hash: "#home" },
  { label: "ABOUT", route: "/about" },
  { label: "WORKS", hash: "#works", sup: "06" },
  { label: "CASE STUDIES", hash: "#blog" },
  { label: "CONTACT", hash: "#contact" },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export default function Header() {
  const time = useClock();
  const { path, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1023px)").matches
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // On mobile the compact pill IS the navbar, always.
  const showPill = scrolled || isMobile;

  // Close the pill menu whenever the pill hides.
  useEffect(() => {
    if (!showPill) setMenuOpen(false);
  }, [showPill]);

  // Lock page scroll while the fullscreen menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(hash);
    setMenuOpen(false);
    if (path !== "/") {
      navigate("/");
      // let the home sections mount before scrolling to the anchor
      setTimeout(() => scrollToAnchor(hash), 150);
    } else {
      scrollToAnchor(hash);
    }
  };

  // Over the About page's white hero (before scrolling), flip to dark text.
  const onLightHero = path === "/about" && !scrolled;
  const tone = onLightHero
    ? ({ "--text-primary": "#151515", "--text-secondary": "rgba(21,21,21,0.6)" } as React.CSSProperties)
    : undefined;

  // On the framed heroes (Home/About), the nav sits INSIDE the bordered
  // container — offset by the 40px outer frame until the page is scrolled.
  const framed = (path === "/" || path === "/about") && !scrolled;

  return (
    <>
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        showPill ? "pointer-events-none -translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ top: framed ? 41 : 0, ...tone }}
    >
      <div className="relative mx-auto flex max-w-[1360px] items-start justify-between gap-8 px-5 py-4">
        {/* Logo */}
        <a href="#home" onClick={go("#home")} className="flex shrink-0 items-center">
          <span className="text-h4" style={{ color: "var(--text-primary)" }}>
            UMA MAHESH
          </span>
        </a>

        {/* Nav — aligned to the headline's left edge (360px column + 20px gutter) */}
        <nav className="absolute left-[380px] top-4 hidden flex-col gap-2 lg:flex">
          <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
            // NAVIGATION
          </span>
          <ul className="flex items-center gap-3">
            {NAV_LINKS.map((link, i) => {
              const isActive = link.route ? path === link.route : path === "/" && active === link.hash;
              return (
                <li key={link.label} className="flex items-center gap-3">
                  <a
                    href={link.route ?? link.hash}
                    onClick={
                      link.route
                        ? (e) => {
                            e.preventDefault();
                            navigate(link.route!);
                          }
                        : go(link.hash!)
                    }
                    className={`text-button transition-opacity hover:opacity-100 ${
                      isActive ? "underline underline-offset-4" : "opacity-60"
                    }`}
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.label}
                    {link.sup && <sup className="ml-0.5 align-super text-[8px]">{link.sup}</sup>}
                  </a>
                  {i < NAV_LINKS.length - 1 && (
                    <span className="inline-block h-3.5 w-px rotate-[20deg] opacity-40" style={{ background: "var(--text-primary)" }} />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right meta */}
        <div className="hidden shrink-0 items-start gap-12 md:flex">
          <div className="flex flex-col gap-2">
            <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
              // IN INDUSTRY
            </span>
            <span className="text-link" style={{ color: "var(--text-primary)" }}>
              ESTED— JAN 2024
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-h6" style={{ color: "var(--text-secondary)" }}>
              //HYDERABD, INDIA
            </span>
            <span
              className="tabular-nums text-sm"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.5px" }}
            >
              {time}
            </span>
          </div>
        </div>
      </div>
    </header>

    {/* Compact pill nav — always on mobile, on scroll for desktop.
        At the top of the framed heroes on mobile, it sits 16px below the
        inner frame line (16px mobile frame padding + 1px border + 16px gap). */}
    <div
      className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        showPill ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
      }`}
      style={{ top: isMobile && !scrolled && (path === "/" || path === "/about") ? 33 : 20 }}
    >
      <div
        className="flex items-center gap-10 rounded-none py-3.5 pl-7 pr-6 shadow-lg"
        style={{ background: "#0e0e0d" }}
      >
        <a
          href="/"
          onClick={go("#home")}
          className="text-h4 whitespace-nowrap"
          style={{ color: "var(--color-white)" }}
        >
          UMA MAHESH
        </a>
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col items-center justify-center gap-[5px] p-1 transition-opacity hover:opacity-70"
        >
          <span
            className="h-px w-5 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="h-px w-5 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

    </div>

    {/* Fullscreen menu — smooth curtain slide, tux.co style */}
    <div
      className={`fixed inset-0 z-40 flex flex-col justify-between overflow-hidden px-8 pb-10 pt-32 lg:px-16 ${
        menuOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
      style={{
        background: "#0e0e0d",
        transition: "transform 0.9s cubic-bezier(0.83, 0, 0.17, 1)",
      }}
      aria-hidden={!menuOpen}
    >
      <nav>
        <ul className="flex flex-col">
          {NAV_LINKS.map((link, i) => {
            const isActive = link.route ? path === link.route : path === "/" && active === link.hash;
            return (
              <li
                key={link.label}
                className="overflow-hidden"
                style={{ borderBottom: "1px dashed rgba(255,255,255,0.12)" }}
              >
                <a
                  href={link.route ?? link.hash}
                  onClick={
                    link.route
                      ? (e) => {
                          e.preventDefault();
                          setMenuOpen(false);
                          navigate(link.route!);
                        }
                      : go(link.hash!)
                  }
                  className="group flex items-baseline gap-5 py-4 lg:py-5"
                  style={{
                    transform: menuOpen ? "translateY(0)" : "translateY(110%)",
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${
                      menuOpen ? 0.3 + i * 0.07 : i * 0.03
                    }s, opacity 0.55s ease ${menuOpen ? 0.3 + i * 0.07 : i * 0.03}s`,
                  }}
                >
                  <span className="text-h6 w-8 shrink-0" style={{ color: "rgba(254,249,237,0.4)" }}>
                    0{i + 1}
                  </span>
                  {/* Bouncy hover: springs to the right */}
                  <span
                    className={`inline-block uppercase group-hover:translate-x-5 group-hover:opacity-100 ${
                      isActive ? "" : "opacity-60"
                    }`}
                    style={{
                      color: "var(--color-white)",
                      fontSize: "clamp(34px, 5.5vw, 64px)",
                      lineHeight: 1.05,
                      letterSpacing: "-2px",
                      fontWeight: 600,
                      transition:
                        "transform 0.55s cubic-bezier(0.34, 1.8, 0.5, 1), opacity 0.3s ease",
                    }}
                  >
                    {link.label}
                    {link.sup && <sup className="ml-1 align-super text-[14px]">{link.sup}</sup>}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom meta row */}
      <div
        className="flex flex-wrap items-end justify-between gap-6"
        style={{
          opacity: menuOpen ? 1 : 0,
          transition: `opacity 0.5s ease ${menuOpen ? 0.55 : 0}s`,
        }}
      >
        <span className="text-h6" style={{ color: "rgba(254,249,237,0.45)" }}>
          //HYDERABD, INDIA
        </span>
        <span className="text-h6" style={{ color: "rgba(254,249,237,0.45)" }}>
          ESTED— JAN 2024
        </span>
        <a
          href="mailto:umamahesh.chinchula@gmail.com"
          className="text-button transition-opacity hover:opacity-60"
          style={{ color: "var(--color-white)" }}
        >
          umamahesh.chinchula@gmail.com
        </a>
      </div>
    </div>
    </>
  );
}
