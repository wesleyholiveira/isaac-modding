import { Direction, ModCallback } from "isaac-typescript-definitions";
import { trueIceBowEffect } from "../items/active/effect";
import { playerState } from "../states/playerState";

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

  if (playerState.room.isUsingTrueIceIceBow) {
    const animation = player.GetSprite().GetAnimation();
    const currentDirection = player.GetMovementDirection();

    if (animation !== "LiftItem") {
      if (
        playerState.room.currentDirection !== currentDirection ||
        currentFrame > playerState.room.currentFrame + 20 ||
        currentDirection === Direction.NO_DIRECTION
      ) {
        const movementAnimation = MovementDirections[currentDirection];

        player.PlayExtraAnimation(`Pickup${movementAnimation}`);

        playerState.room.currentFrame = currentFrame;
        playerState.room.currentDirection = currentDirection;
      }

      if (player.GetShootingJoystick().Length() > 0.1) {
        player.StopExtraAnimation();

        playerState.room.isUsingTrueIceIceBow = false;
        playerState.room.transientState = true;

        trueIceBowEffect(player);
      }
    }

    playerState.room.currentFrame = currentFrame;
  }
}
