
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Product } from "../types";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { usePDV } from "../context/PDVContext";
import { Info } from "lucide-react";
import { toast } from "./ui/sonner";

interface SauceSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function SauceSelection({ isOpen, onClose, product }: SauceSelectionProps) {
  const { products, addToCartWithSauces } = usePDV();
  const [selectedSauces, setSelectedSauces] = useState<Product[]>([]);
  const [freeSauceCount, setFreeSauceCount] = useState(0);
  
  const sauces = products.filter(p => p.category === 'molhos');
  
  useEffect(() => {
    setSelectedSauces([]);
    
    if (!product) return;
    
    if (product.name.includes("Triplo") || product.name.includes("Frango no Pote")) {
      setFreeSauceCount(2);
    } else if (product.name.includes("Simples") || product.name.includes("Duplo")) {
      setFreeSauceCount(1);
    } else {
      setFreeSauceCount(0);
    }
  }, [product]);
  
  const toggleSauce = (sauce: Product) => {
    setSelectedSauces(prev => {
      const exists = prev.some(s => s.id === sauce.id);
      
      if (exists) {
        return prev.filter(s => s.id !== sauce.id);
      } else {
        return [...prev, sauce];
      }
    });
  };
  
  const getExtraCost = () => {
    const extraSauces = Math.max(0, selectedSauces.length - freeSauceCount);
    return extraSauces * 2.0;
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Check if it's a "Nutella" hamburger
    if (product.name.includes("Nutella") && selectedSauces.length > 0) {
      toast.error("Na Brasa Nutella não permite adição de molhos!");
      return;
    }
    
    addToCartWithSauces(product, selectedSauces);
    onClose();
    
    toast.success(`${product.name} adicionado ao carrinho!`);
    if (selectedSauces.length > 0) {
      const extraCost = getExtraCost();
      if (extraCost > 0) {
        toast.info(`${extraCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} adicionado por molhos extras`);
      }
    }
  };
  
  if (!product) return null;
  
  const isNutella = product.name.includes("Nutella");
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar Molhos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {isNutella ? (
            <div className="flex items-center text-amber-600 p-3 bg-amber-50 rounded-md">
              <Info className="h-5 w-5 mr-2" />
              <p className="text-sm">Na Brasa Nutella não permite adição de molhos</p>
            </div>
          ) : (
            <>
              <div className="flex items-center text-blue-600 p-3 bg-blue-50 rounded-md mb-4">
                <Info className="h-5 w-5 mr-2" />
                <p className="text-sm">
                  {freeSauceCount > 0 ? (
                    `Você pode escolher até ${freeSauceCount} molho${freeSauceCount > 1 ? 's' : ''} grátis. Cada molho adicional custa R$ 2,00.`
                  ) : (
                    "Cada molho custa R$ 2,00."
                  )}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {sauces.map(sauce => (
                  <div key={sauce.id} className="flex items-center space-x-2 border p-3 rounded-md">
                    <Checkbox 
                      id={sauce.id} 
                      checked={selectedSauces.some(s => s.id === sauce.id)}
                      onCheckedChange={() => toggleSauce(sauce)}
                      disabled={isNutella}
                    />
                    <Label htmlFor={sauce.id} className="flex-1 cursor-pointer">{sauce.name}</Label>
                    <span className="text-sm font-medium">
                      {selectedSauces.findIndex(s => s.id === sauce.id) < freeSauceCount ? 
                        "Grátis" : selectedSauces.some(s => s.id === sauce.id) ? "R$ 2,00" : ""}
                    </span>
                  </div>
                ))}
              </div>
              
              {selectedSauces.length > 0 && (
                <div className="flex justify-between text-sm font-medium mt-4 pt-4 border-t">
                  <span>Custo adicional:</span>
                  <span>{getExtraCost().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
