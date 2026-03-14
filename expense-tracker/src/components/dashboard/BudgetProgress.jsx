import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const BudgetProgress = ({ salary, totalExpenses }) => {
  const { colors } = useTheme();
  const percentage = Math.min(Math.round(totalExpenses / salary * 100), 100);
  
  const getProgressColor = () => {
    if (totalExpenses > salary * 0.85) return colors.red;
    if (totalExpenses > salary * 0.6) return colors.yellow;
    return colors.green;
  };

  return (
    <Card className="mb-5">
      <div className="flex justify-between mb-2.5">
        <span className="font-bold text-sm">Budget Usage</span>
        <span 
          className="font-bold text-sm"
          style={{ color: totalExpenses > salary ? colors.red : colors.green }}
        >
          {percentage}%
        </span>
      </div>
      
      <div className="h-2.5 rounded-lg overflow-hidden" style={{ background: colors.bg }}>
        <div 
          className="h-full rounded-lg transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            background: getProgressColor()
          }}
        />
      </div>
      
      <div className="flex justify-between mt-1.5 text-xs" style={{ color: colors.muted }}>
        <span>Spent: {formatCurrency(totalExpenses)}</span>
        <span>Budget: {formatCurrency(salary)}</span>
      </div>
    </Card>
  );
};

export default BudgetProgress;