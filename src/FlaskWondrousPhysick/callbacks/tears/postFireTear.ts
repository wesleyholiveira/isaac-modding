import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback, TearVariant } from "isaac-typescript-definitions";

export function postFireTear(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, (tear: EntityTear) => {
    if (FOWPState.persistent.fireMind) {
      tear.ChangeVariant(TearVariant.FIRE_MIND);
    }

    if (FOWPState.persistent.deadEye) {
      const { thornyDmgUp } = FOWPState.room;
      tear.SetDeadEyeIntensity(thornyDmgUp);
    }
  });
}
