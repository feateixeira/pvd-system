
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Truck, User } from "lucide-react";

interface CustomerInfoProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  isDelivery: boolean;
  setIsDelivery: (value: boolean) => void;
  formatPrice: (price: number) => string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerName,
  setCustomerName,
  deliveryAddress,
  setDeliveryAddress,
  isDelivery,
  setIsDelivery,
  formatPrice
}) => {
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-md">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 mb-2">
          <User size={18} />
          <Label htmlFor="customer-name" className="font-medium">Informações do Cliente</Label>
        </div>
        
        <Input
          id="customer-name"
          placeholder="Nome do Cliente"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mb-2"
        />
        
        <Textarea
          placeholder="Endereço do Cliente"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          rows={2}
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Truck size={18} />
            <Label htmlFor="delivery-toggle" className="font-medium">Entrega</Label>
          </div>
          <Switch 
            id="delivery-toggle" 
            checked={isDelivery}
            onCheckedChange={setIsDelivery}
          />
        </div>
        
        {isDelivery && (
          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={12} /> Taxa de entrega: {formatPrice(4)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;
