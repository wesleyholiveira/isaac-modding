import { WispEffects } from "@fowp/items/wisp.effects";
import { ColorDefault, colorEquals } from "isaacscript-common";

export const Color2ID = (color: Color) =>
  Object.entries(WispEffects)
    .filter(([, { color: c }]) => colorEquals(c ?? ColorDefault, color))
    .map(([trinket, _]) => parseInt(trinket, 10))[0]!;
