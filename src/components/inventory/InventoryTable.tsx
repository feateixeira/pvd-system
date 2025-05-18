
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InventoryItem } from "@/types";

interface InventoryTableProps {
  items: InventoryItem[];
  title: string;
  actionColumn?: boolean;
  renderActions?: (item: InventoryItem) => React.ReactNode;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ 
  items, 
  title, 
  actionColumn = false,
  renderActions
}) => {
  const getStockStatus = (item: InventoryItem) => {
    if (!item.minQuantity) return "normal";
    
    if (item.quantity <= item.minQuantity * 0.5) {
      return "critical";
    } else if (item.quantity <= item.minQuantity) {
      return "low";
    }
    return "normal";
  };

  const getUnitDisplay = (unit: string, quantity: number) => {
    if (unit === "unidade") {
      return quantity === 1 ? "unidade" : "unidades";
    }
    return unit;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border shadow bg-white mb-6">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Quantidade Mínima</TableHead>
            <TableHead>Status</TableHead>
            {actionColumn && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const status = getStockStatus(item);
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{getUnitDisplay(item.unit, item.quantity)}</TableCell>
                <TableCell>{item.minQuantity || "-"}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      status === "critical" ? "bg-red-500" : 
                      status === "low" ? "bg-yellow-500" : 
                      "bg-green-500"
                    }
                  >
                    {status === "critical" ? "Crítico" : 
                     status === "low" ? "Baixo" : 
                     "Normal"}
                  </Badge>
                </TableCell>
                {actionColumn && renderActions && (
                  <TableCell className="text-right">
                    {renderActions(item)}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
