import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import {
  getPlayerFromEntity,
  getPlayerIndex,
  VectorZero,
} from "isaacscript-common";

export function postMalachiteFamiliarUpdate(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_UPDATE,
    (familiar: EntityFamiliar) => {
      const { statsPlayer } = FOWPState.persistent;
      const player = getPlayerFromEntity(familiar);

      if (player !== undefined) {
        const playerID = getPlayerIndex(player);
        const stats = statsPlayer[playerID];

        if (stats !== undefined) {
          const { malachite } = stats;
          const mala = malachite?.find(
            (m) => m !== undefined && m.seed === familiar.InitSeed,
          );

          familiar.OrbitSpeed = 0.05;
          familiar.OrbitDistance = Vector(25, 25).add(
            mala?.offset ?? VectorZero,
          );
          familiar.Velocity = familiar
            .GetOrbitPosition(player.Position.add(player.Velocity))
            .sub(familiar.Position);
        }
      }
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
