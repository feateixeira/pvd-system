
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sale } from "@/types";

interface SalesSummaryCardsProps {
  dailySales: Sale[];
  weeklySales: Sale[];
  monthlySales: Sale[];
  formatPrice: (price: number) => string;
  calculateTotalSales: (sales: Sale[]) => number;
}

const SalesSummaryCards = ({
  dailySales,
  weeklySales,
  monthlySales,
  formatPrice,
  calculateTotalSales,
}: SalesSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Vendas Diárias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(calculateTotalSales(dailySales))}</div>
          <p className="text-sm text-gray-500">{dailySales.length} vendas</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Vendas Semanais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(calculateTotalSales(weeklySales))}</div>
          <p className="text-sm text-gray-500">{weeklySales.length} vendas</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Vendas Mensais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(calculateTotalSales(monthlySales))}</div>
          <p className="text-sm text-gray-500">{monthlySales.length} vendas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesSummaryCards;
