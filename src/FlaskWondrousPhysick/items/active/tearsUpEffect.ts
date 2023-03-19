import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import { EffectResult } from "@shared/types";

export function tearsUpEffect(player: EntityPlayer): EffectResult {
  const subPlayer = player.GetSubPlayer();

  const increaseValue = 0.5;
  const newTearDelay = Calculus.fireRate2tearDelay(
    Calculus.tearDelay2fireRate(player.MaxFireDelay) + increaseValue,
  );
  player.MaxFireDelay = newTearDelay;

  if (subPlayer !== undefined) {
    subPlayer.MaxFireDelay = Calculus.fireRate2tearDelay(
      Calculus.tearDelay2fireRate(subPlayer.MaxFireDelay) + increaseValue,
    );
  }
  FOWPState.persistent.tearsUp += increaseValue;
  return {
    charge: 0,
  };
}
