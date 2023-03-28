import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";
import { PlayerIndex } from "isaacscript-common";

export function preGameExited(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, (shouldSave: boolean) => {
    if (shouldSave) {
      const { statsPlayer, wisps } = FOWPState.persistent;
      Object.keys(statsPlayer).forEach((pID) => {
        const playerID = parseInt(pID, 10) as PlayerIndex;
        const stats = statsPlayer[playerID];

        if (stats !== undefined) {
          wisps.delete(playerID);
          stats.tearIndex = 0;
        }
      });
    }
  });
}
