import heroCrest from "@/assets/hero-crest.jpg";
import jerseyUsa from "@/assets/jersey-usa.jpg";
import twillDetail from "@/assets/twill-detail.jpg";
import type { Jersey } from "../../../../types";

export const miracleWool: Jersey = {
  id: "usa-80",
  name: "Miracle Wool",
  team: "USA Olympic",
  player: "Team Issued",
  type: "Home",
  season: "1979-80",
  inventory: "USA-80-H",
  league: "NHL",
  notes:
    "Heavy-knit Olympic specimen. Acquired via secondary auction in 2014; interior tag is hand-marked.",
  description:
    "A USA Olympic home record that keeps auction notes, the primary jersey photo, detail photography, and the collection crest together. Future provenance notes can be expanded here without touching the page code.",
  imageAlt: "USA Olympic home jersey laid flat on a dark surface",
  images: [jerseyUsa, twillDetail, heroCrest],
};
