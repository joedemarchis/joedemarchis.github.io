import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { jerseys } from "@/data/jerseys";

export const Route = createFileRoute("/jerseys/$jerseyId")({
  head: ({ params }) => {
    const jersey = jerseys.find((j) => j.id === params.jerseyId);
    if (!jersey) {
      return {
        meta: [
          { title: "Jersey not found — Pretty Cool Jerseys" },
          { name: "description", content: "This artifact is not in the archive." },
        ],
      };
    }
    return {
      meta: [
        { title: `${jersey.name} — ${jersey.team} ${jersey.season} | Pretty Cool Jerseys` },
        { name: "description", content: jersey.notes },
        { property: "og:title", content: `${jersey.name} — ${jersey.team} ${jersey.season}` },
        { property: "og:description", content: jersey.notes },
        { property: "og:image", content: jersey.images[0] },
        { name: "twitter:image", content: jersey.images[0] },
      ],
    };
  },
  component: JerseyDetail,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center px-6">
      <div className="max-w-md text-center space-y-6">
        <span className="inline-block px-3 py-1 ring-1 ring-vault-line rounded-full text-[10px] uppercase tracking-widest font-medium text-vault-faint">
          404 — Uncatalogued
        </span>
        <h1 className="text-4xl font-display italic leading-tight">Jersey not found</h1>
        <p className="text-vault-muted text-pretty">
          This artifact is not present in the archive. It may have been deaccessioned or the
          inventory code is incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 ring-1 ring-vault-line rounded-sm text-sm hover:text-foreground text-vault-muted transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Archive
        </Link>
      </div>
    </div>
  );
}

function JerseyDetail() {
  const { jerseyId } = Route.useParams();
  const jersey = jerseys.find((j) => j.id === jerseyId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imageCount = jersey?.images.length ?? 0;

  const goToImage = useCallback(
    (delta: number) => {
      if (imageCount < 2) return;
      setSelectedImageIndex((current) => (current + delta + imageCount) % imageCount);
    },
    [imageCount],
  );

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [jerseyId]);

  useEffect(() => {
    if (imageCount < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isEditingText =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if (event.defaultPrevented || isEditingText) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToImage(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToImage, imageCount]);

  if (!jersey) return <NotFound />;

  const selectedImage = jersey.images[selectedImageIndex] ?? jersey.images[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-vault-line/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl tracking-tight">
            Pretty Cool Jerseys
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-vault-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Archive
          </Link>
        </div>
      </nav>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-vault-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-3.5" />
            Back to Archive
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="relative group/image">
                <img
                  src={selectedImage}
                  alt={`${jersey.team} ${jersey.season} ${jersey.type} jersey view ${selectedImageIndex + 1}`}
                  width={1200}
                  height={1600}
                  className="w-full aspect-[3/4] object-cover bg-vault-surface outline-1 -outline-offset-1 outline-white/5 rounded-[min(1vw,12px)]"
                />

                {imageCount > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Show previous jersey photo"
                      onClick={() => goToImage(-1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center size-11 rounded-full bg-black/60 text-white ring-1 ring-white/15 opacity-0 transition-opacity hover:bg-black/80 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-heritage-red group-hover/image:opacity-100 group-focus-within/image:opacity-100"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                    <button
                      type="button"
                      aria-label="Show next jersey photo"
                      onClick={() => goToImage(1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center size-11 rounded-full bg-black/60 text-white ring-1 ring-white/15 opacity-0 transition-opacity hover:bg-black/80 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-heritage-red group-hover/image:opacity-100 group-focus-within/image:opacity-100"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  </>
                )}
              </div>

              {jersey.images.length > 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-vault-faint">
                      Photo Previews
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-vault-faint">
                      View {selectedImageIndex + 1} / {jersey.images.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {jersey.images.map((src, i) => {
                      const isActive = selectedImageIndex === i;
                      return (
                        <button
                          key={src}
                          type="button"
                          aria-label={`Show ${jersey.name} photo ${i + 1}`}
                          aria-pressed={isActive}
                          onClick={() => setSelectedImageIndex(i)}
                          className={
                            "group/thumb overflow-hidden rounded-[min(1vw,12px)] bg-vault-surface text-left outline-1 -outline-offset-1 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-heritage-red " +
                            (isActive
                              ? "outline-heritage-red"
                              : "outline-white/10 hover:outline-white/35")
                          }
                        >
                          <img
                            src={src}
                            alt={`${jersey.team} preview ${i + 1}`}
                            loading="lazy"
                            className="w-full aspect-square object-cover transition-transform duration-500 group-hover/thumb:scale-[1.03]"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-vault-faint uppercase tracking-widest">
                  Artifact Analysis — {jersey.inventory}
                </h4>
                <h1 className="text-4xl md:text-5xl font-display italic leading-tight">
                  {jersey.name}
                </h1>
                <p className="text-vault-muted text-pretty text-lg max-w-[40ch]">{jersey.notes}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-8 divide-x divide-vault-line/60">
                <div className="pl-0">
                  <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                    League
                  </span>
                  <span className="text-foreground">{jersey.league}</span>
                </div>
                <div className="pl-8">
                  <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                    Team
                  </span>
                  <span className="text-foreground">{jersey.team}</span>
                </div>
                <div className="pl-0">
                  <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                    Season
                  </span>
                  <span className="text-foreground">{jersey.season}</span>
                </div>
                <div className="pl-8">
                  <span className="block text-[10px] uppercase tracking-widest text-vault-faint mb-1">
                    Type
                  </span>
                  <span className="text-foreground">{jersey.type}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-vault-faint">
                  Provenance Notes
                </h4>
                <p className="text-sm text-vault-muted leading-relaxed max-w-[40ch]">
                  Wear patterns and interior tagging are documented on intake. Each artifact is
                  photographed in a climate-controlled environment and assigned an inventory code
                  referenced throughout the archive.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
