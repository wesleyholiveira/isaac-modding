import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { itemConfig } from "isaacscript-common";

export function postEffectUpdate(mod: Mod): void {
  const defaultCharge =
    itemConfig.GetCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK)
      ?.MaxCharges ?? 4;

  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, (player: EntityPlayer) => {
    const frame = Game().GetFrameCount();

    const { frameCount } = FOWPState.persistent;

    if (frame > frameCount) {
      FOWPState.persistent.stopped = false;
      FOWPState.persistent.frameCount = frame;
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
          soulBloodCharge >= defaultCharge
            ? 0
            : batterySoulChargeBloodCharge - soulBloodCharge,
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
    }
  });
}
