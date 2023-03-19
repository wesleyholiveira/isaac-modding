import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./callbacks";
import { TibState } from "./states/tibState";

export function TrueIceBow(mod: Mod, saveManager: SaveDataManager): void {
  saveManager.saveDataManager("tibState", TibState);

  Object.values(callbacks).forEach((callback) => callback(mod));
}
