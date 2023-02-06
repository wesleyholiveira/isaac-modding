import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { NullItemIdTypeCustom } from "../../enums/NullItemIdTypeCustom";
import { playerState } from "../../states/playerState";

export function postPickupCollectibleUpdate(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    main,
    PickupVariant.COLLECTIBLE,
  );
}

function main(_pickup: EntityPickup) {
  const player = Isaac.GetPlayer();
  const costumeId = NullItemIdTypeCustom.TRUE_ICE_BOW_COSTUME;
  const { collectedItem } = playerState.persistent;

  if (player.HasCollectible(CollectibleTypeCustom["TRUE_ICE_BOW"]!)) {
    if (!collectedItem) {
      player.AddNullCostume(costumeId);
      playerState.persistent.collectedItem = true;
    }
  } else {
    player.TryRemoveNullCostume(costumeId);
    playerState.persistent.collectedItem = false;
  }
  return undefined;
}
