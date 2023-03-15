import { FOWPState } from "@fowp/states/fowpState";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import { ModCallback } from "isaac-typescript-definitions";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main(isContinued: boolean) {
  const player = Isaac.GetPlayer();
  const itemPool = Game().GetItemPool();

  if (!isContinued) {
    FOWPState.persistent.baseDamage = player.Damage;
    FOWPState.persistent.items = [];
    FOWPState.persistent.droppedItems = [] as unknown as never;
    FOWPState.persistent.invoked = false;
    FOWPState.persistent.fireMind = false;
    FOWPState.persistent.deadEye = false;
    FOWPState.room.stopped = false;
    FOWPState.persistent.extraSlots = 0;
    FOWPState.persistent.dmgUp = 0;
    FOWPState.persistent.tearsUp = 0;

    for (const trinket of Object.values(TrinketTypeCustom)) {
      itemPool.RemoveTrinket(trinket);
    }
  }
}
