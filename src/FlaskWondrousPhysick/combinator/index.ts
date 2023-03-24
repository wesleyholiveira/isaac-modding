import { EffectFunction } from "@shared/types";
import { TrinketType } from "isaac-typescript-definitions";

export class Combinator {
  constructor(private readonly player: EntityPlayer) {}

  combine(e: EffectFunction, trinkets?: number[]): number[] {
    const charges: number[] = [0];

    trinkets?.forEach((trinketID: TrinketType) => {
      const effect = e[trinketID];

      if (effect !== undefined) {
        const subPlayer = this.player.GetSubPlayer();
        const combination = effect.effect(this.player);

        if (subPlayer?.IsSubPlayer()) {
          effect.effect(subPlayer);
        }
        charges.push(combination.charge);
      }
    });

    return charges;
  }
}
