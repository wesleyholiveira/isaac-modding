import { PlayerIndex } from "isaacscript-common";

interface IFOWPState {
  room: {
    changed: boolean;
    bossDied: boolean;
  };
  persistent: {
    statsPlayer: Record<
      PlayerIndex,
      {
        dmgUp: number;
        tearsUp: number;
        thornyDmgUp: number;
        missedShots: number;
        fireMind: boolean;
        deadEye: boolean;
        malachite?:
          | Array<
              | {
                  hp: number;
                  seed: number;
                  offset: Vector;
                }
              | undefined
            >
          | undefined;
        wispMalachite: boolean;
        items?: Array<{ index: number; trinket: number }> | undefined;
        droppedItems: [{ id: number; rarity: number }];
        extraSlots: number;
        tearIndex: number;
      }
    >;
    stopped: boolean;
    frameCount: number;
    usedTears?: Record<PlayerIndex, number[]> | undefined;
    wisps: LuaMap<PlayerIndex, Entity[]>;
    playerID: PlayerIndex;
    lastPlayerID?: PlayerIndex | undefined;
    color: LuaMap<Seed, Color>;
  };
}

export const FOWPState: IFOWPState = {
  room: {
    changed: false,
    bossDied: false,
  },
  persistent: {
    statsPlayer: {},
    stopped: false,
    frameCount: 0,
    usedTears: [] as unknown as never,
    wisps: {} as LuaMap<PlayerIndex, Entity[]>,
    playerID: 0 as PlayerIndex,
    color: {} as LuaMap<Seed, Color>,
    lastPlayerID: undefined,
  },
} as const;
