
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductIngredient, InventoryItem } from "@/types";
import { Edit, Save, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProductIngredientsTableProps {
  productIngredient: ProductIngredient;
  formatPrice: (price: number) => string;
  onUpdateProductIngredient?: (updatedProductIngredient: ProductIngredient) => void;
}

const ProductIngredientsTable: React.FC<ProductIngredientsTableProps> = ({ 
  productIngredient,
  formatPrice,
  onUpdateProductIngredient 
}) => {
  const { product, ingredients } = productIngredient;
  const [isEditing, setIsEditing] = useState(false);
  const [editedIngredients, setEditedIngredients] = useState(ingredients);

  const formatQuantity = (quantity: number, unit: string) => {
    if (unit === "unidade" && quantity === 1) {
      return `${quantity} unidade`;
    } else if (unit === "unidade") {
      return `${quantity} unidades`;
    } else {
      return `${quantity} ${unit}`;
    }
  };

  const handleQuantityChange = (index: number, newValue: string) => {
    const updatedIngredients = [...editedIngredients];
    const value = parseFloat(newValue);
    
    if (!isNaN(value) && value >= 0) {
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        quantity: value
      };
      setEditedIngredients(updatedIngredients);
    }
  };

  const saveChanges = () => {
    if (onUpdateProductIngredient) {
      const updatedProductIngredient = {
        ...productIngredient,
        ingredients: editedIngredients
      };
      
      onUpdateProductIngredient(updatedProductIngredient);
      toast.success(`Composição do ${product.name} atualizada com sucesso!`);
    }
    
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setEditedIngredients(ingredients);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border shadow bg-white mb-6">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-pdv-blue">{formatPrice(product.price)}</span>
          {!isEditing ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={cancelEditing}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancelar</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={saveChanges}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
              >
                <Save className="h-4 w-4" />
                <span className="sr-only">Salvar</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingrediente</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Estoque Atual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editedIngredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{ingredient.item.name}</TableCell>
              <TableCell>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      step={ingredient.item.unit === "unidade" ? "1" : "0.01"}
                      value={ingredient.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="w-20 h-8"
                    />
                    <span>{ingredient.item.unit !== "unidade" ? ingredient.item.unit : ""}</span>
                  </div>
                ) : (
                  formatQuantity(ingredient.quantity, ingredient.item.unit)
                )}
              </TableCell>
              <TableCell>
                <span className={ingredient.item.quantity < ingredient.item.minQuantity! ? "text-red-500" : "text-green-500"}>
                  {ingredient.item.quantity} {ingredient.item.unit !== "unidade" ? ingredient.item.unit : 
                    ingredient.item.quantity === 1 ? "unidade" : "unidades"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductIngredientsTable;
