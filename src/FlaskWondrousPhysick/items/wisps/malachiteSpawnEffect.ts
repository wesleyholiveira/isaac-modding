import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { EffectResult } from "@shared/types";
import { EntityType } from "isaac-typescript-definitions";
import { getPlayerIndex, VectorZero } from "isaacscript-common";

export function malachiteSpawnEffect(player: EntityPlayer): EffectResult {
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;
  const stats = statsPlayer[playerID];

  if (stats !== undefined) {
    const { malachite } = stats;
    if (malachite !== undefined) {
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
