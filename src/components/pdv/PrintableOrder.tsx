import React from 'react';
import { CartItem as CartItemType } from '@/types';

interface PrintableOrderProps {
  cart: CartItemType[];
  customerName: string;
  deliveryAddress: string;
  isDelivery: boolean;
  paymentMethod: string;
  observation: string;
  total: number;
  formatPrice: (price: number) => string;
}

const PrintableOrder: React.FC<PrintableOrderProps> = ({
  cart,
  customerName,
  deliveryAddress,
  isDelivery,
  paymentMethod,
  observation,
  total,
  formatPrice
}) => {
  return (
    <div id="printableOrder">
      <div className="img-nabrasa">
        <h2>NABRASA</h2>
        <h2 className="comp">Hamburgueria Artesanal</h2>
      </div>

      <h3>{new Date().toLocaleString('pt-BR')}</h3>

      {customerName && (
        <div>
          <h5>Cliente: {customerName}</h5>
          {deliveryAddress && <h5>Endereço: {deliveryAddress}</h5>}
          {isDelivery && <h5>Taxa de entrega: {formatPrice(4)}</h5>}
        </div>
      )}

      <div className="divider" />

      <ul>
        {cart.map((item) => (
          <li key={`${item.product.id}-${item.sauces?.map(s => s.id).join('-')}`}>
            {item.quantity}x {item.product.name}
            {item.sauces && item.sauces.length > 0 && (
              <span> - Molhos: {item.sauces.map(sauce => sauce.name.replace('Molho ', '')).join(", ")}</span>
            )}
            {item.observation && <span> - Obs: {item.observation}</span>}
          </li>
        ))}
      </ul>

      <div className="divider" />

      <div className="total-section">
        <p>Total: {formatPrice(total)}</p>
        <p>Forma de Pagamento: {paymentMethod}</p>
      </div>

      {observation && (
        <div>
          <h5>Observação: {observation}</h5>
        </div>
      )}

      <h4>Obrigado pela preferência!</h4>
    </div>
  );
};

export default PrintableOrder; 