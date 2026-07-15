/* -----------------------------------------------------------------------------
   ArrowButton — the recurring split CTA: ↳ arrow box + label box.
   Variants match the design: yellow (candy corn), white, dark.
   -------------------------------------------------------------------------- */

/* arrow.svg is natively white — it sits on the dark cod-gray box unfiltered */
const VARIANTS = {
  yellow: {
    arrowBg: "var(--color-cod-gray)",
    labelBg: "var(--cta)",
    labelColor: "var(--color-cod-gray)",
  },
  white: {
    arrowBg: "var(--color-cod-gray)",
    labelBg: "var(--color-white)",
    labelColor: "var(--color-cod-gray)",
  },
  dark: {
    arrowBg: "var(--color-cod-gray)",
    labelBg: "var(--color-cod-gray)",
    labelColor: "var(--color-white)",
  },
} as const;

export default function ArrowButton({
  label,
  sup,
  href = "#",
  variant = "yellow",
  wide = false,
  onClick,
}: {
  label: string;
  sup?: string;
  href?: string;
  variant?: keyof typeof VARIANTS;
  wide?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const v = VARIANTS[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex h-[42px] items-stretch gap-0.5 overflow-hidden ${
        wide ? "w-full max-w-[430px]" : "w-fit"
      }`}
    >
      <span
        className="flex w-[42px] shrink-0 items-center justify-center transition-transform"
        style={{ background: v.arrowBg }}
      >
        <img
          src="/hero/arrow.svg"
          alt=""
          className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />
      </span>
      <span
        className={`text-button flex items-center justify-center px-6 transition-opacity group-hover:opacity-90 ${
          wide ? "flex-1" : ""
        }`}
        style={{ background: v.labelBg, color: v.labelColor }}
      >
        {label}
        {sup && <sup className="ml-0.5 text-[8px]">{sup}</sup>}
      </span>
    </a>
  );
}
