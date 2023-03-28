import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TibState } from "@tib/states/tibState";
import {
  CollectibleType,
  FamiliarVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import {
  getPlayerFamiliars,
  getPlayerFromIndex,
  PlayerIndex,
} from "isaacscript-common";

export function postEnterRoom(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  const { player: statePlayer } = TibState.persistent;

  Object.keys(statePlayer).forEach((pID) => {
    const playerID = parseInt(pID, 10) as PlayerIndex | undefined;

    if (playerID !== undefined) {
      const player = getPlayerFromIndex(playerID);
      const state = statePlayer[playerID];

      if (
        player !== undefined &&
        state !== undefined &&
        player.GetActiveItem() === CollectibleTypeCustom.TRUE_ICE_BOW &&
        player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES)
      ) {
        const { familiars } = state;
        const wisps = getPlayerFamiliars(player).filter(
          (familiar: EntityFamiliar) =>
            familiar.Variant === FamiliarVariant.WISP &&
            familiars?.includes(familiar.InitSeed),
        );

        if (wisps.length > 0) {
          wisps.forEach((wisp: EntityFamiliar) => wisp.Remove());
        }
      }
    }
  });
}
