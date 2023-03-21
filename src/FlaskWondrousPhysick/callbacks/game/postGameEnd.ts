import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";
import { log, PlayerIndex } from "isaacscript-common";

export function postGameEnd(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_END, (isGameOver: boolean) => {
    Isaac.ConsoleOutput("cabo o jogo");
    log("fim de jogo");
    FOWPState.persistent.player = undefined;
    FOWPState.persistent.playerID = 0 as PlayerIndex;
  });
}
