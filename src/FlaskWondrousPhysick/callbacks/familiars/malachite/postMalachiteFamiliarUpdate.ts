import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import {
  getPlayerFromIndex,
  PlayerIndex,
  VectorZero,
} from "isaacscript-common";

export function postMalachiteFamiliarUpdate(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_UPDATE,
    (familiar: EntityFamiliar) => {
      const { playerID, statsPlayer } = FOWPState.persistent;
      const familiarPlayerIndex = familiar.GetData()["playerIndex"] as
        | PlayerIndex
        | undefined;
      const player = getPlayerFromIndex(familiarPlayerIndex ?? playerID);

      if (player !== undefined) {
        const stats = statsPlayer[playerID];

        if (stats !== undefined) {
          const { malachite } = stats;
          // Isaac.ConsoleOutput( `malachites buffer: ${FOWPState.persistent.malachite?.length}\n`,
          // );
          const mala = malachite?.find((m) => m.seed === familiar.InitSeed);

          if (malachite !== undefined) {
            // if (changed) { familiar.SpriteScale = familiar.SpriteScale.sub(Vector(0.33, 0.33));
            // changed = false; }
          } else {
            familiar.Die();
          }

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
