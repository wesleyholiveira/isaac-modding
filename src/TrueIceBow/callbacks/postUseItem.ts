import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { playerState } from "../states/playerState";

// Método principal para registrar os callbacks.
export function postUseItem(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    postUseTrueIceBowCallback,
    CollectibleTypeCustom["TRUE_ICE_BOW"],
  );
}

// Método responsável por manipular a animação de "item utilizado".
function postUseTrueIceBowCallback(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
) {
  const twinPlayer = player.GetOtherTwin();
  const defaultReturn = { Discharge: false, ShowAnim: false, Remove: false };
  const { isUsingTrueIceIceBow } = playerState.room;

  if (!isUsingTrueIceIceBow) {
    player.PlayExtraAnimation("LiftItem");
    twinPlayer?.PlayExtraAnimation("LiftItem");
    playerState.room.isUsingTrueIceIceBow = true;

    return defaultReturn;
  }

  player.StopExtraAnimation();
  twinPlayer?.StopExtraAnimation();
  player.PlayExtraAnimation("HideItem");
  twinPlayer?.PlayExtraAnimation("HideItem");

  playerState.room.isUsingTrueIceIceBow = false;
  return defaultReturn;
}
