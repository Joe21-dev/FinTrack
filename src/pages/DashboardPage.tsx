import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/ui/Button';
import FinancialSummaryCard from '../components/dashboard/FinancialSummaryCard';
import ExpensePieChart from '../components/dashboard/ExpensePieChart';
import MonthlyBalanceChart from '../components/dashboard/MonthlyBalanceChart';
import RecentTransactionsList from '../components/dashboard/RecentTransactionsList';
import TransactionModal from '../components/transactions/TransactionModal';
import { useTransactions } from '../context/TransactionContext';

const DashboardPage: React.FC = () => {
  const { 
    summary, 
    addTransaction, 
    expensesByCategory, 
    monthlyBalance 
  } = useTransactions();
  
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleAddTransaction = (transaction: any) => {
    addTransaction(transaction);
    setIsTransactionModalOpen(false);
  };

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <PageContainer
          title="Dashboard"
          subtitle="Overview of your financial status"
          actions={
            <Button 
              variant="primary" 
              icon={<PlusCircle size={18} />} 
              onClick={() => setIsTransactionModalOpen(true)}
            >
              Add Transaction
            </Button>
          }
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <FinancialSummaryCard
                balance={summary.balance}
                income={summary.totalIncome}
                expenses={summary.totalExpense}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <motion.div variants={item} className="h-[350px]">
                <ExpensePieChart data={expensesByCategory} />
              </motion.div>
              
              <motion.div variants={item} className="h-[350px]">
                <MonthlyBalanceChart data={monthlyBalance} />
              </motion.div>
            </div>
            
            <motion.div variants={item}>
              <RecentTransactionsList transactions={summary.recentTransactions} />
            </motion.div>
          </motion.div>
        </PageContainer>
      </main>
      
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSave={handleAddTransaction}
      />
      
      <Footer />
    </div>
  );
};

export default DashboardPage;