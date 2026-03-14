import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const TopCategories = ({ catTotals, totalExpenses }) => {
  const { colors } = useTheme();
  const topCategories = [...catTotals]
    .sort((a, b) => b.total - a.total)
    .filter(x => x.total > 0)
    .slice(0, 5);

  return (
    <Card className="mb-4">
      <div className="font-bold text-sm mb-4">🏆 Top Spending Categories</div>
      {topCategories.map((cat) => (
        <div key={cat.name} className="flex items-center gap-3 mb-3.5">
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: `${cat.color}22` }}
          >
            {cat.icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold">{cat.name}</span>
              <span className="text-sm font-bold" style={{ color: cat.color }}>
                {formatCurrency(cat.total)}
              </span>
            </div>
            <div className="h-1 rounded" style={{ background: colors.bg }}>
              <div 
                className="h-full rounded transition-all duration-500"
                style={{ 
                  width: `${(cat.total / totalExpenses * 100)}%`,
                  background: cat.color
                }}
              />
            </div>
            <div className="text-[10px] mt-1" style={{ color: colors.muted }}>
              {Math.round(cat.total / totalExpenses * 100)}% of total expenses
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default TopCategories;