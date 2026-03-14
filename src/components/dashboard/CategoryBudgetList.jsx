import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const CategoryBudgetList = ({ catTotals }) => {
  const { colors } = useTheme();

  return (
    <Card className="mb-5">
      <div className="font-bold text-sm mb-4">Category vs Budget</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {catTotals.map((cat) => {
          const pct = Math.min(cat.total / cat.budget * 100, 100);
          const over = cat.total > cat.budget;
          
          return (
            <div 
              key={cat.name} 
              className="p-3.5 rounded-xl"
              style={{ 
                background: colors.bg,
                border: over ? `1px solid ${colors.red}44` : '1px solid transparent'
              }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-xs">
                  {cat.icon} {cat.name}
                </span>
                <span className="text-xs font-bold" style={{ color: over ? colors.red : colors.green }}>
                  {formatCurrency(cat.total)}
                </span>
              </div>
              
              <div className="h-1 rounded" style={{ background: colors.card }}>
                <div 
                  className="h-full rounded transition-all duration-400"
                  style={{ 
                    width: `${pct}%`,
                    background: over ? colors.red : cat.color
                  }}
                />
              </div>
              
              <div className="text-[10px] mt-1.5" style={{ color: colors.muted }}>
                Budget: {formatCurrency(cat.budget)} • {Math.round(cat.total / cat.budget * 100)}%
              </div>
              
              {over && (
                <div className="text-[10px] mt-1" style={{ color: colors.red }}>
                  ⚠️ Over by {formatCurrency(cat.total - cat.budget)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CategoryBudgetList;