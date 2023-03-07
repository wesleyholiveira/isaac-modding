import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { postEnterRoom } from "./callbacks/rooms/postEnterRoom";
import { TibState } from "./states/tibState";

export function TrueIceBow(mod: Mod, saveManager: SaveDataManager): void {
  const { postGameStarted, postUseItem, postPlayerUpdate, postTearUpdate } =
    callbacks;

  saveManager.saveDataManager("tibState", TibState);

  postGameStarted(mod);
  postEnterRoom(mod);
  postUseItem(mod);
  postPlayerUpdate(mod);
  postTearUpdate(mod);
}
