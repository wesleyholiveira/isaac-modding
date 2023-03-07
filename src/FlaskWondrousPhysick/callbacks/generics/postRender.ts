import { FOWPState } from "@fowp/states/fowpState";
import { Settings } from "@shared/config";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { ModCallback } from "isaac-typescript-definitions";

export function postRender(mod: Mod): void {
  const s = Sprite();

  s.Load("gfx/ui/crystal_tears_hud.anm2", true);

  mod.AddCallback(ModCallback.POST_RENDER, () => {
    const player = Isaac.GetPlayer();
    const { items } = FOWPState.persistent;

    if (
      items !== undefined &&
      (player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) ||
        player.HasCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        ))
    ) {
      const hudOffset = Options.HUDOffset * 10;
      for (let i = 0; i < Settings.FlaskWondrousPhysick.MAX_SLOTS; i++) {
        const index = items[i]?.index ?? 0;
        s.SetFrame("HUD", index);
        s.RenderLayer(
          0,
          Vector(40 + i * 12, 43).add(Vector(hudOffset * 2, hudOffset * 1.2)),
        );
        s.Update();
      }
    }
  });
}
