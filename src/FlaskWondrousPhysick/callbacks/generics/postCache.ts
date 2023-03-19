import { damageUpEffect, tearsUpEffect } from "@fowp/items/active";
import { FOWPState } from "@fowp/states/fowpState";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";

export function postCache(mod: Mod): void {
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    (player: EntityPlayer, cache: CacheFlag) => {
      const { dmgUp, tearsUp } = FOWPState.persistent;

      if (cache === CacheFlag.DAMAGE) {
        if (dmgUp > 0) {
          damageUpEffect(player);
        }
      }

      if (cache === CacheFlag.FIRE_DELAY) {
        if (tearsUp > 0) {
          tearsUpEffect(player);
        }
      }
    },
  );
}
