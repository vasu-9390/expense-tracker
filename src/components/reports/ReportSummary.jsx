import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const ReportSummary = ({ salary, totalExpenses, expenseCount }) => {
  const { colors } = useTheme();
  const remaining = salary - totalExpenses;
  
  const summaries = [
    { label: 'Total Income', value: formatCurrency(salary), col: colors.accent },
    { label: 'Total Spent', value: formatCurrency(totalExpenses), col: colors.red },
    { label: 'Net Savings', value: formatCurrency(Math.max(remaining, 0)), col: colors.green },
    { label: 'Transactions', value: expenseCount, col: colors.purple },
  ];

  return (
    <Card className="mb-4" style={{ borderLeft: `4px solid ${colors.accent}` }}>
      <div className="font-bold text-base mb-3.5">Month Summary</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaries.map((s) => (
          <div 
            key={s.label} 
            className="text-center p-3.5 rounded-xl"
            style={{ background: colors.bg }}
          >
            <div className="text-xl font-extrabold" style={{ color: s.col }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: colors.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ReportSummary;