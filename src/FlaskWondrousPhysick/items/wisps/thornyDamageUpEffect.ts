import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { EffectResult } from "@shared/types";
import { CollectibleType } from "isaac-typescript-definitions";

export function thornyDamageUpEffect(player: EntityPlayer): EffectResult {
  const { DEAD_EYE_SHOOTS_TO_MAX_DMG: MAX_DMG } = Settings.FlaskWondrousPhysick;
  FOWPState.persistent.deadEye = true;
  if (player.HasCollectible(CollectibleType.BRIMSTONE)) {
    player.Damage += MAX_DMG / 2;
    FOWPState.persistent.dmgUp += MAX_DMG / 2;
  }
  return {
    charge: 0,
  };
}
