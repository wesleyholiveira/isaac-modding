interface IFOWPState {
  room: {
    bossDied: boolean;
    thornyDmgUp: number;
    stopped: boolean;
  };
  persistent: {
    tearsUp: number;
    dmgUp: number;
    baseDamage: number;
    extraSlots: number;
    items?: Array<{ index: number; trinket: number }>;
    droppedItems: [{ id: number; rarity: number }];
    invoked: boolean;
    fireMind: boolean;
    deadEye: boolean;
  };
}

export const FOWPState: IFOWPState = {
  room: {
    bossDied: false,
    thornyDmgUp: 0,
    stopped: false,
  },
  persistent: {
    tearsUp: 0,
    dmgUp: 0,
    baseDamage: 0,
    extraSlots: 0,
    items: undefined,
    droppedItems: [] as unknown as never,
    invoked: false,
    deadEye: false,
    fireMind: false,
  },
} as const;
