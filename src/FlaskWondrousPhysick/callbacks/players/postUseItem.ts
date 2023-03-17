import { Combinator } from "@fowp/combinator";
import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import {
  CollectibleType,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";

let combinator: Combinator;
// let sprite: ChargeBarSprites;
export function postUseItem(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, (player: EntityPlayer) => {
    combinator = new Combinator(player);
  });

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    main,
    CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
  );
}

function main(
  _collectibleType: CollectibleType,
  _rng: RNG,
  _player: EntityPlayer,
  _useFlags: BitFlags<UseFlag>,
  _activeSlot: int,
  _customVarData: int,
): boolean {
  const trinketIDs = FOWPState.persistent.items
    ?.map((trinket) => trinket.trinket)
    .sort();
  const charges = combinator
    .combine(trinketIDs)
    .reduce((acc, value) => acc + value);

  // Isaac.ConsoleOutput(`Charges: ${charges}\n`);
  return true;
}
