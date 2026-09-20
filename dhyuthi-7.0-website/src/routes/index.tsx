import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Menu,
  Play,
  Radio,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/SB_White_1.png.asset.json";
import circuitImage from "@/assets/circuit-sprint.jpg";
import mechImage from "@/assets/mechathon.jpg";
import pulseImage from "@/assets/pulse-night.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhyuthi 7.0 — IEEE SCT SB" },
      { name: "description", content: "Follow Dhyuthi 7.0 track reveals, pre-events, competitions and winner announcements from IEEE SCT SB." },
      { property: "og:title", content: "Dhyuthi 7.0 — IEEE SCT SB" },
      { property: "og:description", content: "The next Dhyuthi transmission: track reveals, pre-events and competition updates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const trackReveals = [
  { number: "01", title: "Build", kicker: "Hardware · Robotics", copy: "Machines, circuits and rapid builds engineered against the clock.", image: mechImage, alt: "Robotic arm in a futuristic engineering workshop", status: "Revealed", tone: "primary" },
  { number: "02", title: "Decode", kicker: "Code · Logic", copy: "Problem-solving arenas for sharp minds, fast teams and elegant solutions.", image: circuitImage, alt: "Electric circuit board glowing in cyan", status: "Next drop", tone: "secondary" },
  { number: "03", title: "Create", kicker: "Design · Culture", copy: "A collision of visual craft, storytelling and campus energy after dark.", image: pulseImage, alt: "Festival crowd beneath cyan laser lights", status: "Coming soon", tone: "muted" },
] as const;

const drops = [
  { index: "PRE–01", type: "Pre-event", title: "The opening challenge", copy: "A digital warm-up before the main festival. Format and entry details reveal soon.", status: "NEXT DROP", accent: "primary" },
  { index: "COMP–01", type: "Competition", title: "First arena incoming", copy: "Team size, rules and prize pool will arrive with the official competition poster.", status: "QUEUED", accent: "secondary" },
  { index: "WIN–01", type: "Results", title: "Winner board", copy: "Finalists and winners will be celebrated here after every completed event.", status: "LOCKED", accent: "muted" },
] as const;

const schedule = [
  ["DROP 01", "Track identity", "The first Dhyuthi 7.0 world is revealed"],
  ["DROP 02", "Pre-event poster", "Rules, dates and entry link go live"],
  ["DROP 03", "Competition season", "Full lineup and registrations open"],
  ["FINALE", "Winner stories", "Results, portraits and highlights"],
];

function Countdown() {
  const [time, setTime] = useState({ days: 18, hours: 7, minutes: 42, seconds: 9 });

  useEffect(() => {
    const timer = window.setInterval(() => setTime((current) => {
      let total = current.days * 86400 + current.hours * 3600 + current.minutes * 60 + current.seconds - 1;
      if (total < 0) total = 18 * 86400;
      return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
    }), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="mt-10 flex gap-2 sm:gap-3">{Object.entries(time).map(([label, value]) => <div key={label} className="w-16 rounded-md border border-border bg-foreground/5 py-2 text-center backdrop-blur-md"><div className="font-display text-2xl font-semibold text-primary sm:text-3xl">{String(value).padStart(2, "0")}</div><div className="text-[9px] uppercase text-muted-foreground">{label}</div></div>)}</div>;
}

function TrackPoster({ track, featured = false }: { track: (typeof trackReveals)[number]; featured?: boolean }) {
  const statusClass = track.tone === "primary" ? "bg-primary text-primary-foreground" : track.tone === "secondary" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground";

  return (
    <article className={`group relative min-h-[410px] overflow-hidden rounded-lg border border-border ${featured ? "md:col-span-2 md:min-h-[540px]" : "md:min-h-[540px]"}`}>
      <img src={track.image} alt={track.alt} width={1200} height={900} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/55 to-background/5" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-foreground/15 p-4 text-[10px] font-medium uppercase">
        <span>TRACK / {track.number}</span><span className={`rounded-sm px-2 py-1 ${statusClass}`}>{track.status}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="text-xs font-medium uppercase text-primary">{track.kicker}</p>
        <h3 className={`mt-2 font-display font-semibold ${featured ? "text-5xl sm:text-7xl" : "text-5xl"}`}>{track.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-foreground/75">{track.copy}</p>
        <div className="mt-6 flex items-center justify-between border-t border-foreground/15 pt-4 text-xs font-medium uppercase"><span>Dhyuthi 7.0</span><ArrowUpRight className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
      </div>
    </article>
  );
}

function DropCard({ drop }: { drop: (typeof drops)[number] }) {
  const accentClass = drop.accent === "primary" ? "text-primary" : drop.accent === "secondary" ? "text-secondary" : "text-muted-foreground";

  return (
    <article className="group flex min-h-64 flex-col justify-between rounded-lg border border-border bg-card/55 p-5 transition-colors hover:bg-card sm:p-6">
      <div className="flex items-start justify-between gap-4 text-[10px] font-medium uppercase"><span className={accentClass}>{drop.index}</span><span className="rounded-sm border border-border px-2 py-1 text-muted-foreground">{drop.status}</span></div>
      <div><p className="text-xs uppercase text-muted-foreground">{drop.type}</p><h3 className="mt-3 font-display text-2xl font-semibold">{drop.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{drop.copy}</p></div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[10px] uppercase text-muted-foreground"><span>Details pending</span><ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></div>
    </article>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-60" /><div className="signal-sweep pointer-events-none absolute -inset-y-20 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-primary/10 to-transparent" />
      <header className="relative z-30 flex h-20 items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-xl sm:px-8">
        <a href="#top" aria-label="Dhyuthi home" className="flex items-center gap-4"><img src={logo.url} alt="IEEE SCT Student Branch" className="h-10 w-auto" /><span className="hidden h-7 w-px bg-border sm:block" /><span className="hidden font-display text-sm font-semibold sm:block">DHYUTHI <span className="text-primary">7.0</span></span></a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex"><a href="#tracks" className="hover:text-primary">Tracks</a><a href="#drops" className="hover:text-primary">Pre-events</a><a href="#updates" className="hover:text-primary">Updates</a><a href="#contact" className="hover:text-primary">Contact</a></nav>
        <div className="flex items-center gap-3"><Button asChild><a href="#register">Get updates</a></Button><Button type="button" variant="outline" size="icon" aria-label="Open menu" className="md:hidden"><Menu /></Button></div>
      </header>
      <div className="relative z-20 overflow-hidden border-b border-border bg-foreground/3"><div className="ticker-track flex w-max whitespace-nowrap py-2 text-[10px] font-medium uppercase text-primary"><span className="px-8">◆ Track reveals incoming</span><span className="px-8">◆ Pre-event posters drop here</span><span className="px-8">◆ Winners take the signal</span><span className="px-8">◆ Track reveals incoming</span><span className="px-8">◆ Pre-event posters drop here</span><span className="px-8">◆ Winners take the signal</span></div></div>

      <main id="top" className="relative z-10">
        <section className="px-5 pb-14 pt-7 sm:px-8 lg:pt-10">
          <div className="relative min-h-[670px] overflow-hidden rounded-xl border border-primary/20 bg-linear-to-br from-primary/12 via-background to-background px-6 py-12 sm:px-12 lg:px-16 lg:py-20">
            <div className="absolute right-[-12%] top-[-20%] h-[140%] w-1/2 rotate-12 border-x border-primary/15 bg-primary/5 backdrop-blur-sm" /><div className="scan-line absolute inset-x-0 top-0 h-px bg-primary/80 shadow-[0_0_22px_var(--primary)]" />
            <div className="relative max-w-6xl"><p className="flex items-center gap-2 text-xs font-medium uppercase text-secondary"><Radio className="size-3" /> IEEE SCT SB PRESENTS · EDITION 07</p><h1 className="mt-7 font-display text-[clamp(4rem,14vw,11rem)] font-semibold leading-[0.78]">DHYUTHI<br /><span className="text-primary">7.0</span></h1><p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">A new season of track reveals, pre-event challenges and competition stories. Every announcement arrives as a transmission.</p>
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium uppercase"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Dates announcing soon</span><span className="flex items-center gap-2"><MapPin className="size-4 text-secondary" /> SCT College of Engineering</span></div>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="secondary" size="lg"><a href="#register">Follow the reveals <ArrowDownRight /></a></Button><Button asChild variant="outline" size="lg"><a href="#tracks">Explore tracks</a></Button></div><Countdown />
            </div>
          </div>
        </section>

        <section id="tracks" className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-medium uppercase text-primary">01 / TRACK REVEALS</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">Three worlds. One signal.</h2></div><Radio className="hidden size-8 text-secondary sm:block" /></div><div className="mt-9 grid gap-4 md:grid-cols-3">{trackReveals.map((track, index) => <TrackPoster track={track} featured={index === 0} key={track.title} />)}</div><p className="mt-4 text-xs text-muted-foreground">Track names are an early preview. Official titles and posters will replace them as reveals go live.</p></section>

        <section id="drops" className="border-y border-border bg-foreground/3 px-5 py-16 sm:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="text-xs font-medium uppercase text-secondary">02 / THE DROP BOARD</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">From reveal to result.</h2></div><p className="max-w-xl text-sm leading-6 text-muted-foreground lg:justify-self-end">The official stream for pre-events, competitions and winner announcements. Every release gets its own poster, status and story.</p></div><div className="mt-9 grid gap-4 md:grid-cols-3">{drops.map((drop) => <DropCard drop={drop} key={drop.index} />)}</div></div></section>

        <section id="updates" className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="grid gap-10 lg:grid-cols-[.42fr_.58fr]"><div><p className="text-xs font-medium uppercase text-primary">03 / RELEASE SEQUENCE</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Watch it unfold.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">No invented dates or registrations—each stage unlocks only when the official details are ready.</p></div><div className="divide-y divide-border border-y border-border">{schedule.map(([time, title, detail], index) => <div key={time} className="group grid grid-cols-[5.2rem_1fr_auto] items-center gap-3 py-5"><span className={index === 0 ? "font-display text-primary" : "font-display text-muted-foreground"}>{time}</span><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>{index === 3 ? <Trophy className="size-4 text-secondary" /> : <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:text-primary" />}</div>)}</div></div></section>

        <section className="border-t border-border bg-foreground/3 px-5 py-16 sm:px-8"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.35fr_.65fr]"><div className="group relative min-h-[420px] overflow-hidden rounded-lg"><img src={pulseImage} alt="Dhyuthi teaser crowd" width={1200} height={900} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65" /><div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" /><Button type="button" variant="outline" size="icon" aria-label="Play Dhyuthi teaser" className="absolute inset-0 m-auto size-20 rounded-full bg-background/40 backdrop-blur-lg [&_svg]:size-7"><Play className="ml-1 fill-current" /></Button><div className="absolute bottom-7 left-7"><p className="text-xs text-primary">TEASER / TRANSMISSION 001</p><h2 className="mt-2 font-display text-4xl font-semibold">The signal is live.</h2></div></div><div id="register" className="flex flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground"><div><p className="text-xs font-semibold">DON'T MISS A DROP</p><h3 className="mt-4 font-display text-3xl font-semibold">Get every reveal first.</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/70">Track posters, pre-event links and winner announcements—delivered when they go live.</p></div><form className="mt-10 flex gap-2" onSubmit={(event) => event.preventDefault()}><label htmlFor="email" className="sr-only">Email address</label><input id="email" type="email" placeholder="you@college.edu" className="min-w-0 flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none" /><Button type="submit" variant="secondary" size="icon" aria-label="Join updates"><ArrowUpRight /></Button></form></div></div></section>
      </main>

      <footer id="contact" className="relative z-10 border-t border-border bg-background px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><img src={logo.url} alt="IEEE SCT Student Branch" className="h-12 w-auto" /><p className="mt-5 max-w-sm text-sm text-muted-foreground">Dhyuthi 7.0 · The flagship technology festival of IEEE SCT Student Branch.</p></div><div className="flex flex-wrap gap-6 text-sm text-muted-foreground"><a href="#tracks" className="hover:text-primary">Tracks</a><a href="#drops" className="hover:text-primary">Pre-events</a><a href="mailto:ieee@cet.ac.in" className="hover:text-primary">Contact</a><a href="#top" className="text-primary">Back to top ↑</a></div></div><div className="mx-auto mt-10 flex max-w-7xl justify-between border-t border-border pt-5 text-[10px] uppercase text-muted-foreground"><span>© 2026 IEEE SCT SB</span><span>Create · Inspire · Innovate</span></div></footer>
    </div>
  );
}