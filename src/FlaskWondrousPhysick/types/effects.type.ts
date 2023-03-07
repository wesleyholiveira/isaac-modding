import {
  damageUpEffect,
  healthUpEffect,
  tearsUpEffect,
} from "@fowp/items/active";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";

export interface IEffect {
  charge: number;
}

export type EffectResult = IEffect;
export type EffectFunction = Record<
  string,
  (player: EntityPlayer) => EffectResult
>;
export const Effects = {
  [TrinketTypeCustom.CRYSTAL_TEARS_DMG_UP]: damageUpEffect,
  [TrinketTypeCustom.CRYSTAL_TEARS_TEARS_UP]: tearsUpEffect,
  [TrinketTypeCustom.CRYSTAL_TEARS_HEALTH_UP]: healthUpEffect,
} as const;
