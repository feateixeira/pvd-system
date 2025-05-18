
import React, { useState } from 'react';
import InventoryTable from "./InventoryTable";
import EditInventoryDialog from "./EditInventoryDialog";
import { InventoryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface InventoryTabContentProps {
  searchTerm: string;
  filteredInventoryItems: InventoryItem[];
  groupedInventoryItems: Record<string, InventoryItem[]>;
  onUpdateInventoryItem?: (updatedItem: InventoryItem) => void;
}

const InventoryTabContent: React.FC<InventoryTabContentProps> = ({ 
  searchTerm, 
  filteredInventoryItems, 
  groupedInventoryItems,
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

  const renderItemActions = (item: InventoryItem) => (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => handleEdit(item)}
    >
      <Edit className="h-4 w-4" />
    </Button>
  );

  return (
    <>
      {searchTerm ? (
        <InventoryTable 
          items={filteredInventoryItems} 
          title={`Resultados da busca: ${filteredInventoryItems.length} ${filteredInventoryItems.length === 1 ? 'item' : 'itens'}`} 
          actionColumn={true}
          renderActions={renderItemActions}
        />
      ) : (
        Object.entries(groupedInventoryItems).map(([category, items]) => (
          <InventoryTable 
            key={category} 
            items={items}
            title={category.charAt(0).toUpperCase() + category.slice(1)} 
            actionColumn={true}
            renderActions={renderItemActions}
          />
        ))
      )}

      <EditInventoryDialog 
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveItem}
      />
    </>
  );
};

export default InventoryTabContent;
