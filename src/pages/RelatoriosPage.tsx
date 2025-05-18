import { useState } from "react";
import { usePDV } from "../context/PDVContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search, FileText } from "lucide-react"; // Replace FileXml with FileText
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import DateSelector from "../components/reports/DateSelector";
import SalesSummaryCards from "../components/reports/SalesSummaryCards";
import SalesAnalytics from "../components/reports/SalesAnalytics";
import SalesDetails from "../components/reports/SalesDetails";

import {
  formatDate,
  formatPrice,
  calculateTotalSales,
  getFilteredSales,
  getDateRangeSales,
  getMostSoldProducts,
  getPaymentMethodSummary,
  generateXML,
} from "../utils/salesUtils";

const RelatoriosPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const { getDailySales, getWeeklySales, getMonthlySales } = usePDV();
  
  const dailySales = getDailySales(selectedDate);
  const weeklySales = getWeeklySales(selectedDate);
  const monthlySales = getMonthlySales(selectedDate);
  
  const downloadXML = (sales: any[], period: string) => {
    const xml = generateXML(sales);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${period}-${format(new Date(), 'yyyy-MM-dd')}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        
        <div className="md:w-2/3">
          <SalesSummaryCards
            dailySales={dailySales}
            weeklySales={weeklySales}
            monthlySales={monthlySales}
            formatPrice={formatPrice}
            calculateTotalSales={calculateTotalSales}
          />
        </div>
      </div>
      
      <Tabs defaultValue="diario">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="diario">Relatório Diário</TabsTrigger>
            <TabsTrigger value="semanal">Relatório Semanal</TabsTrigger>
            <TabsTrigger value="mensal">Relatório Mensal</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
        
        {["diario", "semanal", "mensal"].map((periodo) => {
          const sales = periodo === "diario" 
            ? dailySales 
            : periodo === "semanal"
              ? weeklySales
              : monthlySales;
              
          const filteredSales = getDateRangeSales(getFilteredSales(sales, searchTerm), dateRange);
              
          const title = periodo === "diario"
            ? `Relatório do dia ${formatDate(selectedDate)}`
            : periodo === "semanal"
              ? `Relatório da semana de ${formatDate(selectedDate)}`
              : `Relatório do mês de ${selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
              
          return (
            <TabsContent key={periodo} value={periodo}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{title}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadXML(filteredSales, periodo)}
                    className="ml-auto"
                  >
                    <FileText className="mr-2 h-4 w-4" /> {/* FileText instead of FileXml */}
                    Baixar XML
                  </Button>
                </CardHeader>
                <CardContent>
                  {filteredSales.length > 0 ? (
                    <div className="space-y-6">
                      <SalesAnalytics
                        sales={filteredSales}
                        formatPrice={formatPrice}
                        getPaymentMethodSummary={getPaymentMethodSummary}
                        getMostSoldProducts={getMostSoldProducts}
                      />
                      <SalesDetails
                        sales={filteredSales}
                        formatPrice={formatPrice}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Nenhuma venda encontrada neste período</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default RelatoriosPage;
