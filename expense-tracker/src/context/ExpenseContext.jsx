import React, { createContext, useState, useContext, useEffect } from 'react';
import { DEMO_EXPENSES, CATEGORIES } from '../utils/constants';
import { useAuth } from './AuthContext';
import { useAlert } from './AlertContext';
import { formatCurrency } from '../utils/helpers';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [expenses, setExpenses] = useState({});
  const [salaries, setSalaries] = useState({});
  const [filterCat, setFilterCat] = useState('All');

  const myExpenses = user ? (expenses[user.id] || DEMO_EXPENSES) : [];
  const mySalary = user ? (salaries[user.id] || user.salary) : 50000;

  const addExpense = (expenseData) => {
    if (!user) return;
    
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      amount: Number(expenseData.amount)
    };
    
    const updated = [...(expenses[user.id] || []), newExpense];
    setExpenses(prev => ({ ...prev, [user.id]: updated }));
    
    // Check budget alert
    const catTotals = CATEGORIES.map(cat => ({
      ...cat,
      total: updated.filter(e => e.category === cat.name).reduce((s, e) => s + e.amount, 0)
    }));
    
    const catTotal = catTotals.find(x => x.name === expenseData.category)?.total || 0;
    const cat = CATEGORIES.find(x => x.name === expenseData.category);
    
    if (cat && catTotal > cat.budget) {
      showAlert(`⚠️ Exceeded ${expenseData.category} budget by ${formatCurrency(catTotal - cat.budget)}`, 'warn');
    } else {
      showAlert('✅ Expense added successfully!', 'success');
    }
  };

  const updateExpense = (id, expenseData) => {
    if (!user) return;
    
    const updated = (expenses[user.id] || []).map(e => 
      e.id === id ? { ...expenseData, id, amount: Number(expenseData.amount) } : e
    );
    setExpenses(prev => ({ ...prev, [user.id]: updated }));
    showAlert('✅ Expense updated successfully!', 'success');
  };

  const deleteExpense = (id) => {
    if (!user) return;
    
    const updated = (expenses[user.id] || []).filter(e => e.id !== id);
    setExpenses(prev => ({ ...prev, [user.id]: updated }));
    showAlert('✅ Expense deleted successfully!', 'success');
  };

  const updateSalary = (newSalary) => {
    if (!user) return;
    setSalaries(prev => ({ ...prev, [user.id]: Number(newSalary) }));
    showAlert('✅ Salary updated successfully!', 'success');
  };

  const filteredExpenses = filterCat === 'All' 
    ? myExpenses 
    : myExpenses.filter(e => e.category === filterCat);

  return (
    <ExpenseContext.Provider value={{
      expenses: myExpenses,
      filteredExpenses,
      salary: mySalary,
      salaries,
      filterCat,
      setFilterCat,
      addExpense,
      updateExpense,
      deleteExpense,
      updateSalary
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};