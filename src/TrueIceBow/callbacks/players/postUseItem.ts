import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TibState } from "@tib/states/tibState";
import {
  CollectibleAnimation,
  CollectibleType,
  ModCallback,
  PlayerItemAnimation,
} from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

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
  const playerID = getPlayerIndex(player, true);
  const defaultReturn = { Discharge: false, ShowAnim: false, Remove: false };
  const { player: statePlayer } = TibState.persistent;
  const state = statePlayer[playerID];

  if (state !== undefined) {
    const { isUsingTrueIceIceBow } = state;
    if (!isUsingTrueIceIceBow) {
      player.AnimateCollectible(
        collectibleType,
        PlayerItemAnimation.LIFT_ITEM,
        CollectibleAnimation.PLAYER_PICKUP_SPARKLE,
      );

      state.isUsingTrueIceIceBow = true;
      state.currentFrame = Game().GetFrameCount();
      return defaultReturn;
    }

    player.AnimateCollectible(
      collectibleType,
      PlayerItemAnimation.HIDE_ITEM,
      CollectibleAnimation.PLAYER_PICKUP_SPARKLE,
    );

    state.isUsingTrueIceIceBow = false;
    TibState.persistent.playerID = getPlayerIndex(player);
  }
  return defaultReturn;
}
