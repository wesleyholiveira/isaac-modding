import { PlayerIndex } from "isaacscript-common";

interface IFOWPState {
  room: {
    bossDied: boolean;
    thornyDmgUp: number;
    missedShots: number;
  };
  persistent: {
    tearsUp: number;
    dmgUp: number;
    baseDamage: number;
    extraSlots: number;
    items?: Array<{ index: number; trinket: number }> | undefined;
    droppedItems: [{ id: number; rarity: number }];
    fireMind: boolean;
    deadEye: boolean;
    malachite?:
      | Array<{ hp: number; seed?: number; offset: Vector }>
      | undefined;
    stopped: boolean;
    frameCount: number;
    usedTears: number[];
    tearIndex: number;
    wisps: LuaMap<string, Entity>;
    player?: LuaMap<PlayerIndex, EntityPlayer> | undefined;
    playerID: PlayerIndex;
    wispDeadEye: boolean;
    wispFireMind: boolean;
    wispLightning: boolean;
    wispMalachite: boolean;
  };
}

export const FOWPState: IFOWPState = {
  room: {
    bossDied: false,
    thornyDmgUp: 0,
    missedShots: 0,
  },
  persistent: {
    tearsUp: 0,
    dmgUp: 0,
    baseDamage: 0,
    extraSlots: 0,
    items: undefined,
    droppedItems: [] as unknown as never,
    deadEye: false,
    fireMind: false,
    malachite: undefined,
    stopped: false,
    frameCount: 0,
    usedTears: [] as unknown as never,
    tearIndex: 0,
    wisps: {} as LuaMap<string, Entity>,
    player: undefined,
    playerID: 0 as PlayerIndex,
    wispDeadEye: false,
    wispFireMind: false,
    wispLightning: false,
    wispMalachite: false,
  },
} as const;
