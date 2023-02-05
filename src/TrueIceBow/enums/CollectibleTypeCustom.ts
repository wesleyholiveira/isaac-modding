import { CollectibleType } from "isaac-typescript-definitions";

export const CollectibleTypeCustom: Record<string, CollectibleType> = {
  TRUE_ICE_BOW: Isaac.GetItemIdByName("True Ice Bow"),
} as const;
