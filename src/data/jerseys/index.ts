import type { Jersey, League } from "./types";

export type { Jersey, JerseyLeague, JerseyStyle, League } from "./types";

export const leagues: League[] = ["All Leagues", "NCAA", "NHL"];

export const jerseys: Jersey[] = [];

export const getJerseyById = (jerseyId: string) =>
  jerseys.find((jersey) => jersey.id === jerseyId);

export { default as heroCrest } from "@/assets/hero-crest.jpg";
