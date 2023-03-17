import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { ModCallback } from "isaac-typescript-definitions";

export function preTearCollision(mod: Mod): void {
  const MAX_DMG = Settings.FlaskWondrousPhysick.DEAD_EYE_MAX_DMG;
  const tearTick = 1 / Settings.FlaskWondrousPhysick.DEAD_EYE_SHOOTS_TO_MAX_DMG;

  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, (tear: EntityTear) => {
    if (FOWPState.persistent.deadEye) {
      const { thornyDmgUp } = FOWPState.room;
      if (thornyDmgUp < 1.0) {
        FOWPState.room.thornyDmgUp += tearTick;
        FOWPState.room.missedShots = 0;

        const player = tear.Parent?.ToPlayer();
        const dmg = MAX_DMG * tearTick;
        if (player !== undefined && dmg < MAX_DMG) {
          player.Damage += dmg;
          FOWPState.persistent.dmgUp += dmg;
        }
      }
    }

    return undefined;
  });
}
