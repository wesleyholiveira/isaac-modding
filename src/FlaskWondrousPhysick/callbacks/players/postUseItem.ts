import { Combinator } from "@fowp/combinator";
import { PlayerEffects } from "@fowp/items/player.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import {
  CollectibleType,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";

export function postUseItem(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    main,
    CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
  );
}

function main(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: BitFlags<UseFlag>,
  _activeSlot: int,
  _customVarData: int,
) {
  const combinator = new Combinator(player);
  const trinketIDs = FOWPState.persistent.items
    ?.map((trinket) => trinket.trinket)
    .sort();

  if (trinketIDs !== undefined && trinketIDs.length > 0) {
    const { usedTears } = FOWPState.persistent;

    if (player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES)) {
      FOWPState.persistent.usedTears = [...usedTears, ...trinketIDs];

      trinketIDs.forEach(() =>
        player.AddWisp(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
          player.Position,
        ),
      );
    }

    const charges = combinator
      .combine(PlayerEffects, trinketIDs)
      .reduce((acc, value) => acc + value);
  }

  return true;
}
