import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { EffectFunction } from "@shared/types";
import { TearFlag, TearVariant } from "isaac-typescript-definitions";
import {
  ceruleanEffect,
  damageUpEffect,
  healthUpEffect,
  malachiteSpawnEffect,
  rupturedEffect,
  tearsUpEffect,
  thornyDamageUpEffect,
} from "./wisps";

export const WispEffects: EffectFunction = {
  [TrinketTypeCustom.CRYSTAL_TEARS_DMG_UP]: {
    color: Color(0.439, 0.18, 0.11),
    effect: damageUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_TEARS_UP]: {
    color: Color(0.745, 0.537, 0.039),
    effect: tearsUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_HEALTH_UP]: {
    color: Color(0.682, 0.101, 0.274),
    effect: healthUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_THORNY_CRACKED]: {
    color: Color(0.275, 0.275, 0.275),
    effect: thornyDamageUpEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_BURN_CRACKED]: {
    color: Color(0.745, 0.255, 0.039),
    effect: () => ({ charge: 0 }),
    tears: {
      damage: 0.5,
      flag: TearFlag.BURN,
      variant: TearVariant.FIRE_MIND,
      chance: 10,
    },
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_LIGHTNING_CRACKED]: {
    color: Color(0.961, 0.831, 0.165),
    effect: () => ({ charge: 0 }),
    tears: {
      damage: 0.5,
      flag: TearFlag.JACOBS,
      chance: 10,
    },
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_CERULEAN]: {
    color: Color(0.173, 0.349, 0.675),
    effect: ceruleanEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_HOLY_MANTLE]: {
    color: Color(0.31, 0.4, 0.459),
    effect: () => ({ charge: 0 }),
    tears: {
      damage: 0,
      flag: TearFlag.SHIELDED,
      variant: TearVariant.LOST_CONTACT,
      chance: 50,
    },
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_RUPTURED]: {
    color: Color(0.941, 0.604, 0.024),
    effect: rupturedEffect,
  },
  [TrinketTypeCustom.CRYSTAL_TEARS_MALACHITE]: {
    color: Color(0.063, 0.486, 0.235),
    effect: malachiteSpawnEffect,
  },
} as const;
