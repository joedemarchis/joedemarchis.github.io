import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
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
    links: [
      { rel: "preload", as: "image", href: heroCrest, fetchpriority: "high" },
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
      <div className="relative w-full aspect-[4/5] bg-vault-surface outline-1 -outline-offset-1 outline-vault-text/5 rounded-[min(1vw,12px)] overflow-hidden">
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

function getSeasonYear(season: string): number {
  const match = season.match(/(\d{4})/);
  if (match) return parseInt(match[1], 10);
  return 0;
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function Index() {
  const [activeLeague, setActiveLeague] = useState<League>("All Leagues");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [seasonFilter, setSeasonFilter] = useState("All Seasons");
  const [searchTerm, setSearchTerm] = useState("");
  type SortField = "default" | "season" | "team" | "player";
  const [sortBy, setSortBy] = useState<SortField>("default");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [sortBy2, setSortBy2] = useState<SortField>("default");
  const [sortDir2, setSortDir2] = useState<"asc" | "desc">("asc");

  const isLeagueSelected = activeLeague !== "All Leagues";

  const leagueItems = useMemo(
    () =>
      isLeagueSelected ? jerseys.filter((j) => j.league === activeLeague) : jerseys,
    [activeLeague, isLeagueSelected],
  );

  const teamOptions = useMemo(
    () => uniqueSorted(leagueItems.map((j) => j.team)),
    [leagueItems],
  );
  const typeOptions = useMemo(
    () => uniqueSorted(leagueItems.map((j) => j.type)),
    [leagueItems],
  );
  const seasonOptions = useMemo(
    () => uniqueSorted(leagueItems.map((j) => j.season)).reverse(),
    [leagueItems],
  );

  useEffect(() => {
    setTeamFilter("All Teams");
    setTypeFilter("All Types");
    setSeasonFilter("All Seasons");
    setSearchTerm("");
  }, [activeLeague]);

  const filtered = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const result = leagueItems.filter((jersey) => {
      const matchesTeam = teamFilter === "All Teams" || jersey.team === teamFilter;
      const matchesType = typeFilter === "All Types" || jersey.type === typeFilter;
      const matchesSeason = seasonFilter === "All Seasons" || jersey.season === seasonFilter;
      const searchableText = [
        jersey.name,
        jersey.team,
        jersey.player,
        jersey.type,
        jersey.season,
        jersey.inventory,
        jersey.notes,
        jersey.description,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesTeam && matchesType && matchesSeason && matchesSearch;
    });

    const compare = (a: Jersey, b: Jersey, field: SortField) => {
      if (field === "team") return a.team.localeCompare(b.team);
      if (field === "player") return a.player.localeCompare(b.player);
      if (field === "season") return getSeasonYear(a.season) - getSeasonYear(b.season);
      return 0;
    };

    if (sortBy === "default") return result;

    const dir1 = sortDir === "asc" ? 1 : -1;
    const dir2 = sortDir2 === "asc" ? 1 : -1;
    return [...result].sort((a, b) => {
      const primary = compare(a, b, sortBy) * dir1;
      if (primary !== 0 || sortBy2 === "default" || sortBy2 === sortBy) return primary;
      return compare(a, b, sortBy2) * dir2;
    });
  }, [leagueItems, searchTerm, seasonFilter, teamFilter, typeFilter, sortBy, sortDir, sortBy2, sortDir2]);

  const hasAdvancedFilters =
    teamFilter !== "All Teams" ||
    typeFilter !== "All Types" ||
    seasonFilter !== "All Seasons" ||
    searchTerm.trim().length > 0;

  const clearAdvancedFilters = () => {
    setTeamFilter("All Teams");
    setTypeFilter("All Types");
    setSeasonFilter("All Seasons");
    setSearchTerm("");
  };

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
              className="w-full aspect-[21/9] object-cover bg-vault-surface outline-1 -outline-offset-1 outline-vault-text/5 rounded-[min(1vw,12px)]"
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
        className="py-24 bg-vault-surface/30 ring-1 ring-vault-text/5 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-8 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-display leading-tight">Archive Index</h2>
                <p className="text-sm text-vault-muted">
                  {filtered.length} of {leagueItems.length} jerseys shown
                </p>
              </div>
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

              <div className="border-y border-vault-line/60 py-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
                  <label className="flex flex-1 min-w-[220px] flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                    Search
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Name, team, season, code"
                      className="h-11 rounded-sm bg-background px-3 text-sm normal-case tracking-normal text-foreground ring-1 ring-vault-line outline-none transition-colors placeholder:text-vault-faint focus:ring-heritage-red"
                    />
                  </label>

                  <label className="flex min-w-[160px] flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                    Team
                    <select
                      value={teamFilter}
                      onChange={(event) => setTeamFilter(event.target.value)}
                      className="h-11 rounded-sm bg-background px-3 text-sm normal-case tracking-normal text-foreground ring-1 ring-vault-line outline-none transition-colors focus:ring-heritage-red"
                    >
                      <option>All Teams</option>
                      {teamOptions.map((team) => (
                        <option key={team}>{team}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex min-w-[150px] flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                    Type
                    <select
                      value={typeFilter}
                      onChange={(event) => setTypeFilter(event.target.value)}
                      className="h-11 rounded-sm bg-background px-3 text-sm normal-case tracking-normal text-foreground ring-1 ring-vault-line outline-none transition-colors focus:ring-heritage-red"
                    >
                      <option>All Types</option>
                      {typeOptions.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex min-w-[160px] flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                    Season
                    <select
                      value={seasonFilter}
                      onChange={(event) => setSeasonFilter(event.target.value)}
                      className="h-11 rounded-sm bg-background px-3 text-sm normal-case tracking-normal text-foreground ring-1 ring-vault-line outline-none transition-colors focus:ring-heritage-red"
                    >
                      <option>All Seasons</option>
                      {seasonOptions.map((season) => (
                        <option key={season}>{season}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex min-w-[140px] flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                    Sort
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value as SortField)}
                      className="h-11 rounded-sm bg-background px-3 text-sm normal-case tracking-normal text-foreground ring-1 ring-vault-line outline-none transition-colors focus:ring-heritage-red"
                    >
                      <option value="default">Default</option>
                      <option value="season">Season</option>
                      <option value="team">Team</option>
                      <option value="player">Player</option>
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                    title={sortDir === "asc" ? "Ascending" : "Descending"}
                    disabled={sortBy === "default"}
                    className="h-11 w-11 grid place-items-center rounded-sm ring-1 ring-vault-line text-vault-muted hover:text-foreground hover:ring-heritage-red transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowUpDown className="size-4" />
                  </button>

                  <label className="flex min-w-[140px] flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                    Then by
                    <select
                      value={sortBy2}
                      onChange={(event) => setSortBy2(event.target.value as SortField)}
                      disabled={sortBy === "default"}
                      className="h-11 rounded-sm bg-background px-3 text-sm normal-case tracking-normal text-foreground ring-1 ring-vault-line outline-none transition-colors focus:ring-heritage-red disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <option value="default">None</option>
                      {sortBy !== "season" && <option value="season">Season</option>}
                      {sortBy !== "team" && <option value="team">Team</option>}
                      {sortBy !== "player" && <option value="player">Player</option>}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => setSortDir2((d) => (d === "asc" ? "desc" : "asc"))}
                    title={sortDir2 === "asc" ? "Ascending" : "Descending"}
                    disabled={sortBy === "default" || sortBy2 === "default"}
                    className="h-11 w-11 grid place-items-center rounded-sm ring-1 ring-vault-line text-vault-muted hover:text-foreground hover:ring-heritage-red transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowUpDown className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={clearAdvancedFilters}
                    disabled={!hasAdvancedFilters}
                    className="h-11 px-4 rounded-sm text-sm ring-1 ring-vault-line text-vault-muted transition-colors enabled:hover:text-foreground enabled:hover:ring-heritage-red disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-vault-muted font-display italic">
              No artifacts match those filters yet.
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
