import { FOWPState } from "@fowp/states/fowpState";
import { Effects } from "@fowp/types/effects.type";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { Rarity } from "@shared/enums/Rarity";
import {
  CollectibleType,
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { getRandomArrayElement, VectorZero } from "isaacscript-common";

export function postPlayerUpdate(mod: Mod): void {
  const defaultCharge = 4;
  let lastFrame = 0;
  mod.AddCallback(ModCallback.POST_PLAYER_UPDATE, (player: EntityPlayer) => {
    const { items, invoked } = FOWPState.persistent;

    const frame = Game().GetFrameCount();
    if (frame > lastFrame) {
      FOWPState.room.stopped = false;
      lastFrame = frame;
    }

    const soulBloodCharge = player.GetSoulCharge() + player.GetBloodCharge();
    const batterySoulChargeBloodCharge =
      player.GetActiveCharge() + player.GetBatteryCharge() + soulBloodCharge;
    if (
      player.HasCollectible(
        CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
      )
    ) {
      if (batterySoulChargeBloodCharge >= defaultCharge) {
        player.RemoveCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        );

        player.AddCollectible(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
          soulBloodCharge >= defaultCharge ? 0 : batterySoulChargeBloodCharge,
        );
      }
    }

    if (
      player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) &&
      !player.HasCollectible(CollectibleType.SCHOOLBAG)
    ) {
      if (batterySoulChargeBloodCharge < defaultCharge) {
        player.RemoveCollectible(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
        );
        player.AddCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
          0,
        );
      }
      if (!invoked) {
        const trinkets = Object.entries(Effects).filter(
          ([_, trinket]) => trinket.rarity === Rarity.GRANTED,
        );
        const [randomItem] = getRandomArrayElement(trinkets);
        const id = parseInt(randomItem, 10);
        if (items !== undefined && items.length === 0) {
          Isaac.ConsoleOutput("dropou o item na primeira vez");
          Isaac.Spawn(
            EntityType.PICKUP,
            PickupVariant.TRINKET,
            id,
            Vector(player.Position.X, player.Position.Y + 20),
            VectorZero,
            undefined,
          );
          FOWPState.persistent.droppedItems.push({
            id,
            rarity: Rarity.GRANTED,
          });
          FOWPState.persistent.invoked = true;
        }
      }
    }
  });
}
