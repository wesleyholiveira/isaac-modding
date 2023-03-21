import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import { EffectResult } from "@shared/types";
import { EntityType } from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";

const MAX_FAMILIAR = Settings.FlaskWondrousPhysick.MALACHITE_FAMILIAR;
export function malachiteSpawnEffect(player: EntityPlayer): EffectResult {
  const { malachite } = FOWPState.persistent;

  if (malachite !== undefined && malachite.length < MAX_FAMILIAR) {
    FOWPState.persistent.wispMalachite = true;

    const familiar = Isaac.Spawn(
      EntityType.FAMILIAR,
      FamiliarVariantCustom.FAMILIAR_MALACHITE,
      0,
      player.Position,
      VectorZero,
      player,
    );

    familiar.SetColor(Color(1, 0, 0), 0, 0);
    malachite.push({
      hp: 1.5,
      seed: familiar.InitSeed,
      offset: Vector(5, 5),
    });
  }

  return {
    charge: 0,
  };
}
