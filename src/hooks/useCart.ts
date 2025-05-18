
import { useState } from 'react';
import { CartItem, Product } from '../types';
import { toast } from "../components/ui/sonner";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDelivery, setIsDelivery] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error(`${product.name} está sem estoque!`);
      return;
    }
    
    const isHamburger = product.name.includes("Na Brasa") && 
      !product.name.includes("Batata") && 
      !product.category?.includes("molhos");
      
    const isChickenBurger = product.name.includes("Frango") && 
      !product.name.includes("Pote") &&
      !product.category?.includes("molhos");
      
    const isChickenPot = product.name.includes("Frango no Pote");
      
    if (isHamburger || isChickenBurger || isChickenPot) {
      // Hamburgueres e frango são tratados pelo componente de seleção de molhos
      return;
    }
    
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error(`Estoque insuficiente para ${product.name}!`);
        return;
      }
      
      updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const addToCartWithSauces = (product: Product, sauces: Product[]) => {
    if (product.stock <= 0) {
      toast.error(`${product.name} está sem estoque!`);
      return;
    }
    
    setCart([...cart, { 
      product, 
      quantity: 1,
      sauces: sauces.length > 0 ? sauces : undefined
    }]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const existingItem = cart.find(item => item.product.id === productId);
    if (!existingItem || quantity > existingItem.product.stock) {
      toast.error(`Estoque insuficiente!`);
      return;
    }
    
    setCart(
      cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartItemObservation = (productId: string, observation: string) => {
    setCart(
      cart.map(item =>
        item.product.id === productId ? { ...item, observation } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    let subtotal = cart.reduce((total, item) => {
      let itemTotal = item.product.price * item.quantity;
      
      if (item.sauces && item.sauces.length > 0) {
        let freeSaucesCount = 0;
        if (item.product.name.includes("Triplo") || item.product.name.includes("Frango no Pote")) {
          freeSaucesCount = 2;
        } else if (item.product.name.includes("Simples") || item.product.name.includes("Duplo")) {
          freeSaucesCount = 1;
        }
        
        const extraSaucesCount = Math.max(0, item.sauces.length - freeSaucesCount);
        itemTotal += extraSaucesCount * 2.0 * item.quantity;
      }
      
      return total + itemTotal;
    }, 0);
    
    if (isDelivery) {
      subtotal += 4.0;
    }
    
    return subtotal;
  };

  return {
    cart,
    isDelivery,
    setIsDelivery,
    customerName,
    setCustomerName,
    deliveryAddress,
    setDeliveryAddress,
    addToCart,
    addToCartWithSauces,
    removeFromCart,
    updateCartItemQuantity,
    updateCartItemObservation,
    clearCart,
    getCartTotal
  };
};
