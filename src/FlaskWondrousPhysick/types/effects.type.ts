import {
  burnEffect,
  damageUpEffect,
  healthUpEffect,
  lightningEffect,
  tearsUpEffect,
  thornyDamageUpEffect,
} from "@fowp/items/active";
import { Rarity } from "@shared/enums/Rarity";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";

export interface IEffect {
  charge: number;
}

export type EffectResult = IEffect;
export type EffectFunction = Record<
  string,
  { rarity: number; effect: (player: EntityPlayer) => EffectResult }
>;
export const Effects: EffectFunction = {
  [TrinketTypeCustom.CRYSTAL_TEARS_DMG_UP]: {
    rarity: Rarity.GRANTED,
    effect: damageUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_TEARS_UP]: {
    rarity: Rarity.GRANTED,
    effect: tearsUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_HEALTH_UP]: {
    rarity: Rarity.GRANTED,
    effect: healthUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_THORNY_CRACKED]: {
    rarity: Rarity.RARE,
    effect: thornyDamageUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_BURN_CRACKED]: {
    rarity: Rarity.RARE,
    effect: burnEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_LIGHTNING_CRACKED]: {
    rarity: Rarity.RARE,
    effect: lightningEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_SLOTS_UP]: {
    rarity: Rarity.VERY_RARE,
    effect: () => ({ charge: 0 }),
  },
} as const;
