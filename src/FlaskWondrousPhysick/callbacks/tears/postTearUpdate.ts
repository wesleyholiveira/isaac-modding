import { WispEffects } from "@fowp/items/wisp.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { Color2ID } from "@shared/helpers/Color";
import { ModCallback } from "isaac-typescript-definitions";
import { getPlayerIndex, getRandomInt, PlayerIndex } from "isaacscript-common";

export function postTearUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, (tear: EntityTear) => {
    const { wisps, statsPlayer } = FOWPState.persistent;

    const player = tear.Parent?.ToPlayer();
    const playerIndex = tear.GetData()["playerIndex"] as PlayerIndex;
    const parent = tear.Parent;

    const familiar = parent?.ToFamiliar();
    if (familiar !== undefined) {
      Object.keys(wisps).forEach((key: PlayerIndex) => {
        const wisp = wisps.get(key);
        const filteredWisps = wisp?.filter(
          (w) => w.InitSeed === familiar.InitSeed && !w.IsDead(),
        );
        if (
          filteredWisps !== undefined &&
          filteredWisps.length > 0 &&
          tear.GetData()["proc"] === undefined
        ) {
          const chance = getRandomInt(1, 100);
          const cTear = Color2ID(familiar.GetColor());
          const effect = WispEffects[cTear];

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

    if (player !== undefined && playerIndex === getPlayerIndex(player)) {
      const stats = statsPlayer[playerIndex];

      if (stats !== undefined) {
        const { dmgUp, thornyDmgUp, missedShots } = stats;
        if (tear.IsDead()) {
          if (thornyDmgUp > 0 && missedShots >= 2) {
            stats.thornyDmgUp = 0;

            if (dmgUp > 0) {
              player.Damage -= dmgUp;
              stats.dmgUp = 0;
            }
            stats.missedShots = 0;
          }
          stats.missedShots++;
        }
      }
    }
  });
}
