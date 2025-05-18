
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "lucide-react";
import { Sale } from "@/types";

interface SalesAnalyticsProps {
  sales: Sale[];
  formatPrice: (price: number) => string;
  getPaymentMethodSummary: (sales: Sale[]) => Record<string, { count: number; total: number }>;
  getMostSoldProducts: (sales: Sale[], limit?: number) => Array<{ count: number; name: string }>;
}

const SalesAnalytics = ({
  sales,
  formatPrice,
  getPaymentMethodSummary,
  getMostSoldProducts,
}: SalesAnalyticsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <BarChart className="mr-2" size={20} />
          Resumo de Vendas
        </h3>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Formas de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(getPaymentMethodSummary(sales)).map(([method, data]) => (
                data.count > 0 && (
                  <div key={method} className="flex justify-between items-center mb-2">
                    <span className="capitalize">{method}</span>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(data.total)}</p>
                      <p className="text-xs text-gray-500">{data.count} {data.count === 1 ? 'venda' : 'vendas'}</p>
                    </div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <LineChart className="mr-2" size={20} />
          Produtos Mais Vendidos
        </h3>
        <Card>
          <CardContent className="p-4">
            {getMostSoldProducts(sales).length > 0 ? (
              <ul className="space-y-3">
                {getMostSoldProducts(sales).map((product, i) => (
                  <li key={i} className="flex justify-between">
                    <span className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pdv-blue text-white text-xs mr-2">
                        {i + 1}
                      </span>
                      {product.name}
                    </span>
                    <span className="font-medium">{product.count} {product.count === 1 ? 'item' : 'itens'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-4">Nenhum produto vendido neste período</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalytics;
