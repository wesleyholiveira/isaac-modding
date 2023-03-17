import { FOWPState } from "@fowp/states/fowpState";
import { EffectResult } from "@fowp/types/effects.type";
import { TearFlag } from "isaac-typescript-definitions";
import { addFlag, hasFlag } from "isaacscript-common";

export function burnEffect(player: EntityPlayer): EffectResult {
  FOWPState.persistent.fireMind = true;
  if (!hasFlag(player.TearFlags, TearFlag.BURN)) {
    player.TearFlags = addFlag(player.TearFlags, TearFlag.BURN);
  }

  return {
    charge: 0,
  };
}