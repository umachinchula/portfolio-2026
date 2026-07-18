/* -----------------------------------------------------------------------------
   Case-study page content — transcribed from the four project page designs
   (MATCHING / STATE INDICATORS / ONBOARDING / INKWAVE exports).
   -------------------------------------------------------------------------- */

export type WorkSection = {
  label: string;
  paras: string[];
  bullets?: string[];
  /** index in `paras` after which the bullets render */
  bulletsAfter?: number;
};

export type WorkDetail = {
  slug: string;
  workNo: string;
  categories: string[];
  title: string;
  intro: string;
  client: string;
  timeline: string;
  metrics: { value: string; from?: string; label: string; dir?: "up" | "down" }[];
  media: string;
  liveUrl?: string;
  sections: WorkSection[];
};

export const WORK_DETAILS: WorkDetail[] = [
  {
    slug: "matching",
    workNo: "01",
    categories: ["PRODUCT DESIGN", "FEATURE REDESIGN"],
    title: "Matching — From Endless Feed to Fast Decision",
    intro:
      "Pitch40 is a B2B fundraising platform, a bridge between startups raising money and investors deploying it. Investors browse a feed of startups to evaluate. I own product design. Three weeks, solo, straight to live.",
    client: "PITCH 40",
    timeline: "3 WEEKS",
    metrics: [
      { value: "<5 min", from: "7–15 min", label: "Time to Decide", dir: "down" },
      { value: "+36%", label: "Investment Decisions", dir: "up" },
      { value: "$8.9M", from: "$4.7M", label: "Matched Deal Volume", dir: "up" },
    ],
    media: "/work/matching-media.jpg",
    liveUrl: "https://pitch40.com/",
    sections: [
      {
        label: "(The bridge was broken, and everyone knew it)",
        paras: [
          "A Slack call from the CTO and two stakeholder meetings, all saying the same thing: investors weren't finding startups worth their time, and opening a single profile ate **7–15 minutes**. An investor with 40 startups to review faced an 8-hour scroll, so most never really decided. They scrolled until they got tired.",
          "The feed was built like Instagram. Endless reel-style cards, no ranking, no memory, optimizing for time-on-app. But investors aren't users you retain. They're people who need to make a call and leave. The platform was proud of a number it should never have wanted.",
        ],
      },
      {
        label: "(I treated it like a matchmaking problem)",
        paras: [
          "The way I got unstuck was comparing it to matching two people, not who's most popular, but whether two sides actually fit. Pitch40 already collected all of that from both sides: Stage, Industry, Ticket, Valuation, Team, Traction, Business Model, Documents. The compatibility data was sitting right there. Nobody had built a layer that used it to decide anything.",
        ],
      },
      {
        label: "(I refused to guess the weights)",
        paras: [
          "A match score is a ranking opinion, and the easy move was to weight all 8 fields by gut. But a ranking built on my assumptions is how you ship something nobody trusts. So I surveyed investors on what they actually scan for when they decide to open a startup.",
          "The answers were lopsided: Stage and Industry ran away with it, ticket middling, valuation a glance. Team and Traction? 1–2%. Basically ignored.",
          "My first reaction was that this had to be wrong. How does a match score ignore team and traction? But they weren't saying those don't matter. They were saying those don't decide which card to open. They decide whether to write the check. Two different moments, and I'd been about to jam them into one number.",
          "So I split them. The score ranks attention: \"is this worth my next five minutes.\" Not investability. Stage and Industry drive the score; Team and Traction live in the profile, where diligence belongs.",
        ],
      },
      {
        label: "(Some numbers dropped, and that was the win)",
        paras: [
          "I had dev log the moment a card came into view and the moment an investor acted on it, then measured the gap: median, not average, so a few people leaving tabs open couldn't lie to me.",
          "The results looked almost backwards. Session length fell from 14 minutes to 4, which reads like people fleeing, until you realize that was the vanity number falling away. The ones that mattered went the other way: time to a decision went from 7–15 minutes to **under 5**, sessions ending in a real decision went from **1 in 6 to 1 in 2**, and investor confidence climbed from **2.8 to 4.4**.",
          "That last pair is the one I'm proudest of: faster decisions that were also more confident, so the speed didn't come from cutting corners. Platform-wide, investment decisions rose **+36%**, with matched deal volume going from **$4.7M to $8.9M**.",
        ],
      },
      {
        label: "(The score's whole job was knowing what to leave out)",
        paras: [
          "Before this, matching didn't exist on Pitch40. The feed was raw and unranked, so I wasn't refining a decision layer, I was building the first one. Anyone can add fields to a ranking. The judgment is in **what you refuse to add**. Stage and Industry earned the score; team and traction earned the profile. A ranking that tries to weigh everything ends up meaning nothing.",
        ],
      },
    ],
  },
  {
    slug: "state-indicators",
    workNo: "02",
    categories: ["PRODUCT DESIGN", "FEATURE DESIGN"],
    title: "State Indicators — Giving the Feed a Memory",
    intro:
      "Pitch40 is a B2B fundraising platform, a bridge between startups raising money and investors deploying it. Investors browse a feed of startups to evaluate and act on. I own product design. This shipped alongside the matching work, as part of the same feed redesign.",
    client: "PITCH 40",
    timeline: "1 MONTH",
    metrics: [
      { value: "3–5", from: "22–30", label: "Startups Evaluated Per Session", dir: "down" },
      { value: "4", label: "Auto-Inferred States" },
    ],
    media: "/work/state-indicators-media.jpg",
    liveUrl: "https://pitch40.com/",
    sections: [
      {
        label: "(The feed had amnesia)",
        paras: [
          "While building the match score, I kept seeing the same thing in the behavior: investors running into startups they'd already dealt with, already viewed, already wishlisted, in one case already invested in, and evaluating them again from scratch. The feed had no memory, so the same startup could cost an investor **five minutes three separate times**.",
          "On a platform where investors are short on time, that redundancy is expensive. And it wasn't a bug. It was the feed doing exactly what it was built to do: show cards, forget everything, show more. Instagram behavior, again.",
        ],
      },
      {
        label: "(The CTO said hide it. I said label it)",
        paras: [
          "The states already existed in the system. The journey runs scroll → Viewed → Wishlisted → chat/call → Invested / Pending, and the Portfolio already tracked wishlisted, offers, and invested. The information was there; the feed just wasn't showing it.",
          "The CTO's instinct was to hide viewed profiles: drop them down or out, keep fresh startups on top. It's the natural content-feed move: seen it, clear it.",
          "**I refused.** That logic only works if content is infinite. On Instagram, hiding what you've seen costs nothing. There's an ocean behind it. But Pitch40's startup pool is limited. Hide every viewed startup and you're not decluttering, you're shrinking an investor's already-scarce options, burying startups they might have viewed, thought about, and come back to decide on. **A viewed startup isn't a used-up one.** Hiding it destroys the context I was trying to protect.",
          "So instead of removing state, I made it visible. Every card carries its state: Viewed, Wishlisted, Invested, Pending, all inferred automatically. Now an investor knows where they stand before they open a card, and the finite pool stays whole.",
        ],
      },
      {
        label: "(Four states, because that's all the journey has)",
        paras: [
          "I didn't want a wall of badges either. So I mapped the labels to the only moments that actually change what an investor should do next:",
          "Four states, because the real journey only has four decision-relevant moments. More would've been noise dressed up as information.",
        ],
        bullets: [
          "Viewed: you've already opened this. Don't re-evaluate it from zero.",
          "Wishlisted: you saved it for follow-up. Intent, without commitment.",
          "Pending: you made an offer at a set amount; the startup hasn't accepted yet. The ball is in their court.",
          "Invested: done. Out of active evaluation entirely.",
        ],
        bulletsAfter: 0,
      },
      {
        label: "(The number that belongs to this decision)",
        paras: [
          "One metric this feature owns outright: startups meaningfully evaluated per session dropped from **22–30 down to 3–5**. That fall isn't about ranking. The match score decides which startups rise, but it doesn't stop an investor from re-opening one they've seen. The labels do. When a card carries its own history, you glance, you know where you stand, you move on.",
          "I trust the number partly because of where the problem surfaced: I didn't hear about the redundancy in a survey, I watched it in the behavioral data while building matching. The labels were the fix for something I'd seen with my own eyes.",
        ],
      },
      {
        label: "(A pattern from consumer apps can quietly wreck a marketplace)",
        paras: [
          "\"Hide what's been seen\" is correct on Instagram and wrong on Pitch40, and the only way to know that is to remember Pitch40 isn't Instagram: its inventory is finite, and every startup is an option worth preserving. The feed didn't need to feel fresh. It needed to remember.",
        ],
      },
    ],
  },
  {
    slug: "onboarding",
    workNo: "03",
    categories: ["PRODUCT DESIGN", "FLOW REDESIGN"],
    title: "Onboarding — Reducing Friction to First Match",
    intro:
      "Pitch40 is a B2B fundraising platform, a bridge between startups raising money and investors deploying it. Before a startup can be matched, it has to get onto the platform. I own product design. Live product.",
    client: "PITCH 40",
    timeline: "2 MONTHS",
    metrics: [
      { value: "20 min", from: "2 days", label: "Time to First Match", dir: "down" },
      { value: "76%", from: "41%", label: "Onboarding Completion", dir: "up" },
    ],
    media: "/work/onboarding-media.jpg",
    liveUrl: "https://pitch40.com/",
    sections: [
      {
        label: "(Onboarding wasn't a form. It was a wall)",
        paras: [
          "Before a founder could do anything on Pitch40, they had to supply: company name, founding date, HQ address, three LinkedIn URLs, socials, sector, stage, a **500-word bio**, a pitch deck PDF, a required video, **two references**, a funding ask, and use-of-funds across ten categories.",
          "That's not onboarding. It's a due-diligence packet. We were asking founders to assemble documents and chase references before they'd seen a single thing the platform could do for them. First match took **over two days**, half of it just gathering paperwork. And **59% never finished**. They hit the wall and left.",
        ],
      },
      {
        label: "(I didn't want to cut blindly. So I cut against evidence)",
        paras: [
          "The lazy fix is to make the form shorter. But shorter how? Cut the wrong field and you starve investors of something they need, trading a founder problem for an investor one. I wasn't willing to guess which fields were dead weight.",
          "So I got evidence from both sides. From the startup side, I pulled the drop-off data, where founders were actually dying in the funnel. From the investor side, I sat down with real investors over Slack and asked what they genuinely look at when they size up a startup. (Those conversations are the only reason this cut was defensible instead of reckless.)",
          "Then I made the call at the intersection: remove the fields that were expensive and that investors didn't rely on. Protect the ones investors need. Not \"make it shorter\": **remove friction that buys nothing, keep friction that buys signal**.",
        ],
      },
      {
        label: "(Removed from the door, not deleted from the product)",
        paras: [
          "The bio, references, use-of-funds, funding ask: none of it vanished. I moved it to profile completion, a step a founder reaches after they're on the platform and motivated to be seen well. That data still matters; it just has no business standing between a founder and their first pitch.",
          "What's left at the door is the minimum to exist and be matched: name, company, a photo, and your pitch, a video, with a thumbnail, title, and short description. Get in, get your pitch live, start getting matched. Depth accrues later.",
        ],
      },
      {
        label: "(The numbers moved because the wall came down)",
        paras: [
          "Two results I trust completely, because the mechanism is obvious. Time to first match dropped from over two days to **under 20 minutes**. The two days were mostly paperwork, and the paperwork is gone from the critical path. And completion climbed from **41% to 76%**, because there's no longer a wall to abandon.",
          "I left one softer \"profile quality\" metric out. It compared the old profile and the new one, which measure different things, and I'd rather stand on two numbers I can defend than pad the case with a third I'd have to hedge.",
        ],
      },
      {
        label: "(Onboarding's job is to get you in, not to prove you belong)",
        paras: [
          "The old flow made founders prove they were investable before they were even on the platform. That's the wrong job for onboarding. The real job is the first step: get them in, get them seen, and let depth come when they're motivated, not when they're strangers at the door. The hard part wasn't deciding to cut. It was refusing to cut on instinct, and going and getting the evidence that told me exactly where the line was.",
        ],
      },
    ],
  },
  {
    slug: "inkwave",
    workNo: "04",
    categories: ["PRODUCT DESIGN", "0→1"],
    title: "Inkwave — From One Sentence to a Shipped Product",
    intro:
      "Inkwave is a newsletter platform where creators publish and monetize in one place. It started as a single sentence from a CEO: no roadmap, no spec, no wireframes. I owned product design end to end: scope, research, every screen, and the calls that shaped what got built. Solo, 0→1, shipped to a 30-day beta.",
    client: "INKWAVE",
    timeline: "9 MONTHS",
    metrics: [
      { value: "24/30", label: "Retained After 30 Days" },
      { value: "18/30", label: "Monetized in Week 1" },
      { value: "<5 min", label: "Onboarding Time" },
    ],
    media: "/work/inkwave-media.jpg",
    sections: [
      {
        label: "(The brief was one sentence)",
        paras: [
          "\"Build a platform where users can create newsletters and monetize them.\"",
          "That was the entire brief. No requirements doc, no feature list, no wireframes to react to. Before I could design anything, I had to define the thing: what it was, what it wasn't, and what the first version could afford to be.",
        ],
      },
      {
        label: "(I studied four competitors to find the gap, not to copy)",
        paras: [
          "Substack, Ghost, Beehiiv, Mailchimp: I went through each to find the hole they all shared. The pattern was consistent: every tool forced creators to choose between being simple and being able to earn. Substack buried monetization so deep creators found it too late. Ghost was powerful but too technical. Beehiiv threw every growth tool at you upfront. Mailchimp drowned you in automation from day one.",
          "Nobody had made earning feel simple. That gap became the north star: simple to start and built to monetize, not one or the other.",
        ],
      },
      {
        label: "(The decision the whole product hinged on: when does monetization appear?)",
        paras: [
          "The highest-stakes call in the build. Get it wrong and every downstream number suffers. Two honest options.",
          "Option 1: Monetize first. Ask creators to set up Stripe and define pricing during onboarding, before they've written a word. It front-loads the money but asks for commitment before the creator has felt anything: high pressure, no accomplishment yet, and high drop-off.",
          "Option 2: Publish first. Get the creator to publish, then introduce monetization as a natural next step. I chose this one.",
          "The reasoning is the core insight of the whole product: publishing builds momentum; **monetization only works after that**. Asking someone to price their work before they've made any is asking them to value something that doesn't exist yet. Let them publish, let them feel accomplished; then the earning step feels earned instead of demanded.",
        ],
      },
      {
        label: "(Building the loop, and refusing to overbuild it)",
        paras: [
          "With two engineers and three months, V1 had to be the core loop only: publish → grow → earn → publish again. Every feature got one test: does it keep the loop turning? Onboarding was cut to the few fields needed to publish. The editor was built around one job: remove every reason not to hit publish. The dashboard was stripped from ten-plus metrics down to the four that actually tell a creator how they're doing.",
          "The hardest call wasn't what to build. It was what to refuse. In beta, **8 of 30 creators** asked for email automation. Real users, asking directly, for a reasonable thing. **I said no.** It would've cost two more months on a two-dev team, and automation makes the loop spin faster. It doesn't make the loop exist. Monetization does. So automation went to V2, and V1 stayed focused.",
        ],
      },
      {
        label: "(What the beta showed)",
        paras: [
          "A 30-day beta with 30 creators isn't a scaled launch, and I won't pretend it is. It's a validation run: small enough to watch closely, big enough to see whether the core bets held. They did:",
          "**24 of 30 creators** were still active after 30 days: the core loop works. **18 of 30** set up paid subscriptions in their first week: the publish-first sequencing paid off. And most finished onboarding in under 5 minutes: the minimal-fields bet held.",
          "One thing the beta taught me that no survey did: the analytics dashboard confused people. It never showed up in survey responses. It showed up when I watched someone pause, squint, and click away.",
        ],
      },
      {
        label: "(The real skill in 0→1 isn't designing, it's deciding what not to design)",
        paras: [
          "Anyone can add features to a blank page. The whole job here was subtraction under pressure: from one sentence, define a product; from every possible feature, keep only the loop; from real users asking for automation, say no so the core could ship. The publish-first bet, the stripped dashboard, the automation I refused: same discipline. When you're building from nothing, **what you leave out is the product**.",
        ],
      },
    ],
  },
];

export function getWork(slug: string) {
  return WORK_DETAILS.find((w) => w.slug === slug);
}
