import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Camera, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { TransactionInputMethod } from '../../types';
import { getCategoryOptions } from '../../utils/transactionUtils';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    note: string;
  }) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<TransactionInputMethod>('manual');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];

  const categoryOptions = getCategoryOptions(type);

  const resetForm = () => {
    setAmount('');
    setType('expense');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setNote('');
    setErrors({});
    setActiveTab('manual');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (!date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        amount: Number(amount),
        type,
        category,
        date,
        note,
      });
      handleClose();
    }
  };

  const handleVoiceInput = () => {
    // In a real application, this would connect to the Web Speech API
    alert('Voice recognition would start here');
  };

  const handlePhotoUpload = () => {
    // In a real application, this would open the device camera or file picker
    alert('Photo upload would start here');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-title font-bold">Add Transaction</h2>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Input method tabs */}
        <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'manual'
                ? 'bg-white dark:bg-gray-800 text-primary-500 shadow-sm'
                : 'text-text-secondary dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('manual')}
          >
            <Plus size={18} className="inline mr-1" />
            Manual
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'voice'
                ? 'bg-white dark:bg-gray-800 text-primary-500 shadow-sm'
                : 'text-text-secondary dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('voice')}
          >
            <Mic size={18} className="inline mr-1" />
            Voice
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'photo'
                ? 'bg-white dark:bg-gray-800 text-primary-500 shadow-sm'
                : 'text-text-secondary dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('photo')}
          >
            <Camera size={18} className="inline mr-1" />
            Photo
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'manual' && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="number"
                      label="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      error={errors.amount}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      label="Type"
                      options={typeOptions}
                      value={type}
                      onChange={(value) => {
                        setType(value as 'income' | 'expense');
                        setCategory(''); // Reset category when type changes
                      }}
                    />
                  </div>
                </div>
                
                <Select
                  label="Category"
                  options={categoryOptions}
                  value={category}
                  onChange={setCategory}
                  error={errors.category}
                />
                
                <Input
                  type="date"
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  error={errors.date}
                />
                
                <Input
                  label="Note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note"
                />
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Transaction
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 mb-4">
                  <Mic size={32} />
                </div>
                <h3 className="text-subtitle font-semibold mb-2">Voice Input</h3>
                <p className="text-text-secondary dark:text-gray-400 mb-6">
                  Tap the button below and speak to add a transaction
                </p>
                <Button variant="primary" onClick={handleVoiceInput} icon={<Mic />}>
                  Start Recording
                </Button>
                <div className="mt-8 text-sm text-text-secondary dark:text-gray-400">
                  Say something like: "Add $45 for groceries yesterday"
                </div>
              </div>
            )}

            {activeTab === 'photo' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 mb-4">
                  <Camera size={32} />
                </div>
                <h3 className="text-subtitle font-semibold mb-2">Photo Input</h3>
                <p className="text-text-secondary dark:text-gray-400 mb-6">
                  Upload a receipt photo to automatically extract transaction details
                </p>
                <Button variant="primary" onClick={handlePhotoUpload} icon={<Camera />}>
                  Take Photo
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TransactionModal;