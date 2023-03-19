import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@shared/types";

export function damageUpEffect(player: EntityPlayer): EffectResult {
  const subPlayer = player.GetSubPlayer();

  player.Damage += 1.5;
  if (subPlayer !== undefined) {
    subPlayer.Damage += 1.5;
  }

  FOWPState.persistent.dmgUp += 1.5;
  return {
    charge: 2,
  };
}
