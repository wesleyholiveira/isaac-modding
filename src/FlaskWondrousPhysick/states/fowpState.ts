interface IFOWPState {
  room: {
    bossDied: boolean;
  };
  persistent: {
    tearsUp: number;
    dmgUp: number;
    baseDamage: number;
    items?: Array<{ index: number; trinket: number }>;
    invoked: boolean;
    droppedItems: number;
  };
}

export const FOWPState: IFOWPState = {
  room: {
    bossDied: false,
  },
  persistent: {
    tearsUp: 0,
    dmgUp: 0,
    baseDamage: 0,
    items: undefined,
    invoked: false,
    droppedItems: 0,
  },
} as const;
