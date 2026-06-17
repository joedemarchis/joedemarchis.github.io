import crottyHomeBack from "@/assets/jerseys/nhl/arizona-coyotes/cam-crotty/home/GrottyHomeBack.webp";
import crottyHomeFront from "@/assets/jerseys/nhl/arizona-coyotes/cam-crotty/home/GrottyHomeFront.webp";
import type { Jersey } from "../../../../types";

export const camCrottyHome: Jersey = {
  id: "ari-crotty-home",
  name: "Cam Crotty Home",
  team: "Arizona Coyotes",
  player: "Cam Crotty",
  type: "Home",
  season: "Unknown",
  inventory: "ARI-CROTTY-H",
  league: "NHL",
  notes:
    "Arizona Coyotes home jersey for Cam Crotty, documented with front and back photo references.",
  description:
    "A Cam Crotty Arizona Coyotes home record added from the supplied front and back photos. The front image is first for the collection card, while the back image documents the Crotty nameplate and number 95.",
  imageAlt: "Arizona Coyotes Cam Crotty home jersey front and back photo set",
  images: [crottyHomeFront, crottyHomeBack],
};
