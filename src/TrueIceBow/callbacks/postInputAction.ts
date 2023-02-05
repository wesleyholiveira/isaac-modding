import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { playerState } from "../states/playerState";

export function postInputAction(mod: Mod) {
  mod.AddCallback(ModCallback.INPUT_ACTION, main, InputHook.IS_ACTION_PRESSED);
}

// Método para fazer com que o próximo tiro aguarde a animação de tiro finalizar.
function main(
  _entity: Entity | undefined,
  _inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  const currentFrame = Game().GetFrameCount();

  if (
    playerState.room.transientState &&
    currentFrame < playerState.room.currentFrame + 20
  ) {
    if (
      buttonAction === ButtonAction.SHOOT_RIGHT ||
      buttonAction === ButtonAction.SHOOT_LEFT ||
      buttonAction === ButtonAction.SHOOT_UP ||
      buttonAction === ButtonAction.SHOOT_DOWN
    ) {
      return false;
    }
  } else {
    playerState.room.transientState = false;
    playerState.room.currentFrame = currentFrame;
  }

  return undefined;
}
