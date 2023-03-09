import {
  damageUpEffect,
  healthUpEffect,
  tearsUpEffect,
  thornyCrackedDamageUpEffect,
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
  [TrinketTypeCustom.CRYSTAL_TEARS_THORNY_CRACKED]: thornyCrackedDamageUpEffect,
} as const;
