import { TearFlag, TearVariant } from "isaac-typescript-definitions";

export interface IEffect {
  charge: number;
}

export type EffectResult = IEffect;
export type EffectFunction = Record<
  string,
  {
    rarity?: number;
    color?: Color;
    tears?: {
      flag: TearFlag;
      variant?: TearVariant;
      damage?: number;
      chance?: number;
    };
    effect: (player: EntityPlayer) => EffectResult;
  }
>;
