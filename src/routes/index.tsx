import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroCrest from "@/assets/hero-crest.jpg";
import jerseyRangers from "@/assets/jersey-rangers.jpg";
import jerseyCanadiens from "@/assets/jersey-canadiens.jpg";
import jerseyNordiques from "@/assets/jersey-nordiques.jpg";
import jerseyUsa from "@/assets/jersey-usa.jpg";
import jerseyBlackhawks from "@/assets/jersey-blackhawks.jpg";
import jerseyPenguins from "@/assets/jersey-penguins.jpg";
import twillDetail from "@/assets/twill-detail.jpg";

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

type Era = "All Eras" | "Original Six" | "Expansion Era" | "WHA Years" | "Modern Classics";

interface Jersey {
  id: string;
  name: string;
  team: string;
  type: "Home" | "Away" | "Throwback" | "Third";
  season: string;
  inventory: string;
  era: Exclude<Era, "All Eras">;
  notes: string;
  images: string[];
}

const jerseys: Jersey[] = [
  {
    id: "nyr-85",
    name: "Empire State Classic",
    team: "Rangers",
    type: "Home",
    season: "1985-86",
    inventory: "NYR-85-H",
    era: "Modern Classics",
    notes:
      "Custom mesh build featuring the rare block-shadow lettering. Worn during the mid-eighties resurgence.",
    images: [jerseyRangers, twillDetail, heroCrest],
  },
  {
    id: "mtl-92",
    name: "Centennial Heritage",
    team: "Canadiens",
    type: "Away",
    season: "1992-93",
    inventory: "MTL-92-A",
    era: "Original Six",
    notes:
      "The final championship cut. Heavy air-knit construction with felt commemorative patches.",
    images: [jerseyCanadiens, twillDetail, heroCrest],
  },
  {
    id: "que-74",
    name: "Fleur-De-Lis Heavy",
    team: "Nordiques",
    type: "Throwback",
    season: "1974-75",
    inventory: "QUE-74-T",
    era: "WHA Years",
    notes:
      "WHA era artifact. Features the original hand-cut felt logo and wool blend sleeve stripes.",
    images: [jerseyNordiques, twillDetail, heroCrest],
  },
  {
    id: "usa-80",
    name: "Miracle Wool",
    team: "USA Olympic",
    type: "Home",
    season: "1979-80",
    inventory: "USA-80-H",
    era: "Expansion Era",
    notes:
      "Heavy-knit Olympic specimen. Acquired via secondary auction in 2014; interior tag is hand-marked.",
    images: [jerseyUsa, twillDetail, heroCrest],
  },
  {
    id: "chi-63",
    name: "Madhouse Red",
    team: "Blackhawks",
    type: "Home",
    season: "1963-64",
    inventory: "CHI-63-H",
    era: "Original Six",
    notes:
      "Chain-stitched crest with archival-grade twill stripes. The benchmark Original Six home cut.",
    images: [jerseyBlackhawks, twillDetail, heroCrest],
  },
  {
    id: "pit-92",
    name: "Robo-Pen Away",
    team: "Penguins",
    type: "Away",
    season: "1992-93",
    inventory: "PIT-92-A",
    era: "Modern Classics",
    notes:
      "Back-to-back Cup season road sweater. Heavy twill numbering with the short-lived skating penguin.",
    images: [jerseyPenguins, twillDetail, heroCrest],
  },
];

const eras: Era[] = ["All Eras", "Original Six", "Expansion Era", "WHA Years", "Modern Classics"];

function Index() {
  const [activeEra, setActiveEra] = useState<Era>("All Eras");
  const [activeId, setActiveId] = useState<string>("usa-80");

  const filtered = useMemo(
    () => (activeEra === "All Eras" ? jerseys : jerseys.filter((j) => j.era === activeEra)),
    [activeEra],
  );

  const active = jerseys.find((j) => j.id === activeId) ?? jerseys[0];

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
            <a href="#exhibit" className="hover:text-foreground transition-colors">
              Exhibitions
            </a>
            <a href="#provenance" className="hover:text-foreground transition-colors">
              Provenance
            </a>
          </div>
        </div>
        <div className="bg-vault-surface/40 py-3">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] text-vault-faint">
            <span>Active filter: {activeEra}</span>
            <span>Items: {jerseys.length}</span>
            <span className="hidden sm:inline">Location: Climate Controlled Vault</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 ring-1 ring-vault-line rounded-full text-[10px] uppercase tracking-widest font-medium text-vault-faint">
              FEATURED JERSEY
            </span>
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
                <svg
                  className="size-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
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
              {eras.map((era) => {
                const isActive = era === activeEra;
                return (
                  <button
                    key={era}
                    onClick={() => setActiveEra(era)}
                    className={
                      "px-4 py-2 ring-1 rounded-sm text-sm transition-colors " +
                      (isActive
                        ? "ring-heritage-red text-foreground bg-heritage-red/10"
                        : "ring-vault-line text-vault-muted hover:text-foreground")
                    }
                  >
                    {era}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-vault-muted font-display italic">
              No artifacts catalogued under this era — yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filtered.map((j) => (
                <JerseyCard
                  key={j.id}
                  jersey={j}
                  onSelect={() => {
                    setActiveId(j.id);
                    document.getElementById("exhibit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail / Exhibit */}
      <section id="exhibit" className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <img
              src={active.images[0]}
              alt={`${active.team} ${active.season} detail`}
              width={1200}
              height={1600}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover bg-vault-surface outline-1 -outline-offset-1 outline-white/5 rounded-[min(1vw,12px)]"
            />
          </div>
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-vault-faint uppercase tracking-widest">
                Artifact Analysis — {active.inventory}
              </h4>
              <h3 className="text-4xl font-display italic leading-tight">{active.name}</h3>
              <p className="text-vault-muted text-pretty text-lg max-w-[40ch]">{active.notes}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-8 divide-x divide-vault-line/60">
              <div className="pl-0">
                <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                  Era
                </span>
                <span className="text-foreground">{active.era}</span>
              </div>
              <div className="pl-8">
                <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                  Team
                </span>
                <span className="text-foreground">{active.team}</span>
              </div>
              <div className="pl-0">
                <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                  Season
                </span>
                <span className="text-foreground">{active.season}</span>
              </div>
              <div className="pl-8">
                <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                  Type
                </span>
                <span className="text-foreground">{active.type}</span>
              </div>
            </div>

            <div id="provenance" className="space-y-6 scroll-mt-24">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-vault-faint">
                Provenance Notes
              </h4>
              <p className="text-sm text-vault-muted leading-relaxed max-w-[40ch]">
                Wear patterns and interior tagging are documented on intake. Each artifact is
                photographed in a climate-controlled environment and assigned an inventory code
                referenced throughout the archive.
              </p>
              <img
                src={twillDetail}
                alt="Macro twill stitching detail"
                width={1200}
                height={1600}
                loading="lazy"
                className="w-full aspect-[3/2] object-cover rounded-[min(1vw,12px)] outline-1 -outline-offset-1 outline-white/5"
              />
            </div>
          </div>
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
            <a href="#provenance" className="hover:text-foreground">
              Provenance
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
