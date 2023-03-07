import { TibState } from "@tib/states/tibState";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main(isContinued: boolean) {
  const player = Isaac.GetPlayer();
  const subPlayer = player.GetSubPlayer();
  const twinPlayer = player.GetOtherTwin();

  if (!isContinued) {
    TibState.room.familiars = [];
    TibState.persistent.fpsPerTick = 0;
    TibState.persistent.collectedItem = false;

    if (subPlayer !== undefined) {
      const { baseMaxFireDelay } = TibState.persistent;
      const forgottenID = getPlayerIndex(player, true);
      const soulID = getPlayerIndex(subPlayer, true);

      baseMaxFireDelay[forgottenID] = player.MaxFireDelay;
      baseMaxFireDelay[soulID] = subPlayer.MaxFireDelay;
    } else {
      const { baseMaxFireDelay } = TibState.persistent;
      const playerIndex = getPlayerIndex(player);

      baseMaxFireDelay[playerIndex] = player.MaxFireDelay;
      if (twinPlayer !== undefined) {
        const twinIndex = getPlayerIndex(twinPlayer);
        baseMaxFireDelay[twinIndex] = twinPlayer.MaxFireDelay;
      }
    }
  }
}
