import { Settings } from "@shared/config";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TibState } from "@tib/states/tibState";
import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { itemConfig } from "isaacscript-common";

// Unused
export function postUpdateProgressBarActiveItem(mod: Mod): void {
  const { TrueIceBow } = Settings;
  mod.AddCallback(ModCallback.POST_UPDATE, () =>
    main(
      TrueIceBow.DEFAULT_DELAY_ACTIVE_ITEM,
      TrueIceBow.NERF_DELAY_ACTIVE_ITEM,
    ),
  );
}

function main(defaultCharge = 110, nerfDelay = 500) {
  const player = Isaac.GetPlayer();
  const item = itemConfig.GetCollectible(CollectibleTypeCustom.TRUE_ICE_BOW);

  const { fpsPerTick } = TibState.persistent;
  const { isUsingTrueIceIceBow } = TibState.room;

  const charge = item?.MaxCharges ?? defaultCharge;
  const delay = Math.ceil(nerfDelay / 30);

  if (item !== undefined && !isUsingTrueIceIceBow) {
    if (
      player.GetActiveItem() === item.ID &&
      player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES) &&
      player.NeedsCharge()
    ) {
      const fpsPerTickCalc = charge / delay / 30;
      player.SetActiveCharge(Math.min(charge, Math.floor(fpsPerTick)));
      TibState.persistent.fpsPerTick += fpsPerTickCalc;
    } else {
      TibState.persistent.fpsPerTick = 0;
    }
  }
}
