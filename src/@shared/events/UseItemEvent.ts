import {
  ActiveSlot,
  CollectibleType,
  UseFlag,
} from "isaac-typescript-definitions";
import { BaseEvent } from "./BaseEvent";

// Tests
export abstract class UseItemEvent extends BaseEvent {
  public override className: string = UseItemEvent.name;

  abstract override apply(
    collectibleType: CollectibleType,
    rng: RNG,
    player: EntityPlayer,
    useFlags: BitFlags<UseFlag>,
    activeSlot: ActiveSlot,
    customVarData: number,
  ): boolean;

  abstract override unapply(
    collectibleType: CollectibleType,
    rng: RNG,
    player: EntityPlayer,
    useFlags: BitFlags<UseFlag>,
    activeSlot: ActiveSlot,
    customVarData: number,
  ): boolean;
}
