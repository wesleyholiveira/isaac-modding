import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { playerState } from "./states/playerState";

export default function (mod: Mod, saveManager: SaveDataManager): void {
  const {
    postGameStarted,
    postUseItem,
    postInputAction,
    postPlayerUpdate,
    postTearUpdate,
    postGameEnd,
  } = callbacks;

  saveManager.saveDataManager("trueIceBowTearsDelay", playerState);

  postGameStarted(mod);
  postUseItem(mod);
  postInputAction(mod);
  postPlayerUpdate(mod);
  postTearUpdate(mod);
  postGameEnd(mod);
}
