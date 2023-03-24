import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerFromIndex, getPlayerIndex } from "isaacscript-common";

export function postTearInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_INIT, (tear: EntityTear) => {
    const { playerID } = FOWPState.persistent;

    const player: EntityPlayer | undefined = getPlayerFromIndex(playerID);
    if (player !== undefined) {
      tear.Parent = player;
      tear.GetData()["playerIndex"] = getPlayerIndex(player);
    }
  });
}
