import { EffectResult } from "@shared/types";
import {
  BlueFlySubType,
  EntityType,
  FamiliarVariant,
} from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";

export function rupturedEffect(player: EntityPlayer): EffectResult {
  Isaac.Spawn(
    EntityType.FAMILIAR,
    FamiliarVariant.BLUE_FLY,
    BlueFlySubType.WRATH,
    player.Position,
    VectorZero,
    player,
  );

  return {
    charge: 0,
  };
}
