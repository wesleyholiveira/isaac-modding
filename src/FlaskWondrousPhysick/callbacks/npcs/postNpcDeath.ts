import { FOWPState } from "@fowp/states/fowpState";
import {
  EntityType,
  ItemPoolType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  getRandomArrayElement,
  getRandomInt,
  getRoomItemPoolType,
  VectorZero,
} from "isaacscript-common";

import { PlayerEffects } from "@fowp/items/player.effects";
import { Rarity } from "@shared/enums/Rarity";

export function postNpcDeath(mod: Mod): void {
  const rarities = Object.values(Rarity).sort((a, b) => b - a);
  mod.AddCallback(ModCallback.POST_NPC_DEATH, (npc: EntityNPC) => {
    const { playerID, statsPlayer } = FOWPState.persistent;
    const { bossDied } = FOWPState.room;
    const items = Object.entries(PlayerEffects);
    const stats = statsPlayer[playerID];

    if (
      stats !== undefined &&
      !bossDied &&
      npc.IsBoss() &&
      getRoomItemPoolType() === ItemPoolType.BOSS
    ) {
      const { items: slots, droppedItems } = stats;

      if (
        slots !== undefined &&
        slots.length > 0 &&
        droppedItems.length !== items.length
      ) {
        const chance = getRandomInt(0, 100);

        if (chance !== 0) {
          for (const rarity of rarities) {
            Isaac.ConsoleOutput(
              `matou o boss: ${npc.GetBossID()}, raridade: ${rarity}, chance: ${chance}\n`,
            );
            if (chance <= rarity) {
              const crystalTearsObtained = items.filter(
                (item) =>
                  item[1].rarity === rarity &&
                  droppedItems.every(
                    (droppedItem) => droppedItem.id !== parseInt(item[0], 10),
                  ),
              );
              if (crystalTearsObtained.length > 0) {
                const item = getRandomArrayElement(crystalTearsObtained);
                const id = parseInt(item[0], 10);

                Isaac.Spawn(
                  EntityType.PICKUP,
                  PickupVariant.TRINKET,
                  id,
                  npc.Position,
                  VectorZero,
                  undefined,
                );

                droppedItems.push({
                  rarity,
                  id,
                });
                FOWPState.room.bossDied = true;
                break;
              }
            }
          }
        }
      }
    }
  });
}
