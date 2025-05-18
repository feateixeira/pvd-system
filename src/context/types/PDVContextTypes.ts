
import { CartItem, Product, Sale, PaymentMethod } from "../../types";

export interface PDVContextType {
  products: Product[];
  cart: CartItem[];
  sales: Sale[];
  addToCart: (product: Product) => void;
  addToCartWithSauces: (product: Product, sauces: Product[]) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  updateCartItemObservation: (productId: string, observation: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  finalizeSale: (paymentMethod: PaymentMethod, observation?: string, customerName?: string, deliveryAddress?: string, isDelivery?: boolean) => void;
  getDailySales: (date: Date) => Sale[];
  getWeeklySales: (date: Date) => Sale[];
  getMonthlySales: (date: Date) => Sale[];
  isDelivery: boolean;
  setIsDelivery: (value: boolean) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  isLoading: boolean;
}
