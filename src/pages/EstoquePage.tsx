import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PackageCheck, AlertTriangle, Utensils } from "lucide-react";
import { inventoryItems as initialInventoryItems, productIngredients as initialProductIngredients } from "@/data/inventory";
import { ProductIngredient, InventoryItem } from "@/types";
import { toast } from "@/components/ui/sonner";
import LowStockAlert from "@/components/inventory/LowStockAlert";
import InventorySearch from "@/components/inventory/InventorySearch";
import InventoryTabContent from "@/components/inventory/InventoryTabContent";
import ProductsTabContent from "@/components/inventory/ProductsTabContent";
import LowStockTabContent from "@/components/inventory/LowStockTabContent";
import { formatPrice } from "@/utils/formatters";

const EstoquePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [productIngredients, setProductIngredients] = useState(initialProductIngredients);

  // Group inventory items by category
  const groupedInventoryItems = inventoryItems.reduce((acc, item) => {
    const category = item.category || "Outros";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof inventoryItems>);

  // Filter inventory items by search term
  const filteredInventoryItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group product ingredients by category
  const groupedProductIngredients = productIngredients.reduce((acc, item) => {
    if (!item.product) return acc; // ignora se não houver produto
    const category = item.product.category || "Outros";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof productIngredients>);

  // Filter product ingredients by search term
  const filteredProductIngredients = productIngredients.filter(item => {
    if (!item.product) return false;
    return (
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ingredients.some(ing => ing.item && ing.item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Get low stock inventory items
  const lowStockItems = inventoryItems.filter(item => 
    item.minQuantity && item.quantity <= item.minQuantity
  );

  // Handle product ingredient update
  const handleUpdateProductIngredient = (updatedProductIngredient: ProductIngredient) => {
    setProductIngredients(
      productIngredients.map(item => 
        item.product.id === updatedProductIngredient.product.id 
          ? updatedProductIngredient 
          : item
      )
    );
    // In a real app, you would also update this in a database
    console.log('Product ingredient updated:', updatedProductIngredient);
  };

  // Handle inventory item update
  const handleUpdateInventoryItem = (updatedItem: InventoryItem) => {
    setInventoryItems(
      inventoryItems.map(item => 
        item.id === updatedItem.id 
          ? updatedItem 
          : item
      )
    );
    // In a real app, you would also update this in a database
    console.log('Inventory item updated:', updatedItem);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Estoque</h1>
        <div className="flex items-center gap-4">
          <LowStockAlert lowStockItems={lowStockItems} />
          <InventorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <Tabs 
        defaultValue="inventory" 
        className="w-full"
        onValueChange={value => setActiveTab(value)}
      >
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="inventory" className="px-4 py-2">
            <PackageCheck className="mr-2 h-4 w-4" />
            Estoque de Ingredientes
          </TabsTrigger>
          <TabsTrigger value="products" className="px-4 py-2">
            <Utensils className="mr-2 h-4 w-4" />
            Composição de Produtos
          </TabsTrigger>
          <TabsTrigger value="lowStock" className="px-4 py-2">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Estoque Baixo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-0">
          <InventoryTabContent 
            searchTerm={searchTerm} 
            filteredInventoryItems={filteredInventoryItems}
            groupedInventoryItems={groupedInventoryItems}
            onUpdateInventoryItem={handleUpdateInventoryItem}
          />
        </TabsContent>

        <TabsContent value="products" className="mt-0">
          <ProductsTabContent 
            searchTerm={searchTerm}
            filteredProductIngredients={filteredProductIngredients}
            groupedProductIngredients={groupedProductIngredients}
            formatPrice={formatPrice}
            onUpdateProductIngredient={handleUpdateProductIngredient}
          />
        </TabsContent>
        
        <TabsContent value="lowStock" className="mt-0">
          <LowStockTabContent 
            lowStockItems={lowStockItems} 
            onUpdateInventoryItem={handleUpdateInventoryItem}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EstoquePage;
