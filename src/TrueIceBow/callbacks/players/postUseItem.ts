import {
  CollectibleAnimation,
  CollectibleType,
  ModCallback,
  PlayerItemAnimation,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { playerState } from "../../states/playerState";

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
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
) {
  const defaultReturn = { Discharge: false, ShowAnim: false, Remove: false };
  const { isUsingTrueIceIceBow } = playerState.room;

  if (!isUsingTrueIceIceBow) {
    player.AnimateCollectible(
      CollectibleTypeCustom.TRUE_ICE_BOW,
      PlayerItemAnimation.LIFT_ITEM,
      CollectibleAnimation.PLAYER_PICKUP_SPARKLE,
    );

    playerState.room.isUsingTrueIceIceBow = true;

    return defaultReturn;
  }

  player.AnimateCollectible(
    CollectibleTypeCustom.TRUE_ICE_BOW,
    PlayerItemAnimation.HIDE_ITEM,
    CollectibleAnimation.PLAYER_PICKUP_SPARKLE,
  );

  playerState.room.isUsingTrueIceIceBow = false;
  return defaultReturn;
}
