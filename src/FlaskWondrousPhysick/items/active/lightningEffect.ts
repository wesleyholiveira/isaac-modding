import { EffectResult } from "@shared/types";
import { TearFlag } from "isaac-typescript-definitions";
import { addFlag, hasFlag } from "isaacscript-common";

export function lightningEffect(player: EntityPlayer): EffectResult {
  if (!hasFlag(player.TearFlags, TearFlag.JACOBS)) {
    player.TearFlags = addFlag(player.TearFlags, TearFlag.JACOBS);
  }

  return {
    charge: 0,
  };
}
