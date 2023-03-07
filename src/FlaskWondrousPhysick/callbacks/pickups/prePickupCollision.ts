import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import {
  EntityType,
  ModCallback,
  PickupVariant,
  TrinketType,
} from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";

export function prePickupCollision(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    main,
    PickupVariant.TRINKET,
  );
}

export function main(
  pickup: EntityPickup,
  collider: Entity,
): boolean | undefined {
  const { items } = FOWPState.persistent;
  const player = collider.ToPlayer();

  if (player !== undefined && items !== undefined) {
    const crystalTrinkets = Object.values(TrinketTypeCustom)
      .sort()
      .map((trinket: number, index: number) => ({
        trinket,
        index,
      }))
      .filter((value: any) => value.trinket === pickup.SubType);

    if (crystalTrinkets !== undefined) {
      const crystalTrinket = crystalTrinkets[0]?.trinket;

      if (crystalTrinket !== undefined) {
        if (items.length < Settings.FlaskWondrousPhysick.MAX_SLOTS) {
          player.AnimateTrinket(crystalTrinket as TrinketType);
          items.push({
            index: (crystalTrinkets[0]?.index ?? -1) + 1,
            trinket: crystalTrinket,
          });

          pickup.Remove();
        } else {
          const firstSlotItem = items[0];
          if (firstSlotItem !== undefined) {
            items.shift();
            Isaac.Spawn(
              EntityType.PICKUP,
              PickupVariant.TRINKET,
              firstSlotItem.trinket,
              Vector(player.Position.X, player.Position.Y + 12),
              VectorZero,
              collider,
            );
          }
        }

        return true;
      }
    }
  }

  return undefined;
}
