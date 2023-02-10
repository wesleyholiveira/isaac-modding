import {
  EntityType,
  ModCallback,
  TearFlag,
  TearVariant,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { playerState } from "../../states/playerState";

export function postTearUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, main);
}

function main(tear: EntityTear) {
  const player = Isaac.GetPlayer();
  const parent = tear.Parent;

  if (
    parent?.Type === EntityType.FAMILIAR &&
    player.HasCollectible(CollectibleTypeCustom.TRUE_ICE_BOW)
  ) {
    const { familiars } = playerState.room;
    const familiar = parent.ToFamiliar();

    if (familiar !== undefined) {
      if (tear.HasTearFlags(TearFlag.ICE) && tear.Variant === TearVariant.ICE) {
        tear.AddTearFlags(TearFlag.SLOW);

        if (!familiars.includes(familiar.InitSeed)) {
          playerState.room.familiars.push(familiar.InitSeed);
        }
      }
    }
  }
}
