interface IFOWPState {
  room: {
    bossDied: boolean;
    thornyDmgUp: number;
  };
  persistent: {
    tearsUp: number;
    dmgUp: number;
    baseDamage: number;
    items?: Array<{ index: number; trinket: number }>;
    droppedItems?: number[];
    invoked: boolean;
    deadEye: boolean;
  };
}

export const FOWPState: IFOWPState = {
  room: {
    bossDied: false,
    thornyDmgUp: 0,
  },
  persistent: {
    tearsUp: 0,
    dmgUp: 0,
    baseDamage: 0,
    items: undefined,
    droppedItems: undefined,
    invoked: false,
    deadEye: false,
  },
} as const;
