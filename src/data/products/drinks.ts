import { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "./types";

// Generic drinks
export const genericDrinks: Product[] = [
  {
    id: "30",
    name: "Refrigerante Lata",
    price: 5.0,
    stock: 200,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas
  },
  {
    id: "31",
    name: "Refrigerante 600ml",
    price: 7.5,
    stock: 200,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas
  },
  {
    id: "32",
    name: "Refrigerante 2L",
    price: 12.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas
  },
  {
    id: "33",
    name: "Suco 1L",
    price: 8.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas
  },
  {
    id: "34",
    name: "Água Mineral",
    price: 2.5,
    stock: 200,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas
  },
  {
    id: "35",
    name: "Água Com Gás",
    price: 4.0,
    stock: 200,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas
  }
];

// Branded drinks
export const brandedDrinks: Product[] = [
  // Lata
  {
    id: "36",
    name: "Coca Cola Lata",
    price: 5.0,
    stock: 70,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Coca Cola"
  },
  {
    id: "37",
    name: "Coca Cola Zero Lata",
    price: 5.0,
    stock: 70,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Coca Cola Zero"
  },
  {
    id: "38",
    name: "Guaraná Lata",
    price: 5.0,
    stock: 60,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Guaraná"
  },
  
  // 600ml
  {
    id: "39",
    name: "Coca Cola 600ml",
    price: 7.5,
    stock: 50,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Coca Cola"
  },
  {
    id: "40",
    name: "Coca Cola Zero 600ml",
    price: 7.5,
    stock: 50,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Coca Cola Zero"
  },
  {
    id: "41",
    name: "Guaraná 600ml",
    price: 7.5,
    stock: 50,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Guaraná"
  },
  {
    id: "42",
    name: "Guaraná Zero 600ml",
    price: 7.5,
    stock: 50,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Guaraná Zero"
  },
  
  // 1L
  {
    id: "43",
    name: "Dell Vale 1L",
    price: 8.0,
    stock: 100,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Dell Vale"
  },
  
  // 2L
  {
    id: "44",
    name: "Coca Cola 2L",
    price: 12.0,
    stock: 25,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Coca Cola"
  },
  {
    id: "45",
    name: "Coca Cola Zero 2L",
    price: 12.0,
    stock: 25,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Coca Cola Zero"
  },
  {
    id: "46",
    name: "Guaraná 2L",
    price: 12.0,
    stock: 25,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Guaraná"
  },
  {
    id: "47",
    name: "Split 2L",
    price: 12.0,
    stock: 25,
    userId: "4",
    category: PRODUCT_CATEGORIES.bebidas,
    brand: "Split"
  }
];

// Combined drinks
export const drinks = [...genericDrinks, ...brandedDrinks];
