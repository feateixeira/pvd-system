import { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle, Dialog } from "@/components/ui/dialog";
import { Product } from "../types";
import { Button } from "./ui/button";
import { usePDV } from "../context/PDVContext";
import { Card, CardContent } from "./ui/card";

interface DrinkBrandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  drinkType: string | null;
}

export const DrinkBrandsModal = ({ isOpen, onClose, drinkType }: DrinkBrandsModalProps) => {
  const { products, addToCart } = usePDV();
  const [availableBrands, setAvailableBrands] = useState<Product[]>([]);
  
  // Filter products based on the drink type
  useEffect(() => {
    if (drinkType) {
      let filteredProducts: Product[] = [];
      
      if (drinkType === "Refrigerante Lata") {
        filteredProducts = products.filter(p => p.brand && p.name.includes("Lata"));
      } else if (drinkType === "Refrigerante 600ml") {
        filteredProducts = products.filter(p => p.brand && p.name.includes("600ml"));
      } else if (drinkType === "Suco 1L") {
        filteredProducts = products.filter(p => p.brand && p.name.includes("Dell Vale"));
      } else if (drinkType === "Refrigerante 2L") {
        filteredProducts = products.filter(p => p.brand && p.name.includes("2L"));
      }
      
      setAvailableBrands(filteredProducts);
    }
  }, [drinkType, products]);

  const handleSelectBrand = (product: Product) => {
    addToCart(product);
    onClose();
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecione a marca</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {availableBrands.map((product) => (
            <Card key={product.id} className="cursor-pointer hover:shadow-md" onClick={() => handleSelectBrand(product)}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{product.brand}</h3>
                    <span className="font-bold text-pdv-blue">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Estoque: {product.stock}</span>
                    <Button 
                      size="sm" 
                      className="bg-pdv-orange hover:bg-pdv-light-orange"
                    >
                      Selecionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
