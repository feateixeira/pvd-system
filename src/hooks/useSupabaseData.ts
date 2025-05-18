import { useState, useEffect } from 'react';
import { Product, Sale, PaymentMethod } from '../types';
import { supabase } from '../integrations/supabase/client';
import { toast } from "../components/ui/sonner";
import { sales as initialSales } from "../data/sales";
import { products as initialProducts } from "../data/products"; // Import from new location

export const useSupabaseData = (userId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // If no userId is provided, use local data
      if (!userId) {
        console.log("No user ID provided, using local data");
        setProducts(initialProducts);  // Usar produtos locais
        setSales(initialSales);
        setIsLoading(false);
        return;
      }
      
      // Check if userId is a valid UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId)) {
        console.log("Invalid UUID format for userId:", userId, "- using local data");
        toast.warning('Usando dados locais (ID não é um UUID válido)');
        
        setProducts(initialProducts);  // Usar produtos locais em vez de array vazio
        setSales(initialSales);
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', userId);
          
        if (productsError) throw productsError;
        
        const transformedProducts: Product[] = productsData.map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          stock: product.stock,
          userId: product.user_id,
          category: product.category || undefined,
          brand: product.brand || undefined
        }));
        
        // Use Supabase products or empty array
        setProducts(transformedProducts);
        
        // Fetch sales with their items and sauces
        const { data: salesData, error: salesError } = await supabase
          .from('sales')
          .select('*, sale_items:sale_items(*)')
          .eq('user_id', userId);
          
        if (salesError) throw salesError;
        
        if (salesData && salesData.length > 0) {
          const transformedSales: Sale[] = await Promise.all(
            salesData.map(async (sale) => {
              const saleItems = sale.sale_items || [];
              
              const itemsWithSauces = await Promise.all(
                saleItems.map(async (item: any) => {
                  const product = transformedProducts.find(p => p.id === item.product_id);
                  
                  if (!product) {
                    console.error(`Product not found for id: ${item.product_id}`);
                    return null;
                  }
                  
                  const { data: saucesData, error: saucesError } = await supabase
                    .from('sale_item_sauces')
                    .select('product_id')
                    .eq('sale_item_id', item.id);
                    
                  if (saucesError) {
                    console.error('Error fetching sauces:', saucesError);
                    return null;
                  }
                  
                  const sauces = saucesData
                    .map(sauce => {
                      const sauceProduct = transformedProducts.find(p => p.id === sauce.product_id);
                      return sauceProduct;
                    })
                    .filter(Boolean) as Product[];
                  
                  return {
                    product,
                    quantity: item.quantity,
                    observation: item.observation || undefined,
                    sauces: sauces.length > 0 ? sauces : undefined
                  };
                })
              );
              
              const validItems = itemsWithSauces.filter(Boolean);
              
              return {
                id: sale.id,
                items: validItems,
                total: Number(sale.total),
                date: new Date(sale.date),
                userId: sale.user_id,
                paymentMethod: sale.payment_method as PaymentMethod,
                observation: sale.observation || undefined,
                customerName: sale.customer_name || undefined,
                deliveryAddress: sale.delivery_address || undefined,
                isDelivery: sale.is_delivery || false
              };
            })
          );
          
          const filteredSales = transformedSales.filter(Boolean);
          setSales(filteredSales.length > 0 ? filteredSales : initialSales);
          console.log("Loaded sales from database:", filteredSales.length);
        } else {
          // If no sales found in database, use local sales
          setSales(initialSales);
          console.log("No sales found in database, using local sales:", initialSales.length);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        toast.error('Erro ao carregar dados. Usando dados locais.');
        
        // On error fallback to local data
        setProducts(initialProducts);
        setSales(initialSales);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);

  return { products, sales, isLoading, setProducts, setSales };
};
