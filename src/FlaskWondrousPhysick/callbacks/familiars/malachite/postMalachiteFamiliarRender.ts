import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { getPlayerFromEntity, getPlayerIndex } from "isaacscript-common";

export function postMalachiteFamiliarRender(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_RENDER,
    (familiar: EntityFamiliar) => {
      const { statsPlayer } = FOWPState.persistent;
      const player = getPlayerFromEntity(familiar);

      if (player !== undefined) {
        const playerID = getPlayerIndex(player);
        const stats = statsPlayer[playerID];
        if (stats !== undefined) {
          const sprite = familiar.GetSprite();
          const { malachite } = stats;

          if (malachite !== undefined) {
            const spriteIndex = malachite.findIndex(
              (m) => m !== undefined && m.seed === familiar.InitSeed,
            );

            sprite.SetFrame(spriteIndex);
          }
          sprite.Update();
        }
      }
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
