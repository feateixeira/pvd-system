import React, { useRef } from 'react';
import { PaymentMethod } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Printer, User } from "lucide-react";
import PrintableOrder from './PrintableOrder';
import { usePDV } from '@/context/PDVContext';

interface CheckoutDialogProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  observation: string;
  setObservation: (obs: string) => void;
  customerName: string;
  deliveryAddress: string;
  isDelivery: boolean;
  total: number;
  formatPrice: (price: number) => string;
  onClose: () => void;
  onPrint: () => void;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  paymentMethod,
  setPaymentMethod,
  observation,
  setObservation,
  customerName,
  deliveryAddress,
  isDelivery,
  total,
  formatPrice,
  onClose,
  onPrint
}) => {
  const { cart } = usePDV();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Pedido</title>
            <style>
              body * {
                visibility: hidden;
              }

              #printableOrder, #printableOrder * {
                visibility: visible;
              }

              #printableOrder {
                position: absolute;
                left: 0;
                top: 0;
                width: 80mm;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                line-height: 1.2;
                margin: 0;
                padding: 5mm;
                color: #000000;
              }

              #printableOrder h3 {
                text-align: right;
                font-size: 10px;
                margin-bottom: 5mm;
                color: #000000;
              }

              #printableOrder h2 {
                font-size: 20px;
                margin: 2mm 0;
                align-items: center;
                text-align: center;
                color: #000000;
              }

              #printableOrder h2.comp {
                font-size: 12px;
                margin-bottom: 5mm;
                color: #000000;
              }

              #printableOrder ul {
                list-style: none;
                padding: 0;
                font-weight: bold;
                margin: 0;
                color: #000000;
              }

              #printableOrder ul li {
                margin: 1mm 0;
                font-size: 18px;
                line-height: 1.2;
                color: #000000;
              }

              #printableOrder p {
                text-align: right;
                font-size: 20px;
                font-weight: bold;
                margin: 2mm 0;
                color: #000000;
              }

              #printableOrder h5 {
                font-size: 14px;
                margin: 2mm 0;
                text-align: right;
                color: #000000;
              }

              #printableOrder h4 {
                text-align: center;
                font-size: 14px;
                margin: 5mm 0;
                color: #000000;
              }

              #printableOrder .img-nabrasa {
                text-align: center;
                margin-top: 5mm;
              }

              #printableOrder .divider {
                border-top: 1px dashed #000000;
                margin: 5mm 0;
              }

              #printableOrder .total-section {
                border-top: 2px solid #000000;
                margin-top: 5mm;
                padding-top: 5mm;
              }

              #printableOrder .item-price {
                color: #000000;
              }

              #printableOrder .item-quantity {
                color: #000000;
              }
            </style>
          </head>
          <body>
            ${printRef.current?.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
    onPrint();
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <PrintableOrder
            cart={cart}
            customerName={customerName}
            deliveryAddress={deliveryAddress}
            isDelivery={isDelivery}
            paymentMethod={paymentMethod}
            observation={observation}
            total={total}
            formatPrice={formatPrice}
          />
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Confirme os detalhes do pedido antes de imprimir.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Forma de Pagamento</label>
            <Select 
              value={paymentMethod} 
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="cartão de crédito">Cartão de Crédito</SelectItem>
                <SelectItem value="cartão de débito">Cartão de Débito</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Observação (opcional)</label>
            <Textarea
              placeholder="Adicione uma observação..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </div>
          
          {isDelivery && (
            <div className="flex justify-between text-sm">
              <span>Taxa de entrega:</span>
              <span>{formatPrice(4)}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Informações do Cliente</label>
            <div className="text-sm bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <User size={14} />
                <span>{customerName || "Cliente não identificado"}</span>
              </div>
              {deliveryAddress && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{deliveryAddress}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right font-bold text-lg">
            Total: {formatPrice(total)}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handlePrint}
            className="bg-pdv-orange hover:bg-pdv-light-orange"
          >
            <Printer className="mr-2" size={16} />
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default CheckoutDialog;
