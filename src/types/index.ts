export interface User {
  id: string;
  name: string;
  email: string;
}

export type ThemeMode = 'light' | 'dark';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: TransactionCategory;
  date: string;
  note?: string;
}

export type TransactionCategory = 
  | 'housing' 
  | 'transportation' 
  | 'food' 
  | 'utilities' 
  | 'insurance'
  | 'healthcare' 
  | 'savings' 
  | 'personal' 
  | 'entertainment' 
  | 'other'
  | 'salary'
  | 'investment'
  | 'gift';

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  recentTransactions: Transaction[];
}

export type TransactionInputMethod = 'manual' | 'voice' | 'photo';

export interface ChartData {
  labels: string[];
  values: number[];
}