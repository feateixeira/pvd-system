
import { Product } from "@/types";

// Category types for better type checking
export type ProductCategory = 'hamburgueres' | 'molhos' | 'batatas' | 'bebidas' | 'frango';

// Category definitions
export const PRODUCT_CATEGORIES = {
  hamburgueres: "hamburgueres",
  molhos: "molhos",
  batatas: "batatas",
  bebidas: "bebidas",
  frango: "frango"
} as const;

// Category display names for UI
export const categoryLabels = {
  hamburgueres: "Hamburgueres",
  molhos: "Molhos",
  batatas: "Batatas",
  bebidas: "Bebidas",
  frango: "Frango"
};

// Category items - moved from PDVPage to be accessible by all components
export const categoryItems = {
  hamburgueres: ["Na Brasa Simples", "Na Brasa Simples Especial", "Na Brasa Simples Supremo", 
                "Na Brasa Duplo", "Na Brasa Duplo Especial", "Na Brasa Duplo Supremo",
                "Na Brasa Triplo", "Na Brasa Triplo Especial", "Na Brasa Triplo Supremo", 
                "Na Brasa Nutella"],
  batatas: ["Batata P", "Batata M", "Batata G", "Batata M Recheada", "Batata G Recheada"],
  bebidas: ["Refrigerante Lata", "Refrigerante 600ml", "Refrigerante 2L", "Suco 1L", "Água Mineral", "Água Com Gás"],
  molhos: ["Molho Mostarda e Mel", "Molho Bacon", "Molho Ervas", "Molho Alho"],
  frango: ["Frango Simples", "Frango Duplo", "Frango Triplo", "Frango no Pote P", "Frango no Pote M", "Frango no Pote G"]
};
