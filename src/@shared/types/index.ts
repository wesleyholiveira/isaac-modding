export interface IEffect {
  charge: number;
}

export type EffectResult = IEffect;
export type EffectFunction = Record<
  string,
  {
    rarity?: number;
    color?: Color;
    effect: (player: EntityPlayer) => EffectResult;
  }
>;
