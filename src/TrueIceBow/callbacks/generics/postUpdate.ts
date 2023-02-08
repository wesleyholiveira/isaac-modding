import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { itemConfig } from "isaacscript-common";
import { Settings } from "../../config";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { playerState } from "../../states/playerState";

export function postUpdateProgressBarActiveItem(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, () =>
    main(Settings.DEFAULT_DELAY_ACTIVE_ITEM, Settings.NERF_DELAY_ACTIVE_ITEM),
  );
}

function main(defaultCharge = 110, nerfDelay = 500) {
  const player = Isaac.GetPlayer();
  const item = itemConfig.GetCollectible(CollectibleTypeCustom.TRUE_ICE_BOW);

  const { iterations } = playerState.persistent;
  const { isUsingTrueIceIceBow } = playerState.room;

  const charge = item?.MaxCharges ?? defaultCharge;
  const delay = Math.ceil(nerfDelay / 30);

  if (item !== undefined && !isUsingTrueIceIceBow) {
    if (
      player.GetActiveItem() === item.ID &&
      player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES) &&
      player.NeedsCharge()
    ) {
      const fpsPerTick = (charge * 30) / delay / 30 / 30;
      player.SetActiveCharge(Math.min(charge, Math.floor(iterations)));
      playerState.persistent.iterations += fpsPerTick;
    } else {
      playerState.persistent.iterations = 0;
    }
  }
}
