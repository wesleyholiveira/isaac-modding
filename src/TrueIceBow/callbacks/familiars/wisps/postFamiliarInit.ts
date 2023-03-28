import { TibState } from "@tib/states/tibState";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerFromEntity, getPlayerIndex } from "isaacscript-common";

export function postFamiliarInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { player: statePlayer } = TibState.persistent;
      const player = getPlayerFromEntity(familiar);

      if (player !== undefined) {
        const playerID = getPlayerIndex(player);
        const state = statePlayer[playerID];

        if (state !== undefined) {
          const { familiars } = state;
          if (
            familiars !== undefined &&
            !familiars.includes(familiar.InitSeed)
          ) {
            familiars.push(familiar.InitSeed);
          }
        }
      }
    },
  );
}
