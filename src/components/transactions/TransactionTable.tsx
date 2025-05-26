import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Filter, Edit, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Badge from '../ui/Badge';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryIcon, getCategoryOptions } from '../../utils/transactionUtils';
import { TransactionFilters } from '../../context/TransactionContext';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
  onFilter: (filters: TransactionFilters) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onDelete,
  onEdit,
  onFilter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleFilterChange = (field: keyof TransactionFilters, value: string) => {
    const newFilters = { ...filters, [field]: value };
    
    // If value is empty, remove the filter
    if (!value) {
      delete newFilters[field];
    }
    
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const resetFilters = () => {
    setFilters({});
    onFilter({});
  };

  const toggleSortDirection = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle date fields
    if (sortField === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }
    
    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // Handle number comparison
    return sortDirection === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  // Get all categories from transactions
  const allCategories = Array.from(new Set(transactions.map(t => t.category)));
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...allCategories.map(category => ({ value: category, label: category })),
  ];

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-subtitle font-semibold mb-2 sm:mb-0">Transactions</h2>
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Filter size={16} />} 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </Button>
      </div>
      
      {isFilterOpen && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select
              label="Type"
              options={typeOptions}
              value={filters.type || ''}
              onChange={(value) => handleFilterChange('type', value as 'income' | 'expense' | '')}
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={filters.category || ''}
              onChange={(value) => handleFilterChange('category', value)}
            />
            
            <Input
              type="text"
              label="Search"
              placeholder="Search by notes, amount..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              type="date"
              label="Start Date"
              value={filters.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            
            <Input
              type="date"
              label="End Date"
              value={filters.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset
            </Button>
            <Button variant="primary" size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      {sortedTransactions.length === 0 ? (
        <div className="text-center py-8 text-text-secondary dark:text-gray-400">
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-small font-medium"
                    onClick={() => toggleSortDirection('date')}
                  >
                    Date
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-small font-medium"
                    onClick={() => toggleSortDirection('note')}
                  >
                    Description
                    {sortField === 'note' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-small font-medium"
                    onClick={() => toggleSortDirection('category')}
                  >
                    Category
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button 
                    className="flex items-center ml-auto text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-small font-medium"
                    onClick={() => toggleSortDirection('amount')}
                  >
                    Amount
                    {sortField === 'amount' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3 px-4 text-small">{formatDate(transaction.date)}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{transaction.note || 'Untitled'}</p>
                      <Badge 
                        variant={transaction.type === 'income' ? 'success' : 'error'}
                        className="mt-1"
                      >
                        {transaction.type}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getCategoryIcon(transaction.category, 16)}
                      <span className="ml-2">{transaction.category}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-success-500' : 'text-error-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                        onClick={() => onEdit(transaction)}
                        aria-label="Edit transaction"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary dark:text-gray-400 hover:text-error-500 dark:hover:text-error-500"
                        onClick={() => onDelete(transaction.id)}
                        aria-label="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default TransactionTable;