import { FOWPState } from "@fowp/states/fowpState";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import {
  EntityType,
  ItemPoolType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { getRoomItemPoolType, VectorZero } from "isaacscript-common";

export function postNpcDeath(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NPC_DEATH, (npc: EntityNPC) => {
    const { bossDied } = FOWPState.room;
    const { droppedItems } = FOWPState.persistent;

    // Isaac.ConsoleOutput( `${bossDied}, ${npc.IsBoss()}, ${getRoomItemPoolType()}\n`, );
    if (
      !bossDied &&
      npc.IsBoss() &&
      getRoomItemPoolType() === ItemPoolType.BOSS
    ) {
      const items = Object.values(TrinketTypeCustom);
      const item = items[droppedItems] ?? -1;
      if (item !== -1) {
        Isaac.Spawn(
          EntityType.PICKUP,
          PickupVariant.TRINKET,
          item,
          npc.Position,
          VectorZero,
          undefined,
        );

        FOWPState.persistent.droppedItems++;
        FOWPState.room.bossDied = true;
      }
    }
  });
}
