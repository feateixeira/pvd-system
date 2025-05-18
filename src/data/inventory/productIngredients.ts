import { ProductIngredient } from "@/types";
import { getProductById } from "../products";
import { inventoryItems } from "./inventoryItems";
import { findInventoryItemByName } from "./types";

// Product ingredients mapping
export const productIngredients: ProductIngredient[] = [
  // Na Brasa Simples
  {
    product: getProductById("11")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Simples Especial
  {
    product: getProductById("12")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Alface")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Tomate")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Simples Supremo
  {
    product: getProductById("13")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Bacon")!, quantity: 0.03 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Duplo
  {
    product: getProductById("14")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Duplo Especial
  {
    product: getProductById("15")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Alface")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Tomate")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Duplo Supremo
  {
    product: getProductById("16")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Bacon")!, quantity: 0.05 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Triplo
  {
    product: getProductById("17")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Triplo Especial
  {
    product: getProductById("18")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Alface")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Tomate")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Triplo Supremo
  {
    product: getProductById("19")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Bacon")!, quantity: 0.07 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Na Brasa Nutella
  {
    product: getProductById("20")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Blend de carne 130g")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Queijo muçarela")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Alface")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Tomate")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Cebola")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  
  // Batata P
  {
    product: getProductById("25")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Batata")!, quantity: 0.1 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata P")!, quantity: 1 },
    ]
  },
  // Batata M
  {
    product: getProductById("26")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Batata")!, quantity: 0.3 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata M")!, quantity: 1 },
    ]
  },
  // Batata G
  {
    product: getProductById("27")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Batata")!, quantity: 0.4 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata G")!, quantity: 1 },
    ]
  },
  // Batata M Recheada
  {
    product: getProductById("28")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Batata")!, quantity: 0.3 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Bacon")!, quantity: 0.05 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata M")!, quantity: 1 },
    ]
  },
  // Batata G Recheada
  {
    product: getProductById("29")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Batata")!, quantity: 0.4 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Bacon")!, quantity: 0.1 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata G")!, quantity: 1 },
    ]
  },
  
  // Novos hamburgueres de frango
  // Frango Simples
  {
    product: getProductById("50")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Filé de frango")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Frango Duplo
  {
    product: getProductById("51")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Filé de frango")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 2 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  // Frango Triplo
  {
    product: getProductById("52")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Pão brioche")!, quantity: 1 },
      { item: findInventoryItemByName(inventoryItems, "Filé de frango")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Queijo cheddar")!, quantity: 3 },
      { item: findInventoryItemByName(inventoryItems, "Papel para embrulho")!, quantity: 1 }
    ]
  },
  
  // Frango no Pote
  // Frango no Pote P
  {
    product: getProductById("53")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Filé de frango")!, quantity: 0.2 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata P")!, quantity: 1 },
    ]
  },
  // Frango no Pote M
  {
    product: getProductById("54")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Filé de frango")!, quantity: 0.35 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata M")!, quantity: 1 },
    ]
  },
  // Frango no Pote G
  {
    product: getProductById("55")!,
    ingredients: [
      { item: findInventoryItemByName(inventoryItems, "Filé de frango")!, quantity: 0.5 },
      { item: findInventoryItemByName(inventoryItems, "Caixa para batata G")!, quantity: 1 },
    ]
  },
  
  // Add all beverages with 1:1 mapping since they're sold as is
  ...[
    "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "30", "31", "32", "33", "34", "35"
  ].map(id => {
    const product = getProductById(id);
    if (!product) return null;
    
    // Find the matching inventory item for beverages
    const inventoryItem = inventoryItems.find(item => item.name === product.name || 
      (product.brand && item.name.includes(product.brand)));
    
    if (!inventoryItem) return null;
    
    return {
      product,
      ingredients: [{ item: inventoryItem, quantity: 1 }]
    };
  }).filter(Boolean)
];
