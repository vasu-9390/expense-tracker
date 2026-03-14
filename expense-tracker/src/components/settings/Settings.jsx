import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useExpenses } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const Settings = () => {
  const { user } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();
  const { salary, updateSalary } = useExpenses();
  
  const [salaryInput, setSalaryInput] = useState('');

  useEffect(() => {
    setSalaryInput(String(salary));
  }, [salary]);

  const handleSalaryUpdate = () => {
    if (salaryInput && !isNaN(salaryInput) && Number(salaryInput) > 0) {
      updateSalary(Number(salaryInput));
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 className="text-2xl font-extrabold mb-1">⚙️ Settings</h2>
      <p className="text-sm mb-6" style={{ color: colors.muted }}>
        Manage your profile and preferences
      </p>

      <Card className="mb-4">
        <div className="font-bold text-sm mb-4">👤 Profile</div>
        
        <div className="flex items-center gap-3.5 mb-5">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-base font-extrabold text-white"
            style={{ background: colors.accent }}
          >
            {user?.avatar}
          </div>
          <div>
            <div className="font-bold text-base">{user?.name}</div>
            <div className="text-xs" style={{ color: colors.muted }}>{user?.email}</div>
          </div>
        </div>

        <Input
          label="Monthly Salary (₹)"
          type="number"
          value={salaryInput}
          onChange={(e) => setSalaryInput(e.target.value)}
        />
        
        <Button onClick={handleSalaryUpdate} className="mt-3">
          Update Salary
        </Button>
      </Card>

      <Card className="mb-4">
        <div className="font-bold text-sm mb-3.5">🎨 Appearance</div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Color Theme</span>
          <Button onClick={toggleTheme} variant="secondary">
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="font-bold text-sm mb-3.5">📊 Budget Limits</div>
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.name} 
            className="flex justify-between items-center py-2"
            style={{ borderBottom: `1px solid ${colors.border}22` }}
          >
            <span className="text-sm">{cat.icon} {cat.name}</span>
            <span className="text-sm font-bold" style={{ color: cat.color }}>
              {formatCurrency(cat.budget)}
            </span>
          </div>
        ))}
        <p className="text-xs mt-2.5" style={{ color: colors.muted }}>
          Custom budget editing coming soon!
        </p>
      </Card>
    </div>
  );
};

export default Settings;