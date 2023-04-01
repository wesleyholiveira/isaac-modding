import { FOWPState } from "@fowp/states/fowpState";
import { FamiliarVariantCustom } from "@shared/enums/FamiliarVariantCustom";
import {
  EntityType,
  FamiliarVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import { getPlayerFromEntity, getPlayerIndex } from "isaacscript-common";

export function preMalachiteFamiliarCollision(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_FAMILIAR_COLLISION,
    (familiar: EntityFamiliar, collider: Entity) => {
      const { statsPlayer } = FOWPState.persistent;
      const player = getPlayerFromEntity(familiar);
      if (player !== undefined) {
        const playerID = getPlayerIndex(player);
        const stats = statsPlayer[playerID];

        if (stats !== undefined) {
          // Isaac.ConsoleOutput(`${collider.EntityCollisionClass}\n`);
          const { malachite } = stats;
          const index = malachite?.findIndex(
            (m) => m !== undefined && m.seed === familiar.InitSeed,
          );

          // Isaac.ConsoleOutput(`EntityCollisionClass: ${
          // collider.EntityCollisionClass
          // }, GridCollision: ${
          // collider.GridCollisionClass
          // }, Enemy: ${collider.IsEnemy()}\n`);
          if (
            (collider.IsEnemy() &&
              collider.CollisionDamage > 0 &&
              collider.Type !== EntityType.FIREPLACE) ||
            collider.Type === EntityType.PROJECTILE
          ) {
            if (index !== undefined) {
              const m = malachite?.[index];

              if (m !== undefined) {
                Isaac.ConsoleOutput(`HP do familiar: ${m.hp}, ID: ${m.seed}\n`);
                if (m.hp > 0) {
                  if (collider.Type === EntityType.PROJECTILE) {
                    m.hp--;
                    collider.Die();
                  }

                  m.hp -= 0.5;
                } else {
                  stats.malachite?.splice(index, 1);
                  familiar.Die();
                }
              }
            }
          }
        }
      }

      return undefined;
    },
    FamiliarVariantCustom.FAMILIAR_MALACHITE as FamiliarVariant,
  );
}
