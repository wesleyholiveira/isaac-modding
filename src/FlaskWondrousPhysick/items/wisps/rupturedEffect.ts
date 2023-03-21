import { EffectResult } from "@shared/types";
import { CollectibleType, TearFlag } from "isaac-typescript-definitions";
import { ColorDefault } from "isaacscript-common";

export function rupturedEffect(player: EntityPlayer): EffectResult {
  if (!player.GetEffects().HasCollectibleEffect(CollectibleType.HOLY_MANTLE)) {
    player.AddHearts(-1);
  }

  Game().BombExplosionEffects(
    player.Position,
    player.Damage,
    TearFlag.NORMAL,
    ColorDefault,
    undefined,
    2,
    false,
    false,
  );

  return {
    charge: 0,
  };
}
