import { FOWPState } from "@fowp/states/fowpState";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex, getRandomInt, PlayerIndex } from "isaacscript-common";
import { WispEffects } from "../../items/wisp.effects";

export function postTearUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, (tear: EntityTear) => {
    const { thornyDmgUp, missedShots } = FOWPState.room;
    const { dmgUp, wisps } = FOWPState.persistent;

    const parent = tear.Parent;

    const familiar = parent?.ToFamiliar();
    if (familiar !== undefined) {
      Object.keys(wisps).forEach((key) => {
        const wisp = wisps.get(key);
        if (
          familiar.InitSeed === wisp?.InitSeed &&
          !wisp.IsDead() &&
          tear.GetData()["proc"] === undefined
        ) {
          const chance = getRandomInt(1, 100);
          const t = key.split(".")[0] ?? "";
          const parsedTear = parseInt(t, 10);
          const effect = WispEffects[parsedTear];

          tear.GetData()["proc"] = true;

          if (effect !== undefined) {
            const { tears: wispTears } = effect;
            if (
              wispTears !== undefined &&
              wispTears.chance !== undefined &&
              !tear.HasTearFlags(wispTears.flag) &&
              tear.Variant !== wispTears.variant &&
              chance <= wispTears.chance
            ) {
              tear.SetColor(familiar.GetColor(), 0, 0);
              tear.AddTearFlags(wispTears.flag);

              if (wispTears.damage !== undefined) {
                tear.CollisionDamage *= wispTears.damage;
              }

              if (wispTears.variant !== undefined) {
                tear.ChangeVariant(wispTears.variant);
              }
            }
          }
        }
      });
    }

    const player = tear.Parent?.ToPlayer();
    const playerIndex = tear.GetData()["playerIndex"] as PlayerIndex;
    if (player !== undefined && playerIndex === getPlayerIndex(player)) {
      if (tear.IsDead()) {
        if (thornyDmgUp > 0 && missedShots >= 2) {
          FOWPState.room.thornyDmgUp = 0;

          if (dmgUp > 0) {
            player.Damage -= FOWPState.persistent.dmgUp;
            FOWPState.persistent.dmgUp = 0;
          }
          FOWPState.room.missedShots = 0;
        }
        FOWPState.room.missedShots++;
      }
    }
  });
}
