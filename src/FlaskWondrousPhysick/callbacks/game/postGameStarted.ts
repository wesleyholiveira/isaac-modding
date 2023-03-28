import { FOWPState } from "@fowp/states/fowpState";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { ModCallback } from "isaac-typescript-definitions";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main(isContinue: boolean) {
  const itemPool = Game().GetItemPool();

  if (!isContinue) {
    FOWPState.persistent.stopped = false;
    FOWPState.persistent.lastPlayerID = undefined;
    FOWPState.persistent.usedTears = {};
    FOWPState.persistent.wisps = new LuaMap();

    for (const trinket of Object.values(TrinketTypeCustom)) {
      itemPool.RemoveTrinket(trinket);
    }
  }
}
