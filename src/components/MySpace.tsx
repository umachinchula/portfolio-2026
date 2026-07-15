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
      <div className="flex justify-end gap-3 px-6 pb-6 pt-2">
        {ALBUMS.map((a) => (
          <a
            key={a.img}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <img src={a.img} alt="Favorite album on Spotify" className="size-40 object-cover" />
          </a>
        ))}
      </div>
    ),
  },
  {
    id: "{02}",
    title: "Miss you a lot - a mini short story",
    body: (
      <p className="max-w-[640px] px-6 pb-6 pt-2 text-[15px] leading-6" style={{ color: "rgba(21,21,21,0.75)" }}>
        Some stories don't need endings — they just need a place to sit for a
        while. This one lives here, between songs and bookmarks.
      </p>
    ),
  },
  {
    id: "{03}",
    title: "Things are different - a mini short story",
    body: (
      <p className="max-w-[640px] px-6 pb-6 pt-2 text-[15px] leading-6" style={{ color: "rgba(21,21,21,0.75)" }}>
        Change never announces itself. It shows up quietly, rearranges the
        furniture, and waits for you to notice.
      </p>
    ),
  },
  {
    id: "{04}",
    title: "Our two different worlds - a mini short story",
    body: (
      <p className="max-w-[640px] px-6 pb-6 pt-2 text-[15px] leading-6" style={{ color: "rgba(21,21,21,0.75)" }}>
        Two orbits, one gravity. A short story about distance that never quite
        felt like distance.
      </p>
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
        <button onClick={onToggle} className="flex w-full items-center gap-8 px-6 py-4 text-left">
          <span className="text-h6 w-10 shrink-0" style={{ color: "rgba(21,21,21,0.6)" }}>
            {item.id}
          </span>
          <span
            className="flex-1"
            style={{ color: "var(--color-cod-gray)", fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: "-1px", fontWeight: 600 }}
          >
            {item.title}
          </span>
          <span
            className="flex size-8 shrink-0 items-center justify-center transition-colors duration-300"
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
