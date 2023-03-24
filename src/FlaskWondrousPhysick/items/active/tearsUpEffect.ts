import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import { EffectResult } from "@shared/types";
import { getPlayerIndex } from "isaacscript-common";

export function tearsUpEffect(player: EntityPlayer): EffectResult {
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;
  const stats = statsPlayer[playerID];

  const increaseValue = 0.5;
  const newTearDelay = Calculus.fireRate2tearDelay(
    Calculus.tearDelay2fireRate(player.MaxFireDelay) + increaseValue,
  );
  player.MaxFireDelay = newTearDelay;

  if (stats !== undefined) {
    if (!player.IsSubPlayer()) {
      stats.tearsUp += increaseValue;
    }
  }

  return {
    charge: 0,
  };
}
