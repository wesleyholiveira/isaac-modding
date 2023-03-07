import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { FOWPState } from "./states/fowpState";

export function FlaskWondrousPhysick(
  mod: Mod,
  saveManager: SaveDataManager,
): void {
  const {
    postGameStarted,
    postEnterRoom,
    postUseItem,
    prePickupCollision,
    postRender,
    postPlayerUpdate,
    postNpcDeath,
  } = callbacks;
  saveManager.saveDataManager("fowpState", FOWPState);

  postGameStarted(mod);
  postRender(mod);
  postPlayerUpdate(mod);
  postNpcDeath(mod);
  prePickupCollision(mod);
  postEnterRoom(mod);
  postUseItem(mod);
}
