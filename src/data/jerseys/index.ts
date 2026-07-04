import { willieKnierim1972Retro } from "./ncaa/arizona-state-sun-devils/willie-knierim/1972retro";
import { tuckerNessMaroon } from "./ncaa/arizona-state-sun-devils/tucker-ness/home";
import { camCrottyHome } from "./nhl/arizona-coyotes/cam-crotty/home";
import type { Jersey, League } from "./types";

export type { Jersey, JerseyLeague, JerseyStyle, League } from "./types";

export const leagues: League[] = ["All Leagues", "NCAA", "NHL"];

export const jerseys: Jersey[] = [
  willieKnierim1972Retro,
  tuckerNessMaroon,
  camCrottyHome,
];

export const getJerseyById = (jerseyId: string) =>
  jerseys.find((jersey) => jersey.id === jerseyId);

export { default as heroCrest } from "@/assets/hero-crest.jpg";
export { default as twillDetail } from "@/assets/twill-detail.jpg";
