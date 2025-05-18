
import { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "./types";

export const chicken: Product[] = [
  // Hamburgueres de frango
  {
    id: "50",
    name: "Frango Simples",
    price: 14.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.hamburgueres
  },
  {
    id: "51",
    name: "Frango Duplo",
    price: 22.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.hamburgueres
  },
  {
    id: "52",
    name: "Frango Triplo",
    price: 28.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.hamburgueres
  },
  // Frango no pote
  {
    id: "53",
    name: "Frango no Pote P",
    price: 20.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.frango
  },
  {
    id: "54",
    name: "Frango no Pote M",
    price: 37.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.frango
  },
  {
    id: "55",
    name: "Frango no Pote G",
    price: 50.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.frango
  }
];
