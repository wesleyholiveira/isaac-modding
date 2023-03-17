import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";

export function postTearUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, (tear: EntityTear) => {
    const { thornyDmgUp, missedShots } = FOWPState.room;
    const { dmgUp } = FOWPState.persistent;

    if (tear.IsDead()) {
      if (thornyDmgUp > 0 && missedShots >= 2) {
        FOWPState.room.thornyDmgUp = 0;

        const player = tear.Parent?.ToPlayer();
        if (player !== undefined && dmgUp > 0) {
          player.Damage -= FOWPState.persistent.dmgUp;
          FOWPState.persistent.dmgUp = 0;
        }
        FOWPState.room.missedShots = 0;
      }
      FOWPState.room.missedShots++;
    }
  });
}
