import { CollectibleType } from "isaac-typescript-definitions";

// Tests
export abstract class BaseEvent {
  public className: string = this.constructor.name;
  public collectibleType: CollectibleType = CollectibleType.SAD_ONION;

  public abstract apply(...args: any): any;
  public abstract unapply(...args: any): any;
}
