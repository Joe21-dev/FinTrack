import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, FinancialSummary, ChartData } from '../types';
import { mockTransactions } from '../data/mockData';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  summary: FinancialSummary;
  expensesByCategory: ChartData;
  monthlyBalance: ChartData;
  filterTransactions: (filters: TransactionFilters) => Transaction[];
}

export interface TransactionFilters {
  type?: 'income' | 'expense';
  category?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Initialize with mock data
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(mockTransactions);
      localStorage.setItem('transactions', JSON.stringify(mockTransactions));
    }
  }, []);

  // Calculate financial summary
  const summary: FinancialSummary = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    
    totalExpense: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    
    balance: transactions
      .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0),
    
    recentTransactions: [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  };

  // Calculate expenses by category
  const expensesByCategory: ChartData = {
    labels: [],
    values: []
  };

  // Group expenses by category
  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Convert to chart data format
  Object.entries(expenseCategories).forEach(([category, amount]) => {
    expensesByCategory.labels.push(category);
    expensesByCategory.values.push(amount);
  });

  // Calculate monthly balance for the last 6 months
  const monthlyBalance: ChartData = {
    labels: [],
    values: []
  };

  // Get last 6 months
  const today = new Date();
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      label: date.toLocaleString('default', { month: 'short' })
    };
  }).reverse();

  // Calculate balance for each month
  lastSixMonths.forEach(({ year, month, label }) => {
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });

    const balance = monthTransactions.reduce((sum, t) => 
      t.type === 'income' ? sum + t.amount : sum - t.amount, 0);

    monthlyBalance.labels.push(label);
    monthlyBalance.values.push(balance);
  });

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9)
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...transaction } : t
    );
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const filterTransactions = (filters: TransactionFilters) => {
    return transactions.filter(t => {
      // Filter by type
      if (filters.type && t.type !== filters.type) return false;
      
      // Filter by category
      if (filters.category && t.category !== filters.category) return false;
      
      // Filter by date range
      if (filters.startDate && new Date(t.date) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(t.date) > new Date(filters.endDate)) return false;
      
      // Filter by search term
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesNote = t.note?.toLowerCase().includes(term) || false;
        const matchesCategory = t.category.toLowerCase().includes(term);
        const matchesAmount = t.amount.toString().includes(term);
        
        if (!matchesNote && !matchesCategory && !matchesAmount) return false;
      }
      
      return true;
    });
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      summary,
      expensesByCategory,
      monthlyBalance,
      filterTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};