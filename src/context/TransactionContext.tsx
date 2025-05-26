import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, FinancialSummary, ChartData } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
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
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Calculate financial summary
  const summary: FinancialSummary = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0),
    
    totalExpense: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0),
    
    balance: transactions
      .reduce((sum, t) => t.type === 'income' ? sum + Number(t.amount) : sum - Number(t.amount), 0),
    
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
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
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
      t.type === 'income' ? sum + Number(t.amount) : sum - Number(t.amount), 0);

    monthlyBalance.labels.push(label);
    monthlyBalance.values.push(balance);
  });

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .insert([{ ...transaction, user_id: user?.id }]);

      if (error) throw error;
      await fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', id);

      if (error) throw error;
      await fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const filterTransactions = (filters: TransactionFilters) => {
    return transactions.filter(t => {
      if (filters.type && t.type !== filters.type) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.startDate && new Date(t.date) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(t.date) > new Date(filters.endDate)) return false;
      
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