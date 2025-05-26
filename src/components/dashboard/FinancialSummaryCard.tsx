import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

interface FinancialSummaryCardProps {
  balance: number;
  income: number;
  expenses: number;
}

const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({
  balance,
  income,
  expenses
}) => {
  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
            <Wallet size={24} className="text-primary-500" />
          </div>
          <div>
            <p className="text-small text-text-secondary dark:text-gray-400">Current Balance</p>
            <h3 className="text-title font-bold">{formatCurrency(balance)}</h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-success-100 dark:bg-green-900 p-3 rounded-full">
            <TrendingUp size={24} className="text-success-500" />
          </div>
          <div>
            <p className="text-small text-text-secondary dark:text-gray-400">Total Income</p>
            <h3 className="text-title font-bold text-success-500">{formatCurrency(income)}</h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <TrendingDown size={24} className="text-error-500" />
          </div>
          <div>
            <p className="text-small text-text-secondary dark:text-gray-400">Total Expenses</p>
            <h3 className="text-title font-bold text-error-500">{formatCurrency(expenses)}</h3>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinancialSummaryCard;