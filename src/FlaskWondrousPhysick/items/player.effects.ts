import {
  burnEffect,
  ceruleanEffect,
  damageUpEffect,
  healthUpEffect,
  holyMantleEffect,
  lightningEffect,
  malachiteSpawnEffect,
  rupturedEffect,
  tearsUpEffect,
  thornyDamageUpEffect,
} from "@fowp/items/active";
import { Rarity } from "@shared/enums/Rarity";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { EffectFunction } from "@shared/types";

export const PlayerEffects: EffectFunction = {
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
  [TrinketTypeCustom.CRYSTAL_TEARS_MALACHITE]: {
    rarity: Rarity.RARE,
    effect: malachiteSpawnEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_SLOTS_UP]: {
    rarity: Rarity.VERY_RARE,
    effect: () => ({ charge: 0 }),
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_HOLY_MANTLE]: {
    rarity: Rarity.ALMOST_GRANTED,
    effect: holyMantleEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_CERULEAN]: {
    rarity: Rarity.ALMOST_GRANTED,
    effect: ceruleanEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_RUPTURED]: {
    rarity: Rarity.ALMOST_GRANTED,
    effect: rupturedEffect,
  },
} as const;
