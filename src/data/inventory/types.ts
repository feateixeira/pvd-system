
import { InventoryItem, ProductIngredient } from "@/types";

// Helper function to find inventory item by name
export const findInventoryItemByName = (items: InventoryItem[], name: string): InventoryItem | undefined => {
  return items.find(item => item.name === name);
};
