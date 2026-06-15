import { fleurDeLisHeavy } from "./chl/nordiques/team-issued/throwback";
import { madhouseRed } from "./ncaa/blackhawks/team-issued/home";
import { centennialHeritage } from "./ncaa/canadiens/team-issued/away";
import { roboPenAway } from "./nhl/penguins/team-issued/away";
import { empireStateClassic } from "./nhl/rangers/team-issued/home";
import { miracleWool } from "./nhl/usa-olympic/team-issued/home";
import type { Jersey, League } from "./types";

export type { Jersey, JerseyLeague, JerseyStyle, League } from "./types";

export const leagues: League[] = ["All Leagues", "NCAA", "NHL", "CHL"];

export const jerseys: Jersey[] = [
  empireStateClassic,
  centennialHeritage,
  fleurDeLisHeavy,
  miracleWool,
  madhouseRed,
  roboPenAway,
];

export const getJerseyById = (jerseyId: string) =>
  jerseys.find((jersey) => jersey.id === jerseyId);

export { default as heroCrest } from "@/assets/hero-crest.jpg";
export { default as twillDetail } from "@/assets/twill-detail.jpg";
