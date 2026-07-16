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

/**
 * Smooth-scroll to an in-page anchor, falling back to native scrolling.
 *
 * Lenis caches the page's scrollable height ("limit") and only recomputes it
 * on its own resize observer tick. Right after a route change, the new
 * page's layout (large sections, images) can still be settling when we
 * measure, so a single resize()+scrollTo can undershoot the real target.
 * Firing it twice — once immediately, once after layout has had time to
 * finish — self-corrects without any visible jank (the second call just
 * nudges Lenis's in-flight animation to the true target).
 */
export function scrollToAnchor(hash: string) {
  const attempt = () => {
    const target = document.querySelector(hash);
    if (!target) return;
    if (instance) {
      instance.resize();
      instance.scrollTo(target as HTMLElement, { offset: -72 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  };
  requestAnimationFrame(() => {
    attempt();
    setTimeout(attempt, 400);
  });
}
