
import React from 'react';
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface InventorySearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const InventorySearch: React.FC<InventorySearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Buscar no estoque..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default InventorySearch;
