import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@shared/types";
import { getPlayerIndex } from "isaacscript-common";

export function damageUpEffect(player: EntityPlayer): EffectResult {
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;
  const stats = statsPlayer[playerID];

  player.Damage += 1.5;

  if (stats !== undefined) {
    if (!player.IsSubPlayer()) {
      stats.dmgUp += 1.5;
    }
  }
  return {
    charge: 2,
  };
}
