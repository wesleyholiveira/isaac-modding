import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback, TearVariant } from "isaac-typescript-definitions";
import { getPlayerIndex, PlayerIndex } from "isaacscript-common";

export function postFireTear(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, (tear: EntityTear) => {
    const player = tear.Parent?.ToPlayer();

    if (player !== undefined) {
      const playerIndex = tear.GetData()["playerIndex"] as PlayerIndex;
      if (playerIndex === getPlayerIndex(player)) {
        if (FOWPState.persistent.fireMind) {
          tear.ChangeVariant(TearVariant.FIRE_MIND);
        }

        if (FOWPState.persistent.deadEye) {
          const { thornyDmgUp } = FOWPState.room;
          tear.SetDeadEyeIntensity(thornyDmgUp);
        }
      }
    }
  });
}
