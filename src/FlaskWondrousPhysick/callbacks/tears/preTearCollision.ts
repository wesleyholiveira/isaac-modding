import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex, PlayerIndex } from "isaacscript-common";

export function preTearCollision(mod: Mod): void {
  const MAX_DMG = Settings.FlaskWondrousPhysick.DEAD_EYE_MAX_DMG;
  const tearTick = 1 / Settings.FlaskWondrousPhysick.DEAD_EYE_SHOOTS_TO_MAX_DMG;

  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, (tear: EntityTear) => {
    const { statsPlayer } = FOWPState.persistent;
    const player = tear.Parent?.ToPlayer();
    const playerIndex = tear.GetData()["playerIndex"] as PlayerIndex;
    if (player !== undefined && playerIndex === getPlayerIndex(player)) {
      const stats = statsPlayer[playerIndex];
      if (stats !== undefined) {
        const { thornyDmgUp, deadEye } = stats;
        if (deadEye) {
          if (thornyDmgUp < 1.0) {
            stats.thornyDmgUp += tearTick;
            stats.missedShots = 0;

            const dmg = MAX_DMG * tearTick;
            if (dmg < MAX_DMG) {
              player.Damage += dmg;
              stats.dmgUp += dmg;
            }
          }
        }
      }
    }

    return undefined;
  });
}
