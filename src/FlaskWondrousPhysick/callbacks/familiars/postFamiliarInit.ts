import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";

export function postFamiliarInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { malachite } = FOWPState.persistent;

      if (malachite !== undefined && familiar.OrbitLayer === -1) {
        malachite.push({
          hp: 3,
          orbit: 9999,
          seed: familiar.InitSeed,
        });

        familiar.OrbitLayer = 9999;
      }
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
