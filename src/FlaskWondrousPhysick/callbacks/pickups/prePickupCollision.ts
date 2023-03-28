import { PlayerEffects } from "@fowp/items/player.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { TrinketTypeCustom } from "@shared/enums/TrinketTypeCustom";
import {
  EntityType,
  ModCallback,
  PickupVariant,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { getPlayerIndex, itemConfig, VectorZero } from "isaacscript-common";

export function prePickupCollision(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    main,
    PickupVariant.TRINKET,
  );
}

export function main(
  pickup: EntityPickup,
  collider: Entity,
): boolean | undefined {
  const HUD = Game().GetHUD();
  const { statsPlayer } = FOWPState.persistent;
  const player = collider.ToPlayer();

  if (player !== undefined) {
    const playerID =
      player.GetPlayerType() === PlayerType.SOUL_B
        ? getPlayerIndex(player.GetMainTwin())
        : getPlayerIndex(player);
    const stats = statsPlayer[playerID];

    if (stats !== undefined) {
      const { items, extraSlots } = stats;

      if (items !== undefined) {
        const crystalTrinkets = Object.values(TrinketTypeCustom)
          .sort()
          .map((trinket: number, index: number) => ({
            trinket,
            index,
          }))
          .filter((value) => value.trinket === pickup.SubType);

        const crystalTrinket = crystalTrinkets[0]?.trinket as TrinketType;
        const rarity = PlayerEffects[crystalTrinket]?.rarity;

        if (crystalTrinket !== undefined && rarity !== undefined) {
          HUD.ShowItemText(
            player,
            itemConfig.GetTrinket(crystalTrinket) as ItemConfigItem,
          );

          player.AnimateTrinket(crystalTrinket);
          if (crystalTrinket === TrinketTypeCustom.CRYSTAL_TEARS_SLOTS_UP) {
            stats.extraSlots = 1;
            pickup.Remove();

            return undefined;
          }

          if (
            items.length <
            Settings.FlaskWondrousPhysick.MAX_SLOTS + extraSlots
          ) {
            Isaac.ConsoleOutput(
              `Indice: ${crystalTrinkets[0]?.index}, Trinket: ${crystalTrinket}\n`,
            );
            items.push({
              index: (crystalTrinkets[0]?.index ?? -1) + 1,
              trinket: crystalTrinket,
            });

            pickup.Remove();
          } else {
            const firstSlotItem = items[0];
            if (firstSlotItem !== undefined) {
              items.shift();
              Isaac.Spawn(
                EntityType.PICKUP,
                PickupVariant.TRINKET,
                firstSlotItem.trinket,
                Vector(player.Position.X, player.Position.Y + 12),
                VectorZero,
                collider,
              );
            }
          }
          return true;
        }
      }
    }
  }

  return undefined;
}
