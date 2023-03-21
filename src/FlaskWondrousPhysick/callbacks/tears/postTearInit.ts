import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common";

export function postTearInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_INIT, (tear: EntityTear) => {
    const { player: statePlayer, playerID } = FOWPState.persistent;

    const player: EntityPlayer | undefined = statePlayer?.get(playerID);
    if (player !== undefined) {
      tear.Parent = player;
      tear.GetData()["playerIndex"] = getPlayerIndex(player);
    }
  });
}
