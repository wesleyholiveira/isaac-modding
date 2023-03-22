import { WispEffects } from "@fowp/items/wisp.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";

export function postWispFamiliarInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { wisps, usedTears, tearIndex } = FOWPState.persistent;

      const tear = usedTears[tearIndex];
      if (tear !== undefined) {
        const effect = WispEffects[tear];
        const key = `${tear}.${familiar.InitSeed}`;

        // Isaac.ConsoleOutput( `Type: ${familiar.Type}, Tear ID: ${tear}, Color:
        // ${effect?.color?.R}, ${effect?.color?.G}, ${effect?.color?.B}\n`, );

        if (effect !== undefined) {
          familiar.SetColor(effect.color ?? familiar.GetColor(), 0, 0);

          if (!wisps.has(key)) {
            wisps.set(key, familiar);
          }
        }

        FOWPState.persistent.tearIndex++;
      }
    },
    FamiliarVariant.WISP,
  );
}
