import { EffectResult } from "@fowp/types/effects.type";

export function ceruleanEffect(player: EntityPlayer): EffectResult {
  player.AddSoulHearts(2);
  return {
    charge: 0,
  };
}
