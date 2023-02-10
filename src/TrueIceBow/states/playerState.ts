import { Direction } from "isaac-typescript-definitions";
import { PlayerIndex } from "isaacscript-common";

export const playerState = {
  room: {
    isUsingTrueIceIceBow: false,
    currentFrame: 0,
    currentDirection: Direction.NO_DIRECTION,
    transientState: false,
    familiars: [] as number[],
  },
  persistent: {
    baseMaxFireDelay: {} as Record<PlayerIndex, number>,
    collectedItem: false,
    fpsPerTick: 0,
  },
};
