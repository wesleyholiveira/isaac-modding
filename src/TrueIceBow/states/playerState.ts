import { Direction } from "isaac-typescript-definitions";
import { PlayerIndex } from "isaacscript-common";

export const playerState = {
  room: {
    isUsingTrueIceIceBow: false,
    currentFrame: 1,
    currentDirection: Direction.NO_DIRECTION,
    transientState: false,
  },
  persistent: {
    baseMaxFireDelay: {} as Record<PlayerIndex, number>,
    collectedItem: false,
  },
};
