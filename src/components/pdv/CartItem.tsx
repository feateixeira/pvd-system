
import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onUpdateObservation: (productId: string, observation: string) => void;
  formatPrice: (price: number) => string;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  onUpdateObservation,
  formatPrice 
}) => {
  const getFreeSaucesCount = (productName: string) => {
    if (productName.includes("Triplo")) {
      return 2;
    } else if (productName.includes("Simples") || productName.includes("Duplo")) {
      return 1;
    }
    return 0;
  };

  const calculateExtraSauceCost = () => {
    if (!item.sauces || item.sauces.length === 0) return 0;
    const freeSauces = getFreeSaucesCount(item.product.name);
    const extraSauces = Math.max(0, item.sauces.length - freeSauces);
    return extraSauces * 2.0;
  };

  const extraSauceCost = calculateExtraSauceCost();
  const basePrice = item.product.price;
  const totalPricePerItem = basePrice + extraSauceCost;

  return (
    <div className="border-b pb-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-medium">{item.product.name}</p>
          <p className="text-sm text-gray-500">
            {formatPrice(basePrice)} {extraSauceCost > 0 && `+ ${formatPrice(extraSauceCost)} molhos extras`}
          </p>
          {item.sauces && item.sauces.length > 0 && (
            <div className="mt-1">
              <p className="text-xs text-gray-500 italic">
                Molhos: {item.sauces.map(sauce => sauce.name.replace('Molho ', '')).join(", ")}
                {extraSauceCost > 0 && ` (${item.sauces.length - getFreeSaucesCount(item.product.name)} extra${item.sauces.length - getFreeSaucesCount(item.product.name) > 1 ? 's' : ''})`}
              </p>
            </div>
          )}
        </div>
        <button 
          onClick={() => onRemove(item.product.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center border rounded-md">
          <button 
            className="px-2 py-1 text-gray-500 hover:text-pdv-blue"
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus size={14} />
          </button>
          <span className="px-2 text-center min-w-[40px]">
            {item.quantity}
          </span>
          <button 
            className="px-2 py-1 text-gray-500 hover:text-pdv-blue"
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="font-bold">
          {formatPrice(totalPricePerItem * item.quantity)}
        </span>
      </div>
      
      <div className="mt-2">
        <textarea
          placeholder="Observação"
          value={item.observation || ""}
          onChange={(e) => onUpdateObservation(item.product.id, e.target.value)}
          className="w-full text-sm p-2 border rounded-md"
          rows={1}
        />
      </div>
    </div>
  );
};

export default CartItem;
