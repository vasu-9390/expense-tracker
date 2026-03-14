import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const StatsCards = ({ salary, expenses }) => {
  const { colors } = useTheme();
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = salary - totalExpenses;
  const savingsRate = salary > 0 ? Math.round((remaining / salary) * 100) : 0;

  const stats = [
    { label: 'Monthly Income', value: formatCurrency(salary), icon: '💼', col: colors.accent },
    { label: 'Total Expenses', value: formatCurrency(totalExpenses), icon: '💸', col: colors.red },
    { label: 'Remaining', value: formatCurrency(Math.max(remaining, 0)), icon: '💰', col: colors.green },
    { label: 'Savings Rate', value: `${Math.max(savingsRate, 0)}%`, icon: '📊', col: colors.purple },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex items-center gap-3.5">
          <div className="text-3xl">{stat.icon}</div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
              {stat.label}
            </div>
            <div className="text-xl font-extrabold mt-1" style={{ color: stat.col }}>
              {stat.value}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;