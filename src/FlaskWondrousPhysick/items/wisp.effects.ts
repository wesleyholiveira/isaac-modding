import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { EffectFunction } from "@shared/types";
import { damageUpEffect, tearsUpEffect } from "./active";

export const WispEffects: EffectFunction = {
  [TrinketTypeCustom.CRYSTAL_TEARS_DMG_UP]: {
    color: Color(1, 0, 0, 1),
    effect: damageUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_TEARS_UP]: {
    color: Color(0.745, 0.537, 0.039, 1),
    effect: tearsUpEffect,
  },
} as const;
