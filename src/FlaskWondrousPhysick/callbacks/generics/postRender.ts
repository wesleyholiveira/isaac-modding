import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { ModCallback } from "isaac-typescript-definitions";

export function postRender(mod: Mod): void {
  const s = Sprite();

  s.Load("gfx/ui/crystal_tears_hud.anm2", true);

  mod.AddCallback(ModCallback.POST_RENDER, () => {
    const player = Isaac.GetPlayer();
    const { items, extraSlots } = FOWPState.persistent;

    if (
      !FOWPState.persistent.stopped &&
      items !== undefined &&
      (player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
        player.HasCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        ))
    ) {
      const hudOffset = Options.HUDOffset * 10;

      for (
        let i = 0;
        i < Settings.FlaskWondrousPhysick.MAX_SLOTS + extraSlots;
        i++
      ) {
        const index = items[i]?.index ?? 0;
        s.SetFrame("HUD", index);
        s.RenderLayer(
          0,
          Vector(40, 43 + i * 12).add(Vector(hudOffset * 2, hudOffset * 1.2)),
        );

        s.Update();
      }
    }
  });
}
