import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { EffectResult } from "@shared/types";
import { EntityType } from "isaac-typescript-definitions";
import { getPlayerIndex, VectorZero } from "isaacscript-common";

const MAX_FAMILIAR = Settings.FlaskWondrousPhysick.MALACHITE_FAMILIAR;
export function malachiteSpawnEffect(player: EntityPlayer): EffectResult {
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;
  const stats = statsPlayer[playerID];

  if (stats !== undefined) {
    const { malachite } = stats;
    if (malachite !== undefined) {
      const malachitesNotDamaged = malachite.filter((m) => m.hp === 3);
      let totalMalachites = MAX_FAMILIAR;
      if (malachitesNotDamaged.length >= 0) {
        stats.malachite = malachitesNotDamaged;
        totalMalachites -= malachitesNotDamaged.length;
      }

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
  }

  return {
    charge: 0,
  };
}
