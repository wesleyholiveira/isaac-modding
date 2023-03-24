import { Settings } from "@shared/config";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { NullItemIdTypeCustom } from "@shared/enums/NullItemIdTypeCustom";
import { trueIceBowEffect } from "@tib/items/active/effect";
import { TibState } from "@tib/states/tibState";
import {
  ModCallback,
  NullItemID,
  PlayerItemAnimation,
} from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function postPlayerUpdate(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_PLAYER_UPDATE,
    postUpdateUsingTrueIceBowCallback,
  );
}

/**
 * Método responsável por cuidar do intercâmbio de animações extras do jogador (andar, ficar parado.
 *
 * @param player Parâmetro que contém a entidade do jogador para manipular as animações.
 */
function postUpdateUsingTrueIceBowCallback(player: EntityPlayer) {
  const playerID = getPlayerIndex(player, true);
  const currentFrame = Game().GetFrameCount();
  const { player: playerState } = TibState.persistent;
  const state = playerState[playerID];

  if (state !== undefined) {
    const { isUsingTrueIceIceBow, currentFrame: frameFromState } = state;
    // Adiciona/remove costume quando o item for adicionado no "inventário".
    addAndRemoveCostumeOnPickupCollectible(
      player,
      NullItemIdTypeCustom.TRUE_ICE_BOW_COSTUME,
    );

    if (isUsingTrueIceIceBow) {
      if (
        currentFrame > frameFromState + 10 &&
        player.GetShootingJoystick().Length() > 0.1
      ) {
        const { TrueIceBow } = Settings;
        player.AnimateCollectible(
          CollectibleTypeCustom.TRUE_ICE_BOW,
          PlayerItemAnimation.HIDE_ITEM,
        );

        player.DischargeActiveItem();

        state.isUsingTrueIceIceBow = false;
        state.transientState = true;
        state.currentFrame = currentFrame;

        trueIceBowEffect(
          player,
          TrueIceBow.FOV_ANGLE,
          TrueIceBow.TEARS_DEFAULT,
          TrueIceBow.TEARS_CAP,
          TrueIceBow.SHOOT_SPEED,
        );
      }
    }
  }
}

function addAndRemoveCostumeOnPickupCollectible(
  player: EntityPlayer,
  costumeId: NullItemID,
) {
  const playerID = getPlayerIndex(player);
  const { player: playerState } = TibState.persistent;
  const state = playerState[playerID];

  if (state !== undefined) {
    const { collectedItem } = state;

    if (player.HasCollectible(CollectibleTypeCustom.TRUE_ICE_BOW)) {
      if (!collectedItem) {
        player.AddNullCostume(costumeId);
        state.collectedItem = true;
      }
    } else {
      player.TryRemoveNullCostume(costumeId);
      state.collectedItem = false;
    }
  }
}
