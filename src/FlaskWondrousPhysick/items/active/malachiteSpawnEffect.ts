import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { EffectResult } from "@shared/types";
import { EntityType } from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";

const MAX_FAMILIAR = Settings.FlaskWondrousPhysick.MALACHITE_FAMILIAR;
export function malachiteSpawnEffect(player: EntityPlayer): EffectResult {
  const { malachite } = FOWPState.persistent;

  if (malachite !== undefined) {
    const malachitesNotDamaged = malachite.filter((m) => m.hp === 3);
    let totalMalachites = MAX_FAMILIAR;
    if (malachitesNotDamaged.length >= 0) {
      FOWPState.persistent.malachite = malachitesNotDamaged;
      totalMalachites -= malachitesNotDamaged.length;
    }

    Isaac.ConsoleOutput(`${totalMalachites}`);

    for (let i = 0; i < totalMalachites; i++) {
      Isaac.Spawn(
        EntityType.FAMILIAR,
        FamiliarVariantCustom.FAMILIAR_MALACHITE,
        0,
        player.Position,
        VectorZero,
        player,
      );
    }
  }

  return {
    charge: 0,
  };
}
