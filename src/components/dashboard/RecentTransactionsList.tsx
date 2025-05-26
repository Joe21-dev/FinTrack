import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryIcon } from '../../utils/transactionUtils';

interface RecentTransactionsListProps {
  transactions: Transaction[];
}

const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8 text-text-secondary dark:text-gray-400">
          <p>No transactions yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 dark:bg-green-900 text-success-500' 
                  : 'bg-red-100 dark:bg-red-900 text-error-500'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
              </div>
              
              <div>
                <p className="font-medium">{transaction.note || 'Untitled'}</p>
                <div className="flex items-center mt-1">
                  <Badge 
                    variant={transaction.type === 'income' ? 'success' : 'error'}
                    className="mr-2"
                  >
                    {transaction.type}
                  </Badge>
                  <span className="text-small text-text-secondary dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-success-500' : 'text-error-500'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-small text-text-secondary dark:text-gray-400 flex items-center mt-1 justify-end">
                {getCategoryIcon(transaction.category, 14)}
                <span className="ml-1">{transaction.category}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentTransactionsList;