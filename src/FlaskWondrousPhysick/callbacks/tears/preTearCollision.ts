import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex, PlayerIndex } from "isaacscript-common";

export function preTearCollision(mod: Mod): void {
  const MAX_DMG = Settings.FlaskWondrousPhysick.DEAD_EYE_MAX_DMG;
  const tearTick = 1 / Settings.FlaskWondrousPhysick.DEAD_EYE_SHOOTS_TO_MAX_DMG;

  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, (tear: EntityTear) => {
    const player = tear.Parent?.ToPlayer();
    const playerIndex = tear.GetData()["playerIndex"] as PlayerIndex;
    if (player !== undefined && playerIndex === getPlayerIndex(player)) {
      if (FOWPState.persistent.deadEye) {
        const { thornyDmgUp } = FOWPState.room;
        if (thornyDmgUp < 1.0) {
          FOWPState.room.thornyDmgUp += tearTick;
          FOWPState.room.missedShots = 0;

          const dmg = MAX_DMG * tearTick;
          if (dmg < MAX_DMG) {
            player.Damage += dmg;
            FOWPState.persistent.dmgUp += dmg;
          }
        }
      }
    }

    return undefined;
  });
}
