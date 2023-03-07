import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@fowp/types/effects.type";
import { Calculus } from "@shared/helpers/Calculus";

export function tearsUpEffect(player: EntityPlayer): EffectResult {
  const increaseValue = 0.5;
  const newTearDelay = Calculus.fireRate2tearDelay(
    Calculus.tearDelay2fireRate(player.MaxFireDelay) + increaseValue,
  );
  player.MaxFireDelay = newTearDelay;
  FOWPState.persistent.tearsUp += increaseValue;
  return {
    charge: 0,
  };
}
