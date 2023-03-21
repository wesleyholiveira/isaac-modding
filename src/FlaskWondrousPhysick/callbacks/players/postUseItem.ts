import { Combinator } from "@fowp/combinator";
import { PlayerEffects } from "@fowp/items/player.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import {
  CollectibleType,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

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
  const { player: statePlayer } = FOWPState.persistent;
  const combinator = new Combinator(player);
  const trinketIDs = FOWPState.persistent.items
    ?.map((trinket) => trinket.trinket)
    .sort();

  if (trinketIDs !== undefined && trinketIDs.length > 0) {
    const { usedTears } = FOWPState.persistent;

    if (player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES)) {
      FOWPState.persistent.usedTears = [...usedTears, ...trinketIDs];

      trinketIDs
        .slice(1)
        .forEach(() =>
          player.AddWisp(
            CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
            player.Position,
          ),
        );
    }

    const charges = combinator
      .combine(PlayerEffects, trinketIDs)
      .reduce((acc, value) => acc + value);

    const playerID = getPlayerIndex(player);
    if (statePlayer === undefined) {
      FOWPState.persistent.player = new LuaMap();
    }
    FOWPState.persistent.player?.set(playerID, player);
    FOWPState.persistent.playerID = playerID;
  }

  return true;
}
