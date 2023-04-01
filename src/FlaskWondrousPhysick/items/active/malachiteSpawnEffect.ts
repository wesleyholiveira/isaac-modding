import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { EffectResult } from "@shared/types";
import { EntityType } from "isaac-typescript-definitions";
import {
  getPlayerFamiliars,
  getPlayerIndex,
  VectorZero,
} from "isaacscript-common";

const MAX_FAMILIAR = Settings.FlaskWondrousPhysick.MALACHITE_FAMILIAR;
export function malachiteSpawnEffect(player: EntityPlayer): EffectResult {
  const { statsPlayer } = FOWPState.persistent;
  const playerID = getPlayerIndex(player);
  const stats = statsPlayer[playerID];

  if (stats !== undefined) {
    const { malachite } = stats;

    if (malachite !== undefined) {
      const damagedMalachites = getPlayerFamiliars(player).filter((f) =>
        malachite.some(
          (m) =>
            m !== undefined &&
            m.seed === f.InitSeed &&
            m.hp < 3 &&
            f.Variant === FamiliarVariantCustom.FAMILIAR_MALACHITE,
        ),
      );

      if (damagedMalachites.length > 0) {
        // totalMalachites += damagedMalachites.length;
        Isaac.ConsoleOutput(`Malachite damaged: ${damagedMalachites.length}`);
        damagedMalachites.forEach((m) => {
          malachite.forEach((ws, index) => {
            if (ws !== undefined && ws.seed === m.InitSeed) {
              malachite.splice(index, 1);
            }
          });
          m.Die();
        });
      }

      stats.malachite = stats.malachite?.filter((m) => m !== undefined);
      const totalMalachites = MAX_FAMILIAR - (stats.malachite?.length ?? 0);
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
