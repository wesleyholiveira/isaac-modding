import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main(isContinued: boolean) {
  const player = Isaac.GetPlayer();

  if (!isContinued) {
    FOWPState.persistent.baseDamage = player.Damage;
    FOWPState.persistent.items = [];
    FOWPState.persistent.invoked = false;
    FOWPState.persistent.droppedItems = 0;
  }
}
