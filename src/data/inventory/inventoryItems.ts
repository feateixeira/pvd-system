
import { InventoryItem } from "@/types";
import { breadItems } from "./breads";
import { meatItems } from "./meats";
import { cheeseItems } from "./cheeses";
import { packagingItems } from "./packaging";
import { vegetableItems } from "./vegetables";
import { potatoItems } from "./potatoes";
import { sauceItems } from "./sauces";
import { beverageItems } from "./beverages";

// Combine all inventory items
export const inventoryItems: InventoryItem[] = [
  ...breadItems,
  ...meatItems,
  ...cheeseItems,
  ...packagingItems,
  ...vegetableItems,
  ...potatoItems,
  ...sauceItems,
  ...beverageItems
];
