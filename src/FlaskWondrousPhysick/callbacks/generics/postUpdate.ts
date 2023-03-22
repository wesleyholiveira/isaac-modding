import { Combinator } from "@fowp/combinator";
import { WispEffects } from "@fowp/items/wisp.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";

let combinator: Combinator | undefined;
export function postUpdate(mod: Mod): void {
  const { player: statePlayer, playerID } = FOWPState.persistent;

  mod.AddCallback(ModCallback.POST_PLAYER_INIT, (player: EntityPlayer) => {
    if (combinator === undefined) {
      const sPlayer = statePlayer?.get(playerID);
      combinator = new Combinator(player);
      if (statePlayer !== undefined && sPlayer !== undefined) {
        combinator = new Combinator(sPlayer);
      }
    }
  });

  mod.AddCallback(ModCallback.POST_UPDATE, () => {
    const { wisps, usedTears } = FOWPState.persistent;
    const tears = Object.entries(wisps)
      .map(([key, wisp], index) => ({
        key,
        wisp,
        index,
        tear: parseInt(key.split(".")[0] ?? "", 10),
      }))
      .filter(
        ({ key, wisp, tear }) =>
          wisp.IsDead() && key === `${tear}.${wisp.InitSeed}`,
      );
    if (tears.length > 0) {
      combinator?.combine(
        WispEffects,
        tears.map((t) => t.tear),
      );

      tears.forEach(({ key, index }) => {
        usedTears.splice(index, 1);
        wisps.delete(key);
      });

      FOWPState.persistent.tearIndex -= tears.length;

      Isaac.ConsoleOutput(
        `Wisps deads:${tears.length}, Tears: ${tears.length}, TearIndex: ${FOWPState.persistent.tearIndex}\n`,
      );
    }
  });
}
