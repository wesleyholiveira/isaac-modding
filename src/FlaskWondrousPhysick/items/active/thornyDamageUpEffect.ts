import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@fowp/types/effects.type";
import { CollectibleType } from "isaac-typescript-definitions";
import { Settings } from "../../../@shared/config";

export function thornyDamageUpEffect(player: EntityPlayer): EffectResult {
  const { DEAD_EYE_SHOOTS_TO_MAX_DMG: MAX_DMG } = Settings.FlaskWondrousPhysick;
  FOWPState.persistent.deadEye = true;
  if (player.HasCollectible(CollectibleType.BRIMSTONE)) {
    player.Damage += MAX_DMG;
    FOWPState.persistent.dmgUp += MAX_DMG;
  }
  return {
    charge: 0,
  };
}
