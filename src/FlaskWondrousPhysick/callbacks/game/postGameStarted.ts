import { FOWPState } from "@fowp/states/fowpState";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { PlayerIndex } from "isaacscript-common";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main(player: EntityPlayer) {
  const itemPool = Game().GetItemPool();

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
  FOWPState.persistent.tearIndex = 0;
  FOWPState.persistent.player = undefined;
  FOWPState.persistent.playerID = 0 as PlayerIndex;
  FOWPState.persistent.usedTears = [];
  FOWPState.persistent.wispDeadEye = false;
  FOWPState.persistent.wispFireMind = false;
  FOWPState.persistent.wispLightning = false;
  FOWPState.persistent.wispMalachite = false;

  player.AddCacheFlags(CacheFlag.DAMAGE);
  player.AddCacheFlags(CacheFlag.FIRE_DELAY);
  // player.EvaluateItems();

  for (const trinket of Object.values(TrinketTypeCustom)) {
    itemPool.RemoveTrinket(trinket);
  }
}
