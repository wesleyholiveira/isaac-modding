import { ModCallback } from "isaac-typescript-definitions";
import { BaseEvent } from "./BaseEvent";
import { UseItemEvent } from "./UseItemEvent";

// Tests
export class Client {
  protected events = new Map<string, BaseEvent[]>();
  private MOD_CALLBACKS: Record<string, ModCallback> = {
    [UseItemEvent.name]: ModCallback.POST_USE_ITEM,
  } as const;

  constructor(private readonly mod: Mod) {}

  addEvent(event: BaseEvent): this {
    const eventMap = this.events.get(event.className);

    let events = [event];
    if (eventMap !== undefined) {
      events = events.concat(eventMap);
    }

    this.events.set(event.className, events);
    return this;
  }

  register(): void {
    const { mod } = this;
    for (const key of this.events.keys()) {
      const callback = this.MOD_CALLBACKS[key];
      if (callback !== undefined) {
        const events = this.events.get(key);

        events?.forEach((event) =>
          mod.AddCallback(callback, event.apply, event.collectibleType),
        );
      }
    }
  }
}
