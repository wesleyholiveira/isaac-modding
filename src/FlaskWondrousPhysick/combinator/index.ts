import { TrinketType } from "isaac-typescript-definitions";
import { Effects } from "../types/effects.type";

export class Combinator {
  constructor(private readonly player: EntityPlayer) {}

  combine(trinkets?: number[]): number[] {
    const charges: number[] = [0];

    trinkets?.forEach((trinketID: TrinketType) => {
      const effect = Effects[trinketID];

      if (effect !== undefined) {
        const combination = effect(this.player);
        charges.push(combination.charge);
      }
    });

    return charges;
  }
}
