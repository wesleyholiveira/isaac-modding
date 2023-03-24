import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@shared/types";
import { TearFlag } from "isaac-typescript-definitions";
import { addFlag, getPlayerIndex, hasFlag } from "isaacscript-common";

export function burnEffect(player: EntityPlayer): EffectResult {
  const playerID = getPlayerIndex(player);
  const { statsPlayer } = FOWPState.persistent;
  const stats = statsPlayer[playerID];

  if (stats !== undefined) {
    stats.fireMind = true;
    if (!hasFlag(player.TearFlags, TearFlag.BURN)) {
      player.TearFlags = addFlag(player.TearFlags, TearFlag.BURN);
    }
  }

  return {
    charge: 0,
  };
}
