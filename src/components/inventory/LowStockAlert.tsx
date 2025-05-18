
import React from 'react';
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";
import { InventoryItem } from "@/types";

interface LowStockAlertProps {
  lowStockItems: InventoryItem[];
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ lowStockItems }) => {
  return (
    <Button className="bg-amber-500 hover:bg-amber-600" size="sm">
      <AlertTriangle className="mr-2 h-4 w-4" />
      <span>{lowStockItems.length} itens com estoque baixo</span>
    </Button>
  );
};

export default LowStockAlert;
