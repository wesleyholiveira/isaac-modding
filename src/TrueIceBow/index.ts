import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { playerState } from "./states/playerState";

export function TrueIceBow(mod: Mod, saveManager: SaveDataManager): void {
  const { postGameStarted, postUseItem, postPlayerUpdate, postTearUpdate } =
    callbacks;

  saveManager.saveDataManager("playerState", playerState);

  postGameStarted(mod);
  postUseItem(mod);
  postPlayerUpdate(mod);
  postTearUpdate(mod);
}
