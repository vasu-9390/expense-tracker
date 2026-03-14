import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const Highlights = ({ catTotals, remaining, savingsRate, expenseCount, totalExpenses }) => {
  const { colors } = useTheme();
  const topCategory = [...catTotals].sort((a, b) => b.total - a.total)[0];
  
  const highlights = [
    `Most spent on: ${topCategory?.name} (${formatCurrency(topCategory?.total || 0)})`,
    `Saved ${formatCurrency(Math.max(remaining, 0))} — ${Math.max(savingsRate, 0)}% of income`,
    `Made ${expenseCount} transactions this month`,
    `Average daily spend: ${formatCurrency(Math.round(totalExpenses / 30))}`,
  ];

  return (
    <Card>
      <div className="font-bold text-sm mb-3">📌 Month Highlights</div>
      <div className="flex flex-col gap-2">
        {highlights.map((msg, i) => (
          <div 
            key={i} 
            className="p-2.5 text-sm rounded-lg"
            style={{ background: colors.bg }}
          >
            {msg}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Highlights;