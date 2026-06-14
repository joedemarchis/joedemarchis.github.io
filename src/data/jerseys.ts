import heroCrest from "@/assets/hero-crest.jpg";
import jerseyRangers from "@/assets/jersey-rangers.jpg";
import jerseyCanadiens from "@/assets/jersey-canadiens.jpg";
import jerseyNordiques from "@/assets/jersey-nordiques.jpg";
import jerseyUsa from "@/assets/jersey-usa.jpg";
import jerseyBlackhawks from "@/assets/jersey-blackhawks.jpg";
import jerseyPenguins from "@/assets/jersey-penguins.jpg";
import twillDetail from "@/assets/twill-detail.jpg";

export type Era = "All Leagues" | "NCAA" | "NHL" | "CHL" | "";

export interface Jersey {
  id: string;
  name: string;
  team: string;
  type: "Home" | "Away" | "Throwback" | "Third";
  season: string;
  inventory: string;
  era: Exclude<Era, "All Leagues">;
  notes: string;
  images: string[];
}

export const eras: Era[] = ["All Leagues", "NCAA", "NHL", "CHL", ""];

export const jerseys: Jersey[] = [
  {
    id: "nyr-85",
    name: "Empire State Classic",
    team: "Rangers",
    type: "Home",
    season: "1985-86",
    inventory: "NYR-85-H",
    era: "",
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
    era: "NCAA",
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
    era: "CHL",
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
    era: "NHL",
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
    era: "NCAA",
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
    era: "",
    notes:
      "Back-to-back Cup season road sweater. Heavy twill numbering with the short-lived skating penguin.",
    images: [jerseyPenguins, twillDetail, heroCrest],
  },
];

export { twillDetail, heroCrest };
