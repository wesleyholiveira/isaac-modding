import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { FOWPState } from "./states/fowpState";

export function FlaskWondrousPhysick(
  mod: Mod,
  saveManager: SaveDataManager,
): void {
  saveManager.saveDataManager("fowpState", FOWPState);

  Object.values(callbacks).forEach((c) => c(mod));
}
