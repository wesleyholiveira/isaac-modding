import { WispEffects } from "@fowp/items/wisp.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { getPlayerFromEntity, getPlayerIndex } from "isaacscript-common";

export function postWispFamiliarInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { wisps, usedTears, color, statsPlayer } = FOWPState.persistent;
      const player = getPlayerFromEntity(familiar);

      if (player !== undefined) {
        const playerID = getPlayerIndex(player);
        const stats = statsPlayer[playerID];

        if (usedTears !== undefined && stats !== undefined) {
          const { tearIndex } = stats;
          const tears = usedTears[playerID];

          if (tears !== undefined) {
            const tearID = tears[tearIndex];

            if (tearID !== undefined) {
              const effect = WispEffects[tearID];
              // Isaac.ConsoleOutput(`Key: ${key}\n`);

              // Isaac.ConsoleOutput(`Type: ${familiar.Type}, Tear ID: ${tearID}, Color:
              // ${effect?.color?.R}, ${effect?.color?.G}, ${effect?.color?.B}\n`);

              if (effect !== undefined) {
                const seed = familiar.InitSeed;
                // Isaac.ConsoleOutput(`Familiar Init Seed: ${seed}\n`);
                const c = effect.color;

                if (c !== undefined) {
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
        }
      }
    },
    FamiliarVariant.WISP,
  );
}
