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
  const {
    dmgUp,
    tearsUp,
    items,
    player: statePlayer,
    playerID,
  } = FOWPState.persistent;
  const player: EntityPlayer | undefined = statePlayer?.get(playerID);

  if (player !== undefined) {
    if (
      player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
      player.HasCollectible(
        CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
      )
    ) {
      if (Isaac.CountBosses() > 0) {
        FOWPState.persistent.stopped = true;
        FOWPState.persistent.frameCount = Game().GetFrameCount();
      }

      if (items !== undefined && items.length > 0) {
        const subPlayer = player.GetSubPlayer();

        player.Damage -= dmgUp;
        player.MaxFireDelay = Calculus.fireRate2tearDelay(
          Calculus.tearDelay2fireRate(player.MaxFireDelay) - tearsUp,
        );

        if (
          !player.HasCollectible(CollectibleType.FIRE_MIND) &&
          hasFlag(player.TearFlags, TearFlag.BURN)
        ) {
          player.TearFlags = removeFlag(player.TearFlags, TearFlag.BURN);

          if (subPlayer !== undefined) {
            player.TearFlags = removeFlag(player.TearFlags, TearFlag.BURN);
          }
        }

        if (
          !player.HasCollectible(CollectibleType.JACOBS_LADDER) &&
          hasFlag(player.TearFlags, TearFlag.JACOBS)
        ) {
          player.TearFlags = removeFlag(player.TearFlags, TearFlag.JACOBS);
        }

        if (subPlayer !== undefined) {
          subPlayer.Damage -= dmgUp;
          subPlayer.MaxFireDelay = Calculus.fireRate2tearDelay(
            Calculus.tearDelay2fireRate(subPlayer.MaxFireDelay) - tearsUp,
          );
        }

        FOWPState.room.bossDied = false;
        FOWPState.room.thornyDmgUp = 0;
        FOWPState.persistent.deadEye = false;
        FOWPState.persistent.fireMind = false;
        FOWPState.persistent.dmgUp = 0;
        FOWPState.persistent.tearsUp = 0;
      }
    }
  }
}
