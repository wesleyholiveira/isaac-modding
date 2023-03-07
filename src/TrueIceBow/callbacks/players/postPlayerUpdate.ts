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
    TibState.persistent.collectedItem,
  );

  if (TibState.room.isUsingTrueIceIceBow) {
    const twinPlayer = player.GetMainTwin();

    if (
      currentFrame > TibState.room.currentFrame + 10 &&
      player.GetShootingJoystick().Length() > 0.1
    ) {
      const { TrueIceBow } = Settings;
      player.AnimateCollectible(
        CollectibleTypeCustom.TRUE_ICE_BOW,
        PlayerItemAnimation.HIDE_ITEM,
      );

      twinPlayer.DischargeActiveItem();

      TibState.room.isUsingTrueIceIceBow = false;
      TibState.room.transientState = true;
      TibState.room.currentFrame = currentFrame;

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

function addAndRemoveCostumeOnPickupCollectible(
  player: EntityPlayer,
  costumeId: NullItemID,
  collectedItem: boolean,
) {
  if (player.HasCollectible(CollectibleTypeCustom.TRUE_ICE_BOW)) {
    if (!collectedItem) {
      player.AddNullCostume(costumeId);
      TibState.persistent.collectedItem = true;
    }
  } else {
    player.TryRemoveNullCostume(costumeId);
    TibState.persistent.collectedItem = false;
  }
}
