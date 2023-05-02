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
  const { lastPlayerID, statsPlayer } = FOWPState.persistent;
  const playerID = getPlayerIndex(player);
  const combinator = new Combinator(player);
  const stats = statsPlayer[playerID];

  if (stats !== undefined) {
    const { items } = stats;
    const trinketIDs = items?.map((trinket) => trinket.trinket).sort();

    if (trinketIDs !== undefined && trinketIDs.length > 0) {
      const { usedTears } = FOWPState.persistent;
      FOWPState.persistent.playerID = playerID;

      if (player.HasCollectible(CollectibleType.BOOK_OF_VIRTUES)) {
        if (usedTears !== undefined) {
          usedTears[playerID] = [...(usedTears[playerID] ?? []), ...trinketIDs];
        }

        trinketIDs.slice(1).forEach(() => {
          player.AddWisp(
            CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
            player.Position,
          );
        });

        if (lastPlayerID === undefined) {
          FOWPState.persistent.lastPlayerID = FOWPState.persistent.playerID;
        }
      }

      combinator.combine(PlayerEffects, trinketIDs);
    }
  }

  return true;
}
