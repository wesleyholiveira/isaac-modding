import { Direction } from "isaac-typescript-definitions";
import { PlayerIndex } from "isaacscript-common";

interface ITIBState {
  room: {};
  persistent: {
    playerID: PlayerIndex;
    player: Record<
      PlayerIndex,
      {
        isUsingTrueIceIceBow: boolean;
        currentFrame: number;
        currentDirection: Direction;
        transientState: boolean;
        familiars?: Seed[];
        baseMaxFireDelay: number;
        collectedItem: boolean;
        fpsPerTick: number;
      }
    >;
  };
}

export const TibState: ITIBState = {
  room: {},
  persistent: {
    playerID: 0 as PlayerIndex,
    player: {},
  },
} as const;
