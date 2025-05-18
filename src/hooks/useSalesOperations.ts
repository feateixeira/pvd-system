
import { Sale } from '../types';

export const useSalesOperations = (sales: Sale[]) => {
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  const getDailySales = (date: Date) => {
    // Ensure we're comparing Date objects
    return sales.filter(sale => {
      const saleDate = sale.date instanceof Date ? sale.date : new Date(sale.date);
      return isSameDay(saleDate, date);
    });
  };
  
  const getWeeklySales = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return sales.filter(sale => {
      const saleDate = sale.date instanceof Date ? sale.date : new Date(sale.date);
      return saleDate >= startOfWeek && saleDate <= endOfWeek;
    });
  };
  
  const getMonthlySales = (date: Date) => {
    return sales.filter(sale => {
      const saleDate = sale.date instanceof Date ? sale.date : new Date(sale.date);
      return saleDate.getMonth() === date.getMonth() && 
             saleDate.getFullYear() === date.getFullYear();
    });
  };

  return {
    getDailySales,
    getWeeklySales,
    getMonthlySales
  };
};
