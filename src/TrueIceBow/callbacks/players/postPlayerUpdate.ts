import {
  Direction,
  ModCallback,
  NullItemID,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { NullItemIdTypeCustom } from "../../enums/NullItemIdTypeCustom";
import { trueIceBowEffect } from "../../items/active/effect";
import { playerState } from "../../states/playerState";

const MovementDirections = {
  [Direction.UP]: "WalkUp",
  [Direction.DOWN]: "WalkDown",
  [Direction.LEFT]: "WalkLeft",
  [Direction.RIGHT]: "WalkRight",
  [Direction.NO_DIRECTION]: "WalkDown",
} as const;

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
    const sprite = player.GetSprite();
    const animation = sprite.GetAnimation();
    const currentDirection = player.GetMovementDirection();
    const twinPlayer = player.GetMainTwin();

    if (animation !== "LiftItem") {
      if (
        playerState.room.currentDirection !== currentDirection ||
        currentFrame > playerState.room.currentFrame + 20 ||
        currentDirection === Direction.NO_DIRECTION
      ) {
        const movementAnimation = MovementDirections[currentDirection];

        if (twinPlayer.SubType === player.SubType) {
          player.PlayExtraAnimation(`Pickup${movementAnimation}`);
        }

        playerState.room.currentFrame = currentFrame;
        playerState.room.currentDirection = currentDirection;
      }

      if (player.GetShootingJoystick().Length() > 0.0) {
        player.StopExtraAnimation();
        twinPlayer.DischargeActiveItem();

        playerState.room.isUsingTrueIceIceBow = false;
        playerState.room.transientState = true;

        trueIceBowEffect(player);
      }
    }

    playerState.room.currentFrame = currentFrame;
  }
}

function addAndRemoveCostumeOnPickupCollectible(
  player: EntityPlayer,
  costumeId: NullItemID,
  collectedItem: boolean,
) {
  if (player.HasCollectible(CollectibleTypeCustom["TRUE_ICE_BOW"]!)) {
    if (!collectedItem) {
      player.AddNullCostume(costumeId);
      playerState.persistent.collectedItem = true;
    }
  } else {
    player.TryRemoveNullCostume(costumeId);
    playerState.persistent.collectedItem = false;
  }
}
