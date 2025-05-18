import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{product.name}</h3>
                <span className="font-bold text-pdv-blue">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Estoque: {product.stock}</span>
                <Button 
                  size="sm" 
                  onClick={() => onProductClick(product)}
                  disabled={product.stock <= 0}
                  className="bg-pdv-orange hover:bg-pdv-light-orange"
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
