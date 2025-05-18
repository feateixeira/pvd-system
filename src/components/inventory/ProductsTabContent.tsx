import React from 'react';
import ProductIngredientsTable from "./ProductIngredientsTable";
import { ProductIngredient } from "@/types";
import { Utensils, Coffee, GlassWater, Drumstick } from "lucide-react";

interface ProductsTabContentProps {
  searchTerm: string;
  filteredProductIngredients: ProductIngredient[];
  groupedProductIngredients: Record<string, ProductIngredient[]>;
  formatPrice: (price: number) => string;
  onUpdateProductIngredient: (updatedProductIngredient: ProductIngredient) => void;
}

const ProductsTabContent: React.FC<ProductsTabContentProps> = ({ 
  searchTerm, 
  filteredProductIngredients, 
  groupedProductIngredients, 
  formatPrice,
  onUpdateProductIngredient
}) => {
  return (
    <>
      {searchTerm ? (
        <div>
          <h2 className="text-lg font-medium mb-4">
            Resultados da busca: {filteredProductIngredients.length} {filteredProductIngredients.length === 1 ? 'produto' : 'produtos'}
          </h2>
          {filteredProductIngredients.map((productIngredient) => (
            <ProductIngredientsTable 
              key={productIngredient.product.id}
              productIngredient={productIngredient}
              formatPrice={formatPrice}
              onUpdateProductIngredient={onUpdateProductIngredient}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Utensils className="mr-2 h-5 w-5" />
              Hamburgueres
            </h2>
            {groupedProductIngredients['hamburgueres']?.map((productIngredient) => (
              productIngredient.product && (
                <ProductIngredientsTable 
                  key={productIngredient.product.id}
                  productIngredient={productIngredient}
                  formatPrice={formatPrice}
                  onUpdateProductIngredient={onUpdateProductIngredient}
                />
              )
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Coffee className="mr-2 h-5 w-5" />
              Batatas
            </h2>
            {groupedProductIngredients['batatas']?.map((productIngredient) => (
              productIngredient.product && (
                <ProductIngredientsTable 
                  key={productIngredient.product.id}
                  productIngredient={productIngredient}
                  formatPrice={formatPrice}
                  onUpdateProductIngredient={onUpdateProductIngredient}
                />
              )
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Drumstick className="mr-2 h-5 w-5" />
              Frango
            </h2>
            {groupedProductIngredients['frango']?.map((productIngredient) => (
              productIngredient.product && (
                <ProductIngredientsTable 
                  key={productIngredient.product.id}
                  productIngredient={productIngredient}
                  formatPrice={formatPrice}
                  onUpdateProductIngredient={onUpdateProductIngredient}
                />
              )
            ))}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <GlassWater className="mr-2 h-5 w-5" />
              Bebidas
            </h2>
            {groupedProductIngredients['bebidas']?.map((productIngredient) => (
              productIngredient.product && (
                <ProductIngredientsTable 
                  key={productIngredient.product.id}
                  productIngredient={productIngredient}
                  formatPrice={formatPrice}
                  onUpdateProductIngredient={onUpdateProductIngredient}
                />
              )
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProductsTabContent;
