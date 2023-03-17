import { EffectResult } from "@fowp/types/effects.type";
import { getRandomInt } from "isaacscript-common";

export function ceruleanEffect(player: EntityPlayer): EffectResult {
  const chance = getRandomInt(1, 100);

  let soulHeart = 2;
  if (chance <= 50) {
    soulHeart /= 2;
  }

  player.AddSoulHearts(soulHeart);
  return {
    charge: 0,
  };
}
