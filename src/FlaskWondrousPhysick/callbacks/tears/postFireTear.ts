import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback, TearVariant } from "isaac-typescript-definitions";
import { getPlayerIndex, PlayerIndex } from "isaacscript-common";

export function postFireTear(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, (tear: EntityTear) => {
    const { statsPlayer } = FOWPState.persistent;
    const player = tear.Parent?.ToPlayer();

    if (player !== undefined) {
      const playerIndex = tear.GetData()["playerIndex"] as PlayerIndex;
      if (playerIndex === getPlayerIndex(player)) {
        const stats = statsPlayer[playerIndex];

        if (stats !== undefined) {
          const { deadEye, fireMind } = stats;
          if (fireMind) {
            tear.ChangeVariant(TearVariant.FIRE_MIND);
          }

          if (deadEye) {
            const { thornyDmgUp } = stats;
            tear.SetDeadEyeIntensity(thornyDmgUp);
          }
        }
      }
    }
  });
}
