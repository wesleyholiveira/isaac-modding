import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { TibState } from "@tib/states/tibState";
import {
  EntityType,
  ModCallback,
  TearFlag,
  TearVariant,
} from "isaac-typescript-definitions";
import { getPlayerFromIndex } from "isaacscript-common";

export function postTearUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, main);
}

function main(tear: EntityTear) {
  const { playerID, player: statePlayer } = TibState.persistent;
  const player = getPlayerFromIndex(playerID);
  const parent = tear.Parent;
  const state = statePlayer[playerID];

  if (
    player !== undefined &&
    state !== undefined &&
    player.HasCollectible(CollectibleTypeCustom.TRUE_ICE_BOW) &&
    parent?.Type === EntityType.FAMILIAR
  ) {
    const { familiars } = state;
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
