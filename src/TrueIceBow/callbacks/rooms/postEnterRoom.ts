import {
  CollectibleType,
  FamiliarVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import { getPlayerFamiliars } from "isaacscript-common";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { playerState } from "../../states/playerState";

export function postEnterRoom(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  const player = Isaac.GetPlayer();

  if (
    player.GetActiveItem() === CollectibleTypeCustom.TRUE_ICE_BOW &&
    player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES)
  ) {
    const wisps = getPlayerFamiliars(player).filter(
      (familiar: EntityFamiliar) =>
        familiar.Variant === FamiliarVariant.WISP &&
        playerState.room.familiars.includes(familiar.InitSeed),
    );

    if (wisps.length > 0) {
      wisps.forEach((wisp: EntityFamiliar) => wisp.Remove());
    }
  }
}
