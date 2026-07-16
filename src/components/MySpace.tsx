import { useState } from "react";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/* -----------------------------------------------------------------------------
   My Space (Music & Books) — light section: "(04) //MY SPACE MUSIC & BOOKS",
   expandable list rows; the open row turns pink and shows its content
   (favorite-album thumbnails for row one, mini short stories for the rest).
   -------------------------------------------------------------------------- */

const ALBUMS = [
  { img: "/ref/album-1.jpg", href: "https://open.spotify.com/track/6eygbzyL6hY8jFQTARDuo9?autoplay_ok=1" },
  { img: "/ref/album-2.jpg", href: "https://open.spotify.com/track/1NZs6n6hl8UuMaX0UC0YTz?autoplay_ok=1" },
  { img: "/ref/album-3.jpg", href: "https://open.spotify.com/track/4kV0ugCwyF7OAb3huIdThG" },
];

const ITEMS = [
  {
    id: "{01}",
    title: "My all time fav albums are here",
    body: (
      // Mobile: covers stack vertically, one full-width per row; md+ keeps the
      // original horizontal right-aligned strip.
      <div className="flex flex-col gap-3 px-6 pb-6 pt-2 md:flex-row md:justify-end">
        {ALBUMS.map((a) => (
          <a
            key={a.img}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full transition-transform duration-300 hover:-translate-y-1 md:w-auto"
          >
            <img
              src={a.img}
              alt="Favorite album on Spotify"
              className="aspect-square w-full object-cover md:size-40"
            />
          </a>
        ))}
      </div>
    ),
  },
  {
    id: "{02}",
    title: "The Words I Never Said",
    body: (
      <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
        <p className="max-w-[640px] text-[15px] leading-6" style={{ color: "rgba(21,21,21,0.75)" }}>
          A collection of unspoken feelings from a man who loved deeply, but
          never knew how to say them. Some stories are louder in silence than
          they ever are in words.
        </p>
        <span className="text-h6" style={{ color: "rgba(21,21,21,0.5)" }}>
          Full stories out soon
        </span>
      </div>
    ),
  },
  {
    id: "{03}",
    title: "When Love Changed Direction",
    body: (
      <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
        <p className="max-w-[640px] text-[15px] leading-6" style={{ color: "rgba(21,21,21,0.75)" }}>
          The goal was no longer to have her. The goal became becoming the kind
          of man who could give her the life she deserved — even if that life
          didn't include him.
        </p>
        <span className="text-h6" style={{ color: "rgba(21,21,21,0.5)" }}>
          Full stories out soon
        </span>
      </div>
    ),
  },
  {
    id: "{04}",
    title: "Different Skies",
    body: (
      <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
        <p className="max-w-[640px] text-[15px] leading-6" style={{ color: "rgba(21,21,21,0.75)" }}>
          They loved under the same sky, but lived beneath different realities.
          One carried comfort. The other carried responsibility.
        </p>
        <span className="text-h6" style={{ color: "rgba(21,21,21,0.5)" }}>
          Full stories out soon
        </span>
      </div>
    ),
  },
];

function Row({
  item,
  open,
  onToggle,
  delay,
}: {
  item: (typeof ITEMS)[number];
  open: boolean;
  onToggle: () => void;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className="overflow-hidden transition-colors duration-300"
        style={{
          background: open ? "var(--color-pink)" : "var(--color-island-spice)",
          borderBottom: "1px solid rgba(21,21,21,0.12)",
        }}
      >
        {/* Mobile: number left + icon right on the top row, title full-width
            below. Desktop (md+): original single row — number / title / icon. */}
        <button onClick={onToggle} className="flex w-full flex-wrap items-center gap-y-3 px-6 py-4 text-left md:flex-nowrap md:gap-8">
          <span className="text-h6 order-1 w-10 shrink-0" style={{ color: "rgba(21,21,21,0.6)" }}>
            {item.id}
          </span>
          <span
            className="order-3 w-full md:order-2 md:w-auto md:flex-1"
            style={{ color: "var(--color-cod-gray)", fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: "-1px", fontWeight: 600 }}
          >
            {item.title}
          </span>
          <span
            className="order-2 ml-auto flex size-8 shrink-0 items-center justify-center transition-colors duration-300 md:order-3 md:ml-0"
            style={{ background: open ? "var(--cta)" : "var(--color-cod-gray)" }}
            aria-hidden
          >
            {open ? (
              <span className="size-2.5" style={{ background: "var(--color-cod-gray)" }} />
            ) : (
              <span className="text-lg leading-none" style={{ color: "var(--color-white)" }}>
                +
              </span>
            )}
          </span>
        </button>
        <div
          className="grid transition-[grid-template-rows] duration-400"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mx-6 border-t border-black/15" />
            {item.body}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function MySpace() {
  const [open, setOpen] = useState(0);
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#e9e6de", color: "var(--color-cod-gray)" }}
    >
      <SectionFrame tone="light" className="flex flex-col gap-14 py-24">
        <div className="px-5 lg:pl-[400px]">
          <SectionHeading index="04" lines={["MY SPACE", "MUSIC & BOOKS"]} tone="light" />
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">
          <aside className="w-full shrink-0 px-5 lg:w-[360px]">
            <span className="text-sm font-bold" style={{ letterSpacing: "-0.16px" }}>
              (MY SPACE)
            </span>
          </aside>

          <div className="flex flex-1 flex-col px-5 lg:pl-10">
            {ITEMS.map((item, i) => (
              <Row
                key={item.id}
                item={item}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
                delay={i * 60}
              />
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}
