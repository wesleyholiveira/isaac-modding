import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function postCache(mod: Mod): void {
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    (player: EntityPlayer, cache: CacheFlag) => {
      const {
        dmgUp,
        tearsUp,
        player: statePlayer,
        playerID,
      } = FOWPState.persistent;

      const sp = statePlayer?.get(playerID);

      if (sp !== undefined && getPlayerIndex(player) === playerID) {
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
    },
  );
}
