import { Direction } from "isaac-typescript-definitions";
import { PlayerIndex } from "isaacscript-common";

interface ITIBState {
  room: {
    isUsingTrueIceIceBow: boolean;
    currentFrame: number;
    currentDirection: Direction;
    transientState: boolean;
    familiars?: Seed[];
  };
  persistent: {
    baseMaxFireDelay: Record<PlayerIndex, number>;
    collectedItem: boolean;
    fpsPerTick: 0;
  };
}

export const TibState: ITIBState = {
  room: {
    isUsingTrueIceIceBow: false,
    currentFrame: 0,
    currentDirection: Direction.NO_DIRECTION,
    transientState: false,
    familiars: undefined,
  },
  persistent: {
    baseMaxFireDelay: {},
    collectedItem: false,
    fpsPerTick: 0,
  },
} as const;
