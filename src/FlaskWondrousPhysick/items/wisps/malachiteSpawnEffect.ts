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
    if (malachite !== undefined && malachite.length < MAX_FAMILIAR) {
      stats.wispMalachite = true;

      const familiar = Isaac.Spawn(
        EntityType.FAMILIAR,
        FamiliarVariantCustom.FAMILIAR_MALACHITE,
        0,
        player.Position,
        VectorZero,
        player,
      );

      familiar.GetData()["playerIndex"] = playerID;
      familiar.SetColor(Color(1, 0, 0), 0, 0);
      malachite.push({
        hp: 1.5,
        seed: familiar.InitSeed,
        offset: Vector(5, 5),
      });
    }
  }

  return {
    charge: 0,
  };
}
