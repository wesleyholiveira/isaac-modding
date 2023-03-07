import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@fowp/types/effects.type";

export function damageUpEffect(player: EntityPlayer): EffectResult {
  player.Damage += 1.5;
  FOWPState.persistent.dmgUp += 1.5;
  return {
    charge: 2,
  };
}
