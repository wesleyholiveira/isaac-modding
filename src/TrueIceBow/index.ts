import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import { postGameEnd } from "./callbacks/postGameEnd";
import { postGameStarted } from "./callbacks/postGameStarted";
import { postInputAction } from "./callbacks/postInputAction";
import { postPickupCollectible } from "./callbacks/postPickupCollectible";
import { postPlayerUpdate } from "./callbacks/postPlayerUpdate";
import { postTearUpdate } from "./callbacks/postTearUpdate";
import { postUseItem } from "./callbacks/postUseItem";
import { playerState } from "./states/playerState";

export default function (mod: Mod, saveManager: SaveDataManager): void {
  saveManager.saveDataManager("trueIceBowTearsDelay", playerState);

  postGameStarted(mod);
  postUseItem(mod);
  postInputAction(mod);
  postPlayerUpdate(mod);
  postPickupCollectible(mod);
  postTearUpdate(mod);
  postGameEnd(mod);
}
