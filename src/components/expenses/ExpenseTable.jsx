import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const { colors } = useTheme();

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: colors.muted }}>
        No expenses found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: colors.bg }}>
            {['Title', 'Category', 'Amount', 'Date', 'Method', 'Actions'].map((h) => (
              <th 
                key={h} 
                className="p-2.5 text-left text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.muted, borderBottom: `1px solid ${colors.border}` }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...expenses]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((exp) => {
              const cat = CATEGORIES.find((x) => x.name === exp.category);
              return (
                <tr key={exp.id} style={{ borderBottom: `1px solid ${colors.border}22` }}>
                  <td className="p-2.5 text-sm font-medium">{exp.title}</td>
                  <td className="p-2.5">
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: `${cat?.color}22`, color: cat?.color }}
                    >
                      {cat?.icon} {exp.category}
                    </span>
                  </td>
                  <td className="p-2.5 font-bold text-sm" style={{ color: colors.red }}>
                    {formatCurrency(exp.amount)}
                  </td>
                  <td className="p-2.5 text-xs" style={{ color: colors.muted }}>
                    {new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="p-2.5">
                    <span 
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ background: colors.bg }}
                    >
                      {exp.method}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <div className="flex gap-1.5">
                      <Button onClick={() => onEdit(exp)} variant="primary" className="text-xs px-2 py-1">
                        Edit
                      </Button>
                      <Button onClick={() => onDelete(exp.id)} variant="danger" className="text-xs px-2 py-1">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;