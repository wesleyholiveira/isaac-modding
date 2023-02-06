import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";
import { playerState } from "../../states/playerState";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main(isContinued: boolean) {
  const player = Isaac.GetPlayer();
  const subPlayer = player.GetSubPlayer();
  const twinPlayer = player.GetOtherTwin();

  if (!isContinued) {
    playerState.persistent.collectedItem = false;

    if (subPlayer !== undefined) {
      const { baseMaxFireDelay } = playerState.persistent;
      const forgottenID = getPlayerIndex(player, true);
      const soulID = getPlayerIndex(subPlayer, true);

      baseMaxFireDelay[forgottenID] = player.MaxFireDelay;
      baseMaxFireDelay[soulID] = subPlayer.MaxFireDelay;
    } else {
      const { baseMaxFireDelay } = playerState.persistent;
      const playerIndex = getPlayerIndex(player);

      baseMaxFireDelay[playerIndex] = player.MaxFireDelay;
      if (twinPlayer !== undefined) {
        const twinIndex = getPlayerIndex(twinPlayer);
        baseMaxFireDelay[twinIndex] = twinPlayer.MaxFireDelay;
      }
    }
  }
}
