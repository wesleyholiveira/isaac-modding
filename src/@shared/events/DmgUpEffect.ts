import { EffectEvent } from "./EffectEvent";

// Tests
export class DmgUpEffect extends EffectEvent {
  apply(player: EntityPlayer): void {
    player.Damage += 3;
  }

  unapply(player: EntityPlayer): void {
    player.Damage -= 3;
  }
}
