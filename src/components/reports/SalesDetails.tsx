
import { Sale } from "@/types";

interface SalesDetailsProps {
  sales: Sale[];
  formatPrice: (price: number) => string;
}

const SalesDetails = ({ sales, formatPrice }: SalesDetailsProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Detalhes das Vendas</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-medium">Data/Hora</th>
              <th className="p-3 font-medium">Cliente</th>
              <th className="p-3 font-medium">Itens</th>
              <th className="p-3 font-medium">Pagamento</th>
              <th className="p-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="p-3">
                  {new Date(sale.date).toLocaleString('pt-BR')}
                </td>
                <td className="p-3">
                  {sale.customerName || '-'}
                </td>
                <td className="p-3">
                  {sale.items.map((item, i) => (
                    <div key={i}>
                      {item.quantity}x {item.product.name}
                    </div>
                  ))}
                </td>
                <td className="p-3 capitalize">
                  {sale.paymentMethod}
                </td>
                <td className="p-3 text-right font-medium">
                  {formatPrice(sale.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDetails;
