import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { ModCallback } from "isaac-typescript-definitions";

export function postTears(mod: Mod): void {
  const MAX_DMG = Settings.FlaskWondrousPhysick.DEAD_EYE_MAX_DMG;
  const tearTick = 1 / Settings.FlaskWondrousPhysick.DEAD_EYE_SHOOTS_TO_MAX_DMG;
  let missedShots = 0;

  mod.AddCallback(ModCallback.POST_FIRE_TEAR, (tear: EntityTear) => {
    if (FOWPState.persistent.deadEye) {
      const { thornyDmgUp } = FOWPState.room;
      tear.SetDeadEyeIntensity(thornyDmgUp);
    }
  });

  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, (tear: EntityTear) => {
    const { thornyDmgUp } = FOWPState.room;
    const { dmgUp } = FOWPState.persistent;

    if (tear.IsDead()) {
      if (thornyDmgUp > 0 && missedShots >= 2) {
        FOWPState.room.thornyDmgUp = 0;

        const player = tear.Parent?.ToPlayer();
        if (player !== undefined && dmgUp > 0) {
          player.Damage -= FOWPState.persistent.dmgUp;
          FOWPState.persistent.dmgUp = 0;
        }
        missedShots = 0;
      }
      missedShots++;
    }
  });

  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, (tear: EntityTear) => {
    if (FOWPState.persistent.deadEye) {
      const { thornyDmgUp } = FOWPState.room;
      if (thornyDmgUp < 1.0) {
        FOWPState.room.thornyDmgUp += tearTick;
        missedShots = 0;

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
