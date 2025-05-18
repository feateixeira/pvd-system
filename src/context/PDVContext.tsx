
import { createContext, useContext, ReactNode } from "react";
import { PaymentMethod } from "../types";
import { useAuth } from "./AuthContext";
import { toast } from "../components/ui/sonner";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../integrations/supabase/client";
import { PDVContextType } from "./types/PDVContextTypes";
import { useCart } from "../hooks/useCart";
import { useSupabaseData } from "../hooks/useSupabaseData";
import { useSalesOperations } from "../hooks/useSalesOperations";

const PDVContext = createContext<PDVContextType | undefined>(undefined);

export const PDVProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  
  const {
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
  } = useCart();

  const { products, sales, isLoading, setProducts, setSales } = useSupabaseData(currentUser?.id);
  const { getDailySales, getWeeklySales, getMonthlySales } = useSalesOperations(sales);

  const finalizeSale = async (
    paymentMethod: PaymentMethod, 
    observation?: string, 
    customerName?: string, 
    deliveryAddress?: string, 
    isDelivery?: boolean
  ) => {
    if (!currentUser) {
      toast.error("Usuário não autenticado!");
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Carrinho vazio!");
      return;
    }
    
    try {
      // Generate a valid UUID for this sale
      const saleId = uuidv4();
      const total = getCartTotal();
      const saleDate = new Date();
      
      // Create a local sale object first
      const newSale = {
        id: saleId,
        items: [...cart],
        total,
        date: saleDate,
        userId: currentUser.id,
        paymentMethod,
        observation,
        customerName,
        deliveryAddress,
        isDelivery
      };
      
      // Update local state first
      const updatedProducts = products.map(product => {
        const cartItem = cart.find(item => item.product.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stock: product.stock - cartItem.quantity
          };
        }
        return product;
      });
      
      setProducts(updatedProducts);
      setSales(prev => [...prev, newSale]);
      
      // Try to save to Supabase if possible
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const isValidUUID = currentUser.id && typeof currentUser.id === 'string' && uuidRegex.test(currentUser.id);
      
      if (isValidUUID) {
        // Save to Supabase
        const { error: saleError } = await supabase
          .from('sales')
          .insert({
            id: saleId,
            total,
            date: saleDate.toISOString(),
            user_id: currentUser.id,
            payment_method: paymentMethod,
            observation,
            customer_name: customerName,
            delivery_address: deliveryAddress,
            is_delivery: isDelivery
          });
          
        if (saleError) throw saleError;
        
        for (const item of cart) {
          const saleItemId = uuidv4();
          const { error: itemError } = await supabase
            .from('sale_items')
            .insert({
              id: saleItemId,
              sale_id: saleId,
              product_id: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
              observation: item.observation
            });
            
          if (itemError) throw itemError;
          
          if (item.sauces && item.sauces.length > 0) {
            const sauceInserts = item.sauces.map(sauce => ({
              sale_item_id: saleItemId,
              product_id: sauce.id
            }));
            
            const { error: saucesError } = await supabase
              .from('sale_item_sauces')
              .insert(sauceInserts);
              
            if (saucesError) throw saucesError;
          }
          
          // Update product stock in Supabase
          const { error: stockError } = await supabase
            .from('products')
            .update({ stock: item.product.stock - item.quantity })
            .eq('id', item.product.id);
            
          if (stockError) throw stockError;
        }
      } else {
        console.log("Using local storage mode - no valid UUID for Supabase storage");
      }
      
      clearCart();
      setIsDelivery(false);
      setCustomerName("");
      setDeliveryAddress("");
      
      toast.success("Venda finalizada com sucesso!");
    } catch (error) {
      console.error('Error saving sale:', error);
      toast.error("Erro ao finalizar venda. Tente novamente.");
      
      // Error handling: Log the specific error for debugging
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    }
  };

  return (
    <PDVContext.Provider
      value={{
        products,
        cart,
        sales,
        addToCart,
        addToCartWithSauces,
        removeFromCart,
        updateCartItemQuantity,
        updateCartItemObservation,
        clearCart,
        getCartTotal,
        finalizeSale,
        getDailySales,
        getWeeklySales,
        getMonthlySales,
        isDelivery,
        setIsDelivery,
        customerName,
        setCustomerName,
        deliveryAddress,
        setDeliveryAddress,
        isLoading
      }}
    >
      {children}
    </PDVContext.Provider>
  );
};

export const usePDV = () => {
  const context = useContext(PDVContext);
  if (context === undefined) {
    throw new Error("usePDV deve ser usado dentro de um PDVProvider");
  }
  return context;
};
