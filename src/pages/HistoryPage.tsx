import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/ui/Button';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionModal from '../components/transactions/TransactionModal';
import { useTransactions } from '../context/TransactionContext';
import { Transaction } from '../types';

const HistoryPage: React.FC = () => {
  const { 
    transactions, 
    addTransaction, 
    deleteTransaction, 
    updateTransaction,
    filterTransactions
  } = useTransactions();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  // Handle adding a new transaction
  const handleAddTransaction = (transaction: any) => {
    addTransaction(transaction);
    setIsAddModalOpen(false);
  };

  // Handle editing a transaction
  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Handle updating a transaction
  const handleUpdateTransaction = (transaction: any) => {
    if (currentTransaction) {
      updateTransaction(currentTransaction.id, transaction);
      setIsEditModalOpen(false);
      setCurrentTransaction(null);
    }
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (id: string) => {
    // In a real app, you might want to add a confirmation dialog here
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  // Handle filtering transactions
  const handleFilterTransactions = (filters: any) => {
    const filtered = filterTransactions(filters);
    setFilteredTransactions(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <PageContainer
          title="Transaction History"
          subtitle="View and manage all your transactions"
          actions={
            <Button 
              variant="primary" 
              icon={<PlusCircle size={18} />} 
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Transaction
            </Button>
          }
        >
          <TransactionTable
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
            onFilter={handleFilterTransactions}
          />
        </PageContainer>
      </main>
      
      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
      />
      
      {/* Edit Transaction Modal */}
      {currentTransaction && (
        <TransactionModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentTransaction(null);
          }}
          onSave={handleUpdateTransaction}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default HistoryPage;