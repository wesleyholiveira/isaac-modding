import { EffectResult } from "@fowp/types/effects.type";
import { CollectibleType } from "isaac-typescript-definitions";

export function holyMantleEffect(player: EntityPlayer): EffectResult {
  const effect = player.GetEffects();

  effect.AddCollectibleEffect(CollectibleType.HOLY_MANTLE);
  return {
    charge: 0,
  };
}
