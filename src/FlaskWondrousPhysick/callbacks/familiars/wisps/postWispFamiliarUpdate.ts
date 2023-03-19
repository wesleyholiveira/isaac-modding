import { Combinator } from "@fowp/combinator";
import { WispEffects } from "@fowp/items/wisp.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";

let combinator: Combinator | undefined;
function postWispFamiliarInit(familiar: EntityFamiliar) {
  if (combinator === undefined) {
    combinator = new Combinator(Isaac.GetPlayer());
  }

  const { wisps, usedTears } = FOWPState.persistent;
  usedTears.forEach((tear) => {
    const effect = WispEffects[tear];

    Isaac.ConsoleOutput(
      `Tear ID: ${tear}, Color: ${effect?.color?.R}, ${effect?.color?.G}, ${effect?.color?.B}\n`,
    );

    if (effect !== undefined) {
      familiar.SetColor(effect.color ?? familiar.GetColor(), 0, 0);
      if (!wisps.has(tear)) {
        wisps.set(tear, familiar);
      }
    }
  });
}

export function postWispFamiliarUpdate(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    postWispFamiliarInit,
    FamiliarVariant.WISP,
  );

  mod.AddCallback(ModCallback.POST_UPDATE, () => {
    const { wisps, usedTears } = FOWPState.persistent;
    const tears = Object.entries(wisps)
      .filter(([, wisp]) => wisp.IsDead())
      .map(([tear]) => tear);

    if (tears.length > 0) {
      combinator?.combine(WispEffects, tears);

      tears.forEach((tear, index) => {
        usedTears.splice(index, 1);
        wisps.delete(tear);
      });
    }
  });
}
