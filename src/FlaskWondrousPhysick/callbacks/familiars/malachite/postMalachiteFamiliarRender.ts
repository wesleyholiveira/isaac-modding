import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";

export function postMalachiteFamiliarRender(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_RENDER,
    (familiar: EntityFamiliar) => {
      const sprite = familiar.GetSprite();
      const { malachite } = FOWPState.persistent;

      if (malachite !== undefined) {
        const spriteIndex = malachite.findIndex(
          (m) => m.seed === familiar.InitSeed,
        );

        sprite.SetFrame(spriteIndex);
      }
      sprite.Update();
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
