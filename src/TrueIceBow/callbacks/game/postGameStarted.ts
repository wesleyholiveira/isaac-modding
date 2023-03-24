import { TibState } from "@tib/states/tibState";
import {
  Direction,
  ModCallback,
  PlayerType,
} from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main(player: EntityPlayer) {
  const playerID = getPlayerIndex(player, true);
  const { player: statePlayer } = TibState.persistent;
  const state = statePlayer[playerID];

  if (state === undefined) {
    const p = {
      baseMaxFireDelay: 0,
      collectedItem: false,
      currentDirection: Direction.NO_DIRECTION,
      currentFrame: 0,
      familiars: [],
      fpsPerTick: 0,
      isUsingTrueIceIceBow: false,
      transientState: false,
    };

    const subPlayer = player.GetSubPlayer();
    const twinPlayer = player.GetOtherTwin();

    p.baseMaxFireDelay = player.MaxFireDelay;
    if (subPlayer !== undefined && subPlayer.IsSubPlayer()) {
      p.baseMaxFireDelay = subPlayer.MaxFireDelay;
    }

    if (
      twinPlayer !== undefined &&
      (player.GetPlayerType() === PlayerType.ESAU ||
        player.GetPlayerType() === PlayerType.LAZARUS_B)
    ) {
      p.baseMaxFireDelay = twinPlayer.MaxFireDelay;
    }

    TibState.persistent.player[playerID] = p;
  }
}
