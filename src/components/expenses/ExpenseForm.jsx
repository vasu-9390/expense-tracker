import React, { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORIES, PAYMENT_METHODS } from '../../utils/constants';
import { todayStr } from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const ExpenseForm = ({ editExpense = null, onSuccess }) => {
  const { colors } = useTheme();
  const { addExpense, updateExpense } = useExpenses();
  
  const [form, setForm] = useState({
    title: editExpense?.title || '',
    category: editExpense?.category || 'Food',
    amount: editExpense?.amount?.toString() || '',
    date: editExpense?.date || todayStr(),
    method: editExpense?.method || 'UPI'
  });
  
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setFormError('Please fill all fields with valid values');
      return;
    }

    if (editExpense) {
      updateExpense(editExpense.id, form);
    } else {
      addExpense(form);
    }

    if (onSuccess) onSuccess();
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <h2 className="text-2xl font-extrabold mb-1">
        {editExpense ? '✏️ Edit Expense' : '➕ Add Expense'}
      </h2>
      <p className="text-sm mb-6" style={{ color: colors.muted }}>
        Track your spending in real time
      </p>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Expense Title"
            placeholder="e.g. Monthly Rent"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: colors.muted }}>
                Category
              </label>
              <select
                className="w-full p-2.5 rounded-lg text-sm"
                style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <Input
              label="Amount (₹)"
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <Input
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: colors.muted }}>
                Payment Method
              </label>
              <select
                className="w-full p-2.5 rounded-lg text-sm"
                style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {formError && (
            <p className="text-sm m-0" style={{ color: colors.red }}>{formError}</p>
          )}

          <div className="flex gap-2.5">
            <Button type="submit" fullWidth className="py-3 text-base">
              {editExpense ? 'Update' : 'Add Expense'}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={onSuccess}
              className="py-3 px-5"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ExpenseForm;