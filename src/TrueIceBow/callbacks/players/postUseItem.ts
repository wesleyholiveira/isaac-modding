import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TibState } from "@tib/states/tibState";
import {
  CollectibleAnimation,
  CollectibleType,
  ModCallback,
  PlayerItemAnimation,
} from "isaac-typescript-definitions";

// Método principal para registrar os callbacks.
export function postUseItem(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    postUseTrueIceBowCallback,
    CollectibleTypeCustom.TRUE_ICE_BOW,
  );
}

// Método responsável por manipular a animação de "item utilizado".
function postUseTrueIceBowCallback(
  collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
) {
  const defaultReturn = { Discharge: false, ShowAnim: false, Remove: false };
  const { isUsingTrueIceIceBow } = TibState.room;

  if (!isUsingTrueIceIceBow) {
    player.AnimateCollectible(
      collectibleType,
      PlayerItemAnimation.LIFT_ITEM,
      CollectibleAnimation.PLAYER_PICKUP_SPARKLE,
    );

    TibState.room.isUsingTrueIceIceBow = true;
    TibState.room.currentFrame = Game().GetFrameCount();
    return defaultReturn;
  }

  player.AnimateCollectible(
    collectibleType,
    PlayerItemAnimation.HIDE_ITEM,
    CollectibleAnimation.PLAYER_PICKUP_SPARKLE,
  );

  TibState.room.isUsingTrueIceIceBow = false;
  return defaultReturn;
}
