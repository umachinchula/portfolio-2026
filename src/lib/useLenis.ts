import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** The live Lenis instance (used by nav links for smooth anchor scrolls). */
export function getLenis() {
  return instance;
}

/** Mount-once smooth scrolling for the whole page. */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    instance = lenis;
    if (import.meta.env.DEV) {
      (window as unknown as Record<string, unknown>).__lenis = lenis;
    }

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);
}

/** Smooth-scroll to an in-page anchor, falling back to native scrolling. */
export function scrollToAnchor(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target as HTMLElement, { offset: -72 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}
