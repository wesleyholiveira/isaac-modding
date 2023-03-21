import { EffectResult } from "@shared/types";
import {
  EntityType,
  HeartSubType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";

export function ceruleanEffect(player: EntityPlayer): EffectResult {
  Isaac.Spawn(
    EntityType.PICKUP,
    PickupVariant.HEART,
    HeartSubType.HALF_SOUL,
    player.Position.add(Vector(0, 20)),
    VectorZero,
    undefined,
  );

  return {
    charge: 0,
  };
}
