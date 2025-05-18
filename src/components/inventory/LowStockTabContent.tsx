
import React, { useState } from 'react';
import InventoryTable from "./InventoryTable";
import EditInventoryDialog from "./EditInventoryDialog";
import { InventoryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LowStockTabContentProps {
  lowStockItems: InventoryItem[];
  onUpdateInventoryItem?: (updatedItem: InventoryItem) => void;
}

const LowStockTabContent: React.FC<LowStockTabContentProps> = ({ 
  lowStockItems,
  onUpdateInventoryItem
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleSaveItem = (updatedItem: InventoryItem) => {
    if (onUpdateInventoryItem) {
      onUpdateInventoryItem(updatedItem);
    }
  };

  return (
    <>
      <InventoryTable 
        items={lowStockItems}
        title={`Itens com Estoque Baixo: ${lowStockItems.length} ${lowStockItems.length === 1 ? 'item' : 'itens'}`}
        actionColumn={true}
        renderActions={(item) => (
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center"
            onClick={() => handleEdit(item)}
          >
            <Plus className="mr-1 h-4 w-4" />
            Repor
          </Button>
        )}
      />

      <EditInventoryDialog 
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveItem}
      />
    </>
  );
};

export default LowStockTabContent;
