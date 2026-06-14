import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroCrest from "@/assets/hero-crest.jpg";
import { jerseys, leagues, type League, type Jersey } from "@/data/jerseys";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pretty Cool Jerseys — A Hockey Jersey Collection" },
      {
        name: "description",
        content:
          "A preservation study of authentic and replica hockey jerseys, from heavy-knit wool to modern reverse retros.",
      },
      { property: "og:title", content: "Pretty Cool Jerseys — A Hockey Jersey Collection" },
      {
        property: "og:description",
        content:
          "A preservation study of authentic and replica hockey jerseys, from heavy-knit wool to modern reverse retros.",
      },
      { property: "og:image", content: heroCrest },
      { name: "twitter:image", content: heroCrest },
    ],
  }),
  component: Index,
});

function JerseyCard({ jersey }: { jersey: Jersey }) {
  const [idx, setIdx] = useState(0);
  const count = jersey.images.length;
  const go = (delta: number) => setIdx((i) => (i + delta + count) % count);

  return (
    <Link
      to="/jerseys/$jerseyId"
      params={{ jerseyId: jersey.id }}
      className="flex flex-col gap-6 text-left group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-heritage-red rounded-[min(1vw,12px)]"
    >
      <div className="relative w-full aspect-[4/5] bg-vault-surface outline-1 -outline-offset-1 outline-white/5 rounded-[min(1vw,12px)] overflow-hidden">
        <img
          src={jersey.images[idx]}
          alt={`${jersey.team} ${jersey.season} ${jersey.type} jersey — view ${idx + 1}`}
          width={1024}
          height={1280}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-full bg-black/60 text-white ring-1 ring-white/15 opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-opacity"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-full bg-black/60 text-white ring-1 ring-white/15 opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-opacity"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {jersey.images.map((_, i) => (
                <span
                  key={i}
                  className={
                    "h-1 w-4 rounded-full " +
                    (i === idx ? "bg-white" : "bg-white/30")
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-medium tracking-tight">{jersey.name}</h3>
          <span className="text-[10px] font-mono text-vault-faint uppercase whitespace-nowrap pt-1">
            {jersey.season}
          </span>
        </div>
        <p className="text-sm text-vault-muted text-pretty max-w-[48ch]">{jersey.notes}</p>
        <div className="pt-4 flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-semibold text-vault-faint border-t border-vault-line/60">
          <span>Team: {jersey.team}</span>
          <span>League: {jersey.league}</span>
          <span>Type: {jersey.type}</span>
          <span className="font-mono normal-case tracking-wider">{jersey.inventory}</span>
        </div>
      </div>
    </Link>
  );
}

function Index() {
  const [activeLeague, setActiveLeague] = useState<League>("All Leagues");

  const filtered = useMemo(
    () =>
      activeLeague === "All Leagues"
        ? jerseys
        : jerseys.filter((j) => j.league === activeLeague),
    [activeLeague],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md divide-y divide-vault-line/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display italic text-xl tracking-tight">
            Pretty Cool Jerseys
          </a>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-vault-muted font-medium">
            <a href="#collection" className="hover:text-foreground transition-colors">
              Collection
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-display italic leading-tight text-balance max-w-[20ch]">
              The 1972 Summit Series Authentics
            </h1>
            <p className="text-vault-muted text-pretty max-w-[56ch]">
              A preservation study of heavy-knit wool and chain-stitched crests. This collection
              traces the evolution of textile technology across a century of professional play.
            </p>
          </div>

          <div className="relative group">
            <img
              src={heroCrest}
              alt="Macro detail of a vintage hockey jersey crest under low light"
              width={1920}
              height={1024}
              className="w-full aspect-[21/9] object-cover bg-vault-surface outline-1 -outline-offset-1 outline-white/5 rounded-[min(1vw,12px)]"
            />
            <div className="absolute bottom-6 left-6 text-[10px] font-medium uppercase tracking-[0.15em] text-vault-faint">
              Plate No. 001 — Red Army Exhibition
            </div>
            <div className="absolute bottom-6 right-6 flex gap-4">
              <a
                href="#collection"
                className="bg-heritage-red text-white py-2 px-4 inline-flex items-center gap-2 rounded-sm text-sm font-medium ring-1 ring-heritage-red hover:bg-heritage-red/80 transition-colors"
              >
                Browse the Archive
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <section
        id="collection"
        className="py-24 bg-vault-surface/30 ring-1 ring-white/5 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-3xl font-display leading-tight">Archive Index</h2>
            <div className="flex flex-wrap gap-3">
              {leagues.map((league) => {
                const isActive = league === activeLeague;
                return (
                  <button
                    key={league}
                    onClick={() => setActiveLeague(league)}
                    className={
                      "px-4 py-2 ring-1 rounded-sm text-sm transition-colors " +
                      (isActive
                        ? "ring-heritage-red text-foreground bg-heritage-red/10"
                        : "ring-vault-line text-vault-muted hover:text-foreground")
                    }
                  >
                    {league}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-vault-muted font-display italic">
              No artifacts catalogued under this league yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filtered.map((j) => (
                <JerseyCard key={j.id} jersey={j} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-vault-line/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-vault-faint">
            © 2026 Pretty Cool Jerseys — Hockey Jersey Collection
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-vault-muted">
            <a href="#collection" className="hover:text-foreground">
              Catalog
            </a>
            <a href="#top" className="hover:text-foreground">
              Top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
