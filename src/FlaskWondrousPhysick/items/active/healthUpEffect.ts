import { EffectResult } from "@shared/types";

export function healthUpEffect(player: EntityPlayer): EffectResult {
  player.AddHearts(1 * 2);
  return {
    charge: 0,
  };
}
