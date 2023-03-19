import { EffectFunction } from "@shared/types";
import { TrinketType } from "isaac-typescript-definitions";

export class Combinator {
  constructor(private readonly player: EntityPlayer) {}

  combine(e: EffectFunction, trinkets?: number[]): number[] {
    const charges: number[] = [0];

    trinkets?.forEach((trinketID: TrinketType) => {
      const effect = e[trinketID];

      if (effect !== undefined) {
        const combination = effect.effect(this.player);
        charges.push(combination.charge);
      }
    });

    return charges;
  }
}
