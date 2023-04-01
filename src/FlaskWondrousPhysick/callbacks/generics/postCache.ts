import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function postCache(mod: Mod): void {
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    (player: EntityPlayer, cache: CacheFlag) => {
      const { statsPlayer } = FOWPState.persistent;

      const playerID = getPlayerIndex(player);
      const stats = statsPlayer[playerID];

      if (stats !== undefined) {
        const { dmgUp, tearsUp } = stats;
        if (cache === CacheFlag.DAMAGE) {
          if (dmgUp > 0) {
            player.Damage += dmgUp;
          }
        }

        if (tearsUp > 0) {
          if (cache === CacheFlag.FIRE_DELAY) {
            const increaseValue = 0.5;
            const newTearDelay = Calculus.fireRate2tearDelay(
              Calculus.tearDelay2fireRate(player.MaxFireDelay) + increaseValue,
            );
            player.MaxFireDelay = newTearDelay;
          }
        }
      }
    },
  );
}
