import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@fowp/types/effects.type";

export function thornyCrackedDamageUpEffect(
  player: EntityPlayer,
): EffectResult {
  FOWPState.persistent.deadEye = true;
  return {
    charge: 0,
  };
}
