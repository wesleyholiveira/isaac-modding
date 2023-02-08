import {
  ModCallback,
  NullItemID,
  PlayerItemAnimation,
} from "isaac-typescript-definitions";
import { Settings } from "../../config";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { NullItemIdTypeCustom } from "../../enums/NullItemIdTypeCustom";
import { trueIceBowEffect } from "../../items/active/effect";
import { playerState } from "../../states/playerState";

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
  const currentFrame = Game().GetFrameCount();

  // Adiciona/remove costume quando o item for adicionado no "inventário".
  addAndRemoveCostumeOnPickupCollectible(
    player,
    NullItemIdTypeCustom.TRUE_ICE_BOW_COSTUME,
    playerState.persistent.collectedItem,
  );

  if (playerState.room.isUsingTrueIceIceBow) {
    const twinPlayer = player.GetMainTwin();

    if (
      currentFrame > playerState.room.currentFrame + 10 &&
      player.GetShootingJoystick().Length() > 0.1
    ) {
      player.AnimateCollectible(
        CollectibleTypeCustom.TRUE_ICE_BOW,
        PlayerItemAnimation.HIDE_ITEM,
      );

      twinPlayer.DischargeActiveItem();

      playerState.room.isUsingTrueIceIceBow = false;
      playerState.room.transientState = true;
      playerState.room.currentFrame = currentFrame;

      trueIceBowEffect(
        player,
        Settings.FOV_ANGLE,
        Settings.TRUE_ICE_TEARS_DEFAULT,
        Settings.TRUE_ICE_TEARS_CAP,
        Settings.TRUE_ICE_SHOOT_SPEED,
      );
    }
  }
}

function addAndRemoveCostumeOnPickupCollectible(
  player: EntityPlayer,
  costumeId: NullItemID,
  collectedItem: boolean,
) {
  if (player.HasCollectible(CollectibleTypeCustom.TRUE_ICE_BOW)) {
    if (!collectedItem) {
      player.AddNullCostume(costumeId);
      player.SetSoulCharge(0);
      playerState.persistent.collectedItem = true;
    }
  } else {
    player.TryRemoveNullCostume(costumeId);
    playerState.persistent.collectedItem = false;
  }
}
