
import { Sale } from "@/types";
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const calculateTotalSales = (sales: Sale[]) => {
  return sales.reduce((total, sale) => total + sale.total, 0);
};

export const countTotalItems = (sales: Sale[]) => {
  return sales.reduce((total, sale) => {
    return total + sale.items.reduce((itemTotal: number, item: any) => itemTotal + item.quantity, 0);
  }, 0);
};

export const getMostSoldProducts = (sales: Sale[], limit = 5) => {
  const productCount: Record<string, { count: number; name: string }> = {};
  
  sales.forEach(sale => {
    sale.items.forEach((item: any) => {
      const id = item.product.id;
      if (!productCount[id]) {
        productCount[id] = { count: 0, name: item.product.name };
      }
      productCount[id].count += item.quantity;
    });
  });
  
  return Object.values(productCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const getPaymentMethodSummary = (sales: Sale[]) => {
  const summary: Record<string, { count: number; total: number }> = {
    "dinheiro": { count: 0, total: 0 },
    "cartão de crédito": { count: 0, total: 0 },
    "cartão de débito": { count: 0, total: 0 },
    "pix": { count: 0, total: 0 },
  };
  
  sales.forEach(sale => {
    if (summary[sale.paymentMethod]) {
      summary[sale.paymentMethod].count += 1;
      summary[sale.paymentMethod].total += sale.total;
    }
  });
  
  return summary;
};

export const getFilteredSales = (sales: Sale[], searchTerm: string) => {
  if (!searchTerm) return sales;
  
  return sales.filter(sale => 
    sale.items.some(item => 
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const getDateRangeSales = (sales: Sale[], dateRange: DateRange | undefined) => {
  if (!dateRange?.from || !dateRange?.to) return sales;
  
  return sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return isWithinInterval(saleDate, {
      start: dateRange.from,
      end: dateRange.to || dateRange.from,
    });
  });
};

export const generateXML = (sales: Sale[]) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<vendas>\n';
  
  sales.forEach(sale => {
    xml += '  <venda>\n';
    xml += `    <id>${sale.id}</id>\n`;
    xml += `    <data>${new Date(sale.date).toISOString()}</data>\n`;
    xml += `    <total>${sale.total}</total>\n`;
    xml += `    <formaPagamento>${sale.paymentMethod}</formaPagamento>\n`;
    if (sale.customerName) xml += `    <cliente>${sale.customerName}</cliente>\n`;
    if (sale.deliveryAddress) xml += `    <endereco>${sale.deliveryAddress}</endereco>\n`;
    xml += '    <itens>\n';
    
    sale.items.forEach(item => {
      xml += '      <item>\n';
      xml += `        <produto>${item.product.name}</produto>\n`;
      xml += `        <quantidade>${item.quantity}</quantidade>\n`;
      xml += `        <precoUnitario>${item.product.price}</precoUnitario>\n`;
      if (item.observation) xml += `        <observacao>${item.observation}</observacao>\n`;
      xml += '      </item>\n';
    });
    
    xml += '    </itens>\n';
    xml += '  </venda>\n';
  });
  
  xml += '</vendas>';
  return xml;
};
