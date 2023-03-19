import { FOWPState } from "@fowp/states/fowpState";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main(isContinued: boolean) {
  const itemPool = Game().GetItemPool();

  if (!isContinued) {
    const player = Isaac.GetPlayer();
    FOWPState.persistent.items = [];
    FOWPState.persistent.droppedItems = [] as unknown as never;
    FOWPState.persistent.malachite = [] as unknown as never;
    FOWPState.persistent.fireMind = false;
    FOWPState.persistent.deadEye = false;
    FOWPState.persistent.stopped = false;
    FOWPState.persistent.extraSlots = 0;
    FOWPState.persistent.dmgUp = 0;
    FOWPState.persistent.tearsUp = 0;
    FOWPState.persistent.wisps = new LuaMap();
    FOWPState.persistent.usedTears = [];

    player.AddCacheFlags(CacheFlag.DAMAGE);
    player.AddCacheFlags(CacheFlag.FIRE_DELAY);
    player.EvaluateItems();

    for (const trinket of Object.values(TrinketTypeCustom)) {
      itemPool.RemoveTrinket(trinket);
    }
  }
}
