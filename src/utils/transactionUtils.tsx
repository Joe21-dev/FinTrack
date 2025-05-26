import React from 'react';
import { 
  Home, 
  Car, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Heart, 
  PiggyBank, 
  User, 
  Music, 
  HelpCircle,
  Briefcase,
  TrendingUp,
  Gift
} from 'lucide-react';
import { TransactionCategory } from '../types';

/**
 * Get category icon based on category name
 */
export const getCategoryIcon = (category: string, size: number = 18) => {
  const iconProps = { size };
  
  switch (category) {
    case 'housing':
      return <Home {...iconProps} />;
    case 'transportation':
      return <Car {...iconProps} />;
    case 'food':
      return <ShoppingCart {...iconProps} />;
    case 'utilities':
      return <Zap {...iconProps} />;
    case 'insurance':
      return <Shield {...iconProps} />;
    case 'healthcare':
      return <Heart {...iconProps} />;
    case 'savings':
      return <PiggyBank {...iconProps} />;
    case 'personal':
      return <User {...iconProps} />;
    case 'entertainment':
      return <Music {...iconProps} />;
    case 'salary':
      return <Briefcase {...iconProps} />;
    case 'investment':
      return <TrendingUp {...iconProps} />;
    case 'gift':
      return <Gift {...iconProps} />;
    default:
      return <HelpCircle {...iconProps} />;
  }
};

/**
 * Get category options for select input based on transaction type
 */
export const getCategoryOptions = (type: 'income' | 'expense') => {
  const incomeCategories = [
    { value: 'salary', label: 'Salary' },
    { value: 'investment', label: 'Investment' },
    { value: 'gift', label: 'Gift' },
    { value: 'other', label: 'Other' }
  ];
  
  const expenseCategories = [
    { value: 'housing', label: 'Housing' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food', label: 'Food & Groceries' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'savings', label: 'Savings & Investments' },
    { value: 'personal', label: 'Personal' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' }
  ];
  
  return type === 'income' ? incomeCategories : expenseCategories;
};