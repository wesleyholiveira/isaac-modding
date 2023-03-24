import { FOWPState } from "@fowp/states/fowpState";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import {
  getPlayerIndex,
  getPlayerIndexVanilla,
  isJacobOrEsau,
} from "isaacscript-common";

export function postPlayerInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main(player: EntityPlayer) {
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;

  Isaac.ConsoleOutput(
    `PlayerID: ${playerID}, vanilla index: ${getPlayerIndexVanilla(player)}\n`,
  );

  if (statsPlayer[playerID] === undefined) {
    statsPlayer[playerID] = {
      deadEye: false,
      dmgUp: 0,
      thornyDmgUp: 0,
      fireMind: false,
      missedShots: 0,
      tearsUp: 0,
      malachite: [],
      wispMalachite: false,
      droppedItems: [] as unknown as never,
      extraSlots: 0,
      items: [],
      tearIndex: 0,
    };

    FOWPState.persistent.isJacobEsau = isJacobOrEsau(player);
  }

  player.AddCacheFlags(CacheFlag.DAMAGE);
  player.AddCacheFlags(CacheFlag.FIRE_DELAY);

  FOWPState.persistent.playerID = playerID;
}
