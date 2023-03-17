import { FOWPState } from "@fowp/states/fowpState";
import { Effects } from "@fowp/types/effects.type";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { Rarity } from "@shared/enums/Rarity";
import {
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { getRandomArrayElement, VectorZero } from "isaacscript-common";

export function postPickupInit(mod: Mod): void {
  const trinkets = Object.entries(Effects).filter(
    ([_, trinket]) => trinket.rarity === Rarity.GRANTED,
  );

  mod.AddCallback(
    ModCallback.POST_PICKUP_INIT,
    (pickup: EntityPickup) => {
      if (pickup.SubType === CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) {
        const { items } = FOWPState.persistent;

        Isaac.ConsoleOutput(`Items: ${items?.length}`);
        if (items !== undefined && items.length < 1) {
          const [randomItem] = getRandomArrayElement(trinkets);
          const id = parseInt(randomItem, 10);
          Isaac.ConsoleOutput("dropou o item na primeira vez");
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
