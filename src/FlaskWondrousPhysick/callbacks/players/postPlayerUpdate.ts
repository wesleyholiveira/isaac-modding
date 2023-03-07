import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import {
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { getRandomArrayElement, VectorZero } from "isaacscript-common";

export function postPlayerUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_UPDATE, (player: EntityPlayer) => {
    const { items, invoked } = FOWPState.persistent;

    if (
      player.HasCollectible(
        CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
      )
    ) {
      if (!player.NeedsCharge()) {
        player.RemoveCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        );
        player.AddCollectible(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
          4,
        );
      }
    }

    if (
      player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK)
    ) {
      if (player.NeedsCharge()) {
        player.RemoveCollectible(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
        );
        player.AddCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
          0,
        );
      }

      if (items !== undefined && items.length === 0 && !invoked) {
        Isaac.Spawn(
          EntityType.PICKUP,
          PickupVariant.TRINKET,
          getRandomArrayElement(Object.values(TrinketTypeCustom)),
          Vector(player.Position.X, player.Position.Y + 20),
          VectorZero,
          undefined,
        );
        FOWPState.persistent.invoked = true;
      }
    }
  });
}
