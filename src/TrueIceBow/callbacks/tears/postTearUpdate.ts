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
  const parent = tear.Parent;

  if (parent?.Type === EntityType.FAMILIAR) {
    if (tear.HasTearFlags(TearFlag.ICE) && tear.Variant === TearVariant.ICE) {
      tear.AddTearFlags(TearFlag.SLOW);
    }
  }
}
