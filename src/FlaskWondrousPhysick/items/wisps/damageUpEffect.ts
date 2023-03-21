import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@shared/types";

export function damageUpEffect(player: EntityPlayer): EffectResult {
  player.Damage += 0.5;

  if (!player.IsSubPlayer()) {
    FOWPState.persistent.dmgUp += 0.5;
  }
  return {
    charge: 0,
  };
}
