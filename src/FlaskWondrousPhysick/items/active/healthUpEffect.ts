import { EffectResult } from "@fowp/types/effects.type";

export function healthUpEffect(player: EntityPlayer): EffectResult {
  player.AddHearts(1 * 2);
  return {
    charge: 0,
  };
}
