import { WispEffects } from "@fowp/items/wisp.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { ColorDefault } from "isaacscript-common";

export function postWispFamiliarInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { wisps, usedTears, playerID, color, statsPlayer } =
        FOWPState.persistent;

      const stats = statsPlayer[playerID];

      if (usedTears !== undefined && stats !== undefined) {
        const { tearIndex } = stats;
        const tears = usedTears[playerID];

        Isaac.ConsoleOutput(`Tears: ${tears?.join(",")}\n`);
        if (tears !== undefined) {
          const tearID = tears[tearIndex];

          if (tearID !== undefined) {
            const effect = WispEffects[tearID];
            // Isaac.ConsoleOutput(`Key: ${key}\n`);

            // Isaac.ConsoleOutput( `Type: ${familiar.Type}, Tear ID: ${tear}, Color:
            // ${effect?.color?.R}, ${effect?.color?.G}, ${effect?.color?.B}\n`, );

            if (effect !== undefined) {
              const c = effect.color ?? ColorDefault;
              const seed = familiar.InitSeed;
              familiar.SetColor(c, 0, 0);

              if (!color.has(seed)) {
                color.set(seed, c);
              }

              if (!wisps.has(playerID)) {
                wisps.set(playerID, [familiar]);
              } else {
                wisps.get(playerID)?.push(familiar);
              }

              stats.tearIndex++;
            }
          }
        }
      }
    },
    FamiliarVariant.WISP,
  );
}
