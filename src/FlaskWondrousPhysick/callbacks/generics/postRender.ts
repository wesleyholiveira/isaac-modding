import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { ModCallback, PlayerType } from "isaac-typescript-definitions";

export function postRender(mod: Mod): void {
  const s = Sprite();

  s.Load("gfx/ui/crystal_tears_hud.anm2", true);

  mod.AddCallback(ModCallback.POST_RENDER, () => {
    let twinEval = false;
    const player = Isaac.GetPlayer();
    const twin = player.GetOtherTwin();
    const { items, extraSlots } = FOWPState.persistent;

    const coords = Vector(40, 43);
    let modifier = 1;

    if (
      twin !== undefined &&
      (twin.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
        twin.HasCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        ))
    ) {
      coords.X = 442;
      coords.Y = 218;
      modifier = -1;
      twinEval = true;
    }

    if (
      !FOWPState.persistent.stopped &&
      items !== undefined &&
      (player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
        player.HasCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        ) ||
        twinEval)
    ) {
      const hudOffset = Options.HUDOffset * 10;
      if (player.GetPlayerType() === PlayerType.ISAAC_B) {
        coords.X = 48;
        coords.Y = 66;
      }

      if (player.GetPlayerType() === PlayerType.BLUE_BABY_B) {
        coords.X = 48;
        coords.Y = 61;
      }

      for (
        let i = 0;
        i < Settings.FlaskWondrousPhysick.MAX_SLOTS + extraSlots;
        i++
      ) {
        const index = items[i]?.index ?? 0;
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
  });
}
