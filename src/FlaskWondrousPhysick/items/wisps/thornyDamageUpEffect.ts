import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { EffectResult } from "@shared/types";
import { CollectibleType } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function thornyDamageUpEffect(player: EntityPlayer): EffectResult {
  const { DEAD_EYE_SHOOTS_TO_MAX_DMG: MAX_DMG } = Settings.FlaskWondrousPhysick;
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;
  const stats = statsPlayer[playerID];

  if (stats !== undefined) {
    stats.deadEye = true;
    if (player.HasCollectible(CollectibleType.BRIMSTONE)) {
      player.Damage += MAX_DMG / 2;
      stats.dmgUp += MAX_DMG / 2;
    }
  }
  return {
    charge: 0,
  };
}
