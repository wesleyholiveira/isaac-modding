import { EffectResult } from "@shared/types";
import { TearFlag } from "isaac-typescript-definitions";
import { ColorDefault } from "isaacscript-common";

export function rupturedEffect(player: EntityPlayer): EffectResult {
  Game().BombExplosionEffects(
    player.Position,
    player.Damage,
    TearFlag.NORMAL,
    ColorDefault,
    undefined,
    1,
    false,
    false,
  );

  return {
    charge: 0,
  };
}
