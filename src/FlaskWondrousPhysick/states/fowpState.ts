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
    malachite?: Array<{ orbit: number; hp: number; seed?: number }> | undefined;
    stopped: boolean;
    frameCount: number;
    usedTears: number[];
    wisps: LuaMap<number, Entity>;
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
    wisps: {} as LuaMap<number, Entity>,
  },
} as const;
