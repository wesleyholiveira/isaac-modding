import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import { EffectResult } from "@shared/types";

export function tearsUpEffect(player: EntityPlayer): EffectResult {
  const increaseValue = 0.25;
  const newTearDelay = Calculus.fireRate2tearDelay(
    Calculus.tearDelay2fireRate(player.MaxFireDelay) + increaseValue,
  );
  player.MaxFireDelay = newTearDelay;

  if (!player.IsSubPlayer()) {
    FOWPState.persistent.tearsUp += increaseValue;
  }
  return {
    charge: 0,
  };
}
