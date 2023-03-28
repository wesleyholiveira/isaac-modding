import { FOWPState } from "@fowp/states/fowpState";
import { Calculus } from "@shared/helpers/Calculus";
import {
  CollectibleType,
  ModCallback,
  TearFlag,
} from "isaac-typescript-definitions";
import {
  getPlayerFromIndex,
  hasFlag,
  PlayerIndex,
  removeFlag,
} from "isaacscript-common";

export function postEnterRoom(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  const { statsPlayer } = FOWPState.persistent;

  if (Isaac.CountBosses() > 0) {
    FOWPState.persistent.stopped = true;
    FOWPState.persistent.frameCount = Game().GetFrameCount();
  }

  Object.keys(statsPlayer).forEach((pID: string) => {
    const playerID = parseInt(pID, 10) as PlayerIndex;
    const player: EntityPlayer | undefined = getPlayerFromIndex(playerID);

    const stats = statsPlayer[playerID];
    if (player !== undefined && stats !== undefined) {
      const { items } = stats;
      if (items !== undefined && items.length > 0) {
        const subPlayer = player.GetSubPlayer();

        const { dmgUp, tearsUp } = stats;
        player.Damage -= stats.dmgUp;
        player.MaxFireDelay = Calculus.fireRate2tearDelay(
          Calculus.tearDelay2fireRate(player.MaxFireDelay) - stats.tearsUp,
        );

        if (subPlayer !== undefined) {
          subPlayer.Damage -= dmgUp;
          subPlayer.MaxFireDelay = Calculus.fireRate2tearDelay(
            Calculus.tearDelay2fireRate(subPlayer.MaxFireDelay) - tearsUp,
          );
        }

        stats.dmgUp = 0;
        stats.tearsUp = 0;
        stats.thornyDmgUp = 0;
        stats.deadEye = false;
        stats.fireMind = false;

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

        FOWPState.room.bossDied = false;
        // FOWPState.room.changed = true;
      }
    }
  });
}
