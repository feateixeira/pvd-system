
export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  userId: string;
  category?: string;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  observation?: string;
  sauces?: Product[];
}

export type PaymentMethod = 'dinheiro' | 'cartão de crédito' | 'cartão de débito' | 'pix';

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  userId: string;
  paymentMethod: PaymentMethod;
  observation?: string;
  customerName?: string;
  deliveryAddress?: string;
  isDelivery?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: "unidade" | "kg" | "g" | "ml" | "l";
  minQuantity?: number;
  category?: string;
}

export interface ProductIngredient {
  product: Product;
  ingredients: {
    item: InventoryItem;
    quantity: number;
  }[];
}
