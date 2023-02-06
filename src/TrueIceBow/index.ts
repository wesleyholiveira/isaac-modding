import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { playerState } from "./states/playerState";

export default function (mod: Mod, saveManager: SaveDataManager): void {
  const {
    postGameStarted,
    postUseItem,
    postInputAction,
    postPlayerUpdate,
    postPickupCollectibleUpdate,
    postTearUpdate,
    postGameEnd,
  } = callbacks;

  saveManager.saveDataManager("trueIceBowTearsDelay", playerState);

  postGameStarted(mod);
  postUseItem(mod);
  postInputAction(mod);
  postPlayerUpdate(mod);
  postPickupCollectibleUpdate(mod);
  postTearUpdate(mod);
  postGameEnd(mod);
}
