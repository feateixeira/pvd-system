
import { Product } from "@/types";
import { hamburgers } from "./hamburgers";
import { sauces } from "./sauces";
import { fries } from "./fries";
import { drinks } from "./drinks";
import { chicken } from "./chicken";
import { PRODUCT_CATEGORIES, categoryItems, categoryLabels } from "./types";
import type { ProductCategory } from "./types";

// Combine all products
export const products: Product[] = [
  ...hamburgers,
  ...sauces,
  ...fries,
  ...drinks,
  ...chicken
];

// Helper functions
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Export everything
export {
  hamburgers,
  sauces,
  fries,
  drinks,
  chicken,
  PRODUCT_CATEGORIES,
  categoryItems,
  categoryLabels,
};

// Re-export the type
export type { ProductCategory };
