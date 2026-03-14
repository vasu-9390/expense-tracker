import React, { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import Card from '../common/Card';
import CategoryFilter from './CategoryFilter';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';

const ExpenseHistory = () => {
  const { colors } = useTheme();
  const { filteredExpenses, filterCat, setFilterCat, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  if (showEditForm) {
    return (
      <ExpenseForm 
        editExpense={editingExpense} 
        onSuccess={() => {
          setShowEditForm(false);
          setEditingExpense(null);
        }} 
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-1">📋 Expense History</h2>
      <p className="text-sm mb-5" style={{ color: colors.muted }}>
        View, edit, and delete your transactions
      </p>

      <CategoryFilter filterCat={filterCat} setFilterCat={setFilterCat} />

      <Card className="p-0 overflow-hidden">
        <ExpenseTable 
          expenses={filteredExpenses} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
};

export default ExpenseHistory;