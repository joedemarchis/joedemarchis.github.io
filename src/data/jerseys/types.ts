export type League = "All Leagues" | "NCAA" | "NHL" | "CHL";
export type JerseyLeague = Exclude<League, "All Leagues">;
export type JerseyStyle = "Home" | "Away" | "Throwback" | "Third";

export interface Jersey {
  id: string;
  name: string;
  team: string;
  player: string;
  type: JerseyStyle;
  season: string;
  inventory: string;
  league: JerseyLeague;
  notes: string;
  description: string;
  imageAlt: string;
  images: string[];
}
