
import { InventoryItem, ProductIngredient } from "@/types";
import { inventoryItems } from "./inventoryItems";
import { productIngredients } from "./productIngredients";
import { findInventoryItemByName } from "./types";

// Export everything
export {
  inventoryItems,
  productIngredients,
  findInventoryItemByName
};

// Re-export from individual files (optional, for direct imports)
export * from "./breads";
export * from "./meats";
export * from "./cheeses";
export * from "./packaging";
export * from "./vegetables";
export * from "./potatoes";
export * from "./sauces";
export * from "./beverages";
