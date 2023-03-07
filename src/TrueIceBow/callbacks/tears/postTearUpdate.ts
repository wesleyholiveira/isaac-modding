import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TibState } from "@tib/states/tibState";
import {
  EntityType,
  ModCallback,
  TearFlag,
  TearVariant,
} from "isaac-typescript-definitions";

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
    const { familiars } = TibState.room;
    const familiar = parent.ToFamiliar();

    if (familiars !== undefined && familiar !== undefined) {
      if (tear.HasTearFlags(TearFlag.ICE) && tear.Variant === TearVariant.ICE) {
        tear.AddTearFlags(TearFlag.SLOW);

        if (!familiars.includes(familiar.InitSeed)) {
          familiars.push(familiar.InitSeed);
        }
      }
    }
  }
}
