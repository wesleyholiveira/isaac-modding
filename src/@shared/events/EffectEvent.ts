import { BaseEvent } from "./BaseEvent";

// Tests
export abstract class EffectEvent extends BaseEvent {
  public override className: string = EffectEvent.name;

  abstract override apply(player: EntityPlayer): void;
  abstract override unapply(player: EntityPlayer): void;
}
