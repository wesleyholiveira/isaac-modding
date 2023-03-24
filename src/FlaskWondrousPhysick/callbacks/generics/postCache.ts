import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { getPlayerFromIndex, getPlayerIndex } from "isaacscript-common";

export function postCache(mod: Mod): void {
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    (player: EntityPlayer, cache: CacheFlag) => {
      const { statsPlayer, playerID } = FOWPState.persistent;

      const sp = getPlayerFromIndex(playerID);
      if (sp !== undefined && getPlayerIndex(player) === playerID) {
        const stats = statsPlayer[playerID];

        if (stats !== undefined) {
          const { dmgUp, tearsUp } = stats;
          if (cache === CacheFlag.DAMAGE) {
            if (dmgUp > 0) {
              sp.Damage += dmgUp;
            }
          }

          if (cache === CacheFlag.FIRE_DELAY) {
            if (tearsUp > 0) {
              const increaseValue = 0.5;
              const newTearDelay = Calculus.fireRate2tearDelay(
                Calculus.tearDelay2fireRate(sp.MaxFireDelay) + increaseValue,
              );
              sp.MaxFireDelay = newTearDelay;
            }
          }
        }
      }
    },
  );
}
