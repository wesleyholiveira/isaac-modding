import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import { FlaskWondrousPhysick } from "./FlaskWondrousPhysick";
import { TrueIceBow } from "./TrueIceBow";

main();

function main() {
  const MOD_NAME = "Molesker Modding";

  const mod = RegisterMod(MOD_NAME, 1);
  const saveManager = new SaveDataManager();

  TrueIceBow(mod, saveManager);
  FlaskWondrousPhysick(mod, saveManager);
}
