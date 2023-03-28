import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import {
  getPlayerFromEntity,
  getPlayerIndex,
  VectorZero,
} from "isaacscript-common";

export function postMalachiteFamiliarInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { statsPlayer } = FOWPState.persistent;
      const player = getPlayerFromEntity(familiar);

      if (player !== undefined) {
        const playerID = getPlayerIndex(player);
        const stats = statsPlayer[playerID];
        if (stats !== undefined) {
          const { malachite, wispMalachite } = stats;
          if (malachite !== undefined && familiar.OrbitLayer === -1) {
            if (!wispMalachite) {
              malachite.push({
                hp: 3,
                offset: VectorZero,
                seed: familiar.InitSeed,
              });
            }

            familiar.OrbitLayer = 9999;
            stats.wispMalachite = false;
          }
        }
      }
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
