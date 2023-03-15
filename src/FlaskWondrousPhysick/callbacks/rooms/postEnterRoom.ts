import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { Calculus } from "@shared/helpers/Calculus";
import {
  CollectibleType,
  ModCallback,
  TearFlag,
} from "isaac-typescript-definitions";
import { hasFlag, removeFlag } from "isaacscript-common";

export function postEnterRoom(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  const { dmgUp, tearsUp, items, fireMind } = FOWPState.persistent;
  const player = Isaac.GetPlayer();

  if (
    player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
    player.HasCollectible(CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK)
  ) {
    FOWPState.room.bossDied = false;
    FOWPState.room.thornyDmgUp = 0;
    FOWPState.persistent.deadEye = false;

    if (Isaac.CountBosses() > 0) {
      FOWPState.room.stopped = true;
    }

    if (items !== undefined && items.length > 0) {
      if (dmgUp !== 0) {
        player.Damage -= dmgUp;
        FOWPState.persistent.dmgUp = 0;
      }

      if (tearsUp !== 0) {
        player.MaxFireDelay = Calculus.fireRate2tearDelay(
          Calculus.tearDelay2fireRate(player.MaxFireDelay) - tearsUp,
        );
        FOWPState.persistent.tearsUp = 0;
      }
      if (
        !player.HasCollectible(CollectibleType.JACOBS_LADDER) &&
        hasFlag(player.TearFlags, TearFlag.JACOBS)
      ) {
        player.TearFlags = removeFlag(player.TearFlags, TearFlag.JACOBS);
      }

      if (fireMind) {
        player.TearFlags = removeFlag(player.TearFlags, TearFlag.BURN);
        FOWPState.persistent.fireMind = false;
      }
    }
  }
}
