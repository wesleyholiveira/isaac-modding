import { FOWPState } from "@fowp/states/fowpState";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import {
  EntityType,
  ItemPoolType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  getRandomArrayIndex,
  getRoomItemPoolType,
  VectorZero,
} from "isaacscript-common";

export function postNpcDeath(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NPC_DEATH, (npc: EntityNPC) => {
    const { bossDied } = FOWPState.room;
    const { droppedItems } = FOWPState.persistent;
    const items = Object.values(TrinketTypeCustom);

    // Isaac.ConsoleOutput( `${bossDied}, ${npc.IsBoss()}, ${getRoomItemPoolType()}\n`, );
    if (
      !bossDied &&
      npc.IsBoss() &&
      getRoomItemPoolType() === ItemPoolType.BOSS &&
      droppedItems?.length !== items.length
    ) {
      let item = items[getRandomArrayIndex(items)] ?? -1;

      while (
        droppedItems !== undefined &&
        droppedItems.filter((value) => value === item).length > 0
      ) {
        item = items[getRandomArrayIndex(items)] ?? -1;
      }

      Isaac.Spawn(
        EntityType.PICKUP,
        PickupVariant.TRINKET,
        item,
        npc.Position,
        VectorZero,
        undefined,
      );

      FOWPState.room.bossDied = true;
    }
  });
}
