import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";

export function postMalachiteFamiliarUpdate(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_UPDATE,
    (familiar: EntityFamiliar) => {
      const player = Isaac.GetPlayer(0);
      const malachite = FOWPState.persistent.malachite?.find(
        (m) => m.seed === familiar.InitSeed,
      );

      if (malachite !== undefined) {
        // if (changed) { familiar.SpriteScale = familiar.SpriteScale.sub(Vector(0.33, 0.33));
        // changed = false; }
      } else {
        familiar.Die();
      }

      familiar.OrbitSpeed = 0.05;
      familiar.OrbitDistance = Vector(25, 25);
      familiar.Velocity = familiar
        .GetOrbitPosition(player.Position.add(player.Velocity))
        .sub(familiar.Position);
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
