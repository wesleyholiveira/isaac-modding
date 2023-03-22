import { PlayerEffects } from "@fowp/items/player.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { Rarity } from "@shared/enums/Rarity";
import {
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { getRandomArrayElement, VectorZero } from "isaacscript-common";

export function postPickupInit(mod: Mod): void {
  const trinkets = Object.entries(PlayerEffects).filter(
    ([_, trinket]) => trinket.rarity === Rarity.GRANTED,
  );

  mod.AddCallback(
    ModCallback.POST_PICKUP_INIT,
    (pickup: EntityPickup) => {
      if (pickup.SubType === CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) {
        const { droppedItems } = FOWPState.persistent;

        if (droppedItems !== undefined && droppedItems.length < 1) {
          const [randomItem] = getRandomArrayElement(trinkets);
          const id = parseInt(randomItem, 10);
          Isaac.Spawn(
            EntityType.PICKUP,
            PickupVariant.TRINKET,
            id,
            Vector(pickup.Position.X, pickup.Position.Y + 20),
            VectorZero,
            undefined,
          );

          FOWPState.persistent.droppedItems.push({
            id,
            rarity: Rarity.GRANTED,
          });
        }
      }
    },
    PickupVariant.COLLECTIBLE,
  );
}
