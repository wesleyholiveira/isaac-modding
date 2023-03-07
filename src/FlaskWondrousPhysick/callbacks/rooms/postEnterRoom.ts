import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { Calculus } from "@shared/helpers/Calculus";
import { ModCallback } from "isaac-typescript-definitions";

export function postEnterRoom(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  const { dmgUp, tearsUp, items } = FOWPState.persistent;
  const player = Isaac.GetPlayer();

  if (
    player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
    player.HasCollectible(CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK)
  ) {
    FOWPState.room.bossDied = false;
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
    }
  }
}
