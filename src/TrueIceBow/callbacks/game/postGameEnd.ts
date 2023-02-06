import { ModCallback } from "isaac-typescript-definitions";

export function postGameEnd(mod: Mod) {
  mod.AddCallback(ModCallback.POST_GAME_END, main);
}

function main(isGameOver: boolean) {}
