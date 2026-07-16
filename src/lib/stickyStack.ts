/**
 * Shared "flow" math for the sticky overlapping card stacks (Selected Works,
 * Personal Case Studies, Testimonials): as the next card's sticky position
 * closes in on the current one, the current card scales down toward 80%,
 * reading as it settling underneath. Used on both desktop and mobile.
 */
export function applyStickyStack(wrappers: (HTMLElement | null)[], topFor: (i: number) => number) {
  wrappers.forEach((el, i) => {
    if (!el) return;
    const next = wrappers[i + 1];
    if (!next) {
      el.style.transform = "";
      return;
    }
    const stickyTop = topFor(i);
    const cover = Math.min(
      1,
      Math.max(0, (stickyTop + el.offsetHeight - next.getBoundingClientRect().top) / el.offsetHeight)
    );
    el.style.transform = `scale(${1 - 0.2 * cover})`;
    el.style.transformOrigin = "center top";
  });
}
