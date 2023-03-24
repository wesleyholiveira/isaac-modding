import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { ModCallback, PlayerType } from "isaac-typescript-definitions";
import {
  getPlayerFromIndex,
  getPlayerIndexVanilla,
  PlayerIndex,
} from "isaacscript-common";

export function postRender(mod: Mod): void {
  const s = Sprite();

  s.Load("gfx/ui/crystal_tears_hud.anm2", true);

  mod.AddCallback(ModCallback.POST_RENDER, () => {
    const { statsPlayer } = FOWPState.persistent;
    const playerIDs = Object.keys(statsPlayer);
    playerIDs.forEach((pID: string) => {
      const playerID = parseInt(pID, 10) as PlayerIndex;
      const player = getPlayerFromIndex(playerID);
      const stats = statsPlayer[playerID];

      if (player !== undefined) {
        if (
          !FOWPState.persistent.stopped &&
          (player.HasCollectible(
            CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
          ) ||
            player.HasCollectible(
              CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
            ))
        ) {
          if (stats !== undefined) {
            let modifier = 1;

            const coords = Vector(40, 43);

            const { items, extraSlots } = stats;
            // Isaac.ConsoleOutput(`Player: ${getPlayerIndexVanilla(player)}\n`);
            const hudOffset = Options.HUDOffset * 10;
            const vanillaIndex = getPlayerIndexVanilla(player);

            switch (vanillaIndex) {
              case 0:
                if (player.GetPlayerType() === PlayerType.ISAAC_B) {
                  coords.X = 48;
                  coords.Y = 66;
                }

                if (player.GetPlayerType() === PlayerType.BLUE_BABY_B) {
                  coords.X = 48;
                  coords.Y = 61;
                }
                break;
              case 1:
                if (player.GetPlayerType() === PlayerType.ESAU) {
                  coords.X = 442;
                  coords.Y = 218;
                  modifier = -1;
                } else {
                  coords.X = 357;
                  modifier = 1;
                }
                break;
              default:
                coords.X = 357;
                modifier = 1;
                break;
            }

            for (
              let i = 0;
              i < Settings.FlaskWondrousPhysick.MAX_SLOTS + extraSlots;
              i++
            ) {
              const index = items?.[i]?.index ?? 0;
              s.SetFrame("HUD", index);
              s.RenderLayer(
                0,
                Vector(coords.X + modifier * i * 14, coords.Y).add(
                  Vector(hudOffset * 2, hudOffset * 1.2),
                ),
              );

              s.Update();
            }
          }
        }
      }
    });
  });
}
