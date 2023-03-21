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
      .filter(
        ([key, wisp]) =>
          wisp.IsDead() && key === `${key.split(".")[0]}.${wisp.InitSeed}`,
      )
      .map(([tear]) => tear);

    if (tears.length > 0) {
      combinator?.combine(
        WispEffects,
        tears.map((tearKey) => parseInt(tearKey.split(".")[0] ?? "", 10)),
      );

      tears.forEach((tear, index) => {
        usedTears.splice(index, 1);
        wisps.delete(tear);
      });

      FOWPState.persistent.tearIndex -= tears.length;
      FOWPState.persistent.usedTears.sort();
    }
  });
}
