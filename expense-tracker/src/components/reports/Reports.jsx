import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORIES } from '../../utils/constants';
import { calculateCategoryTotals } from '../../utils/helpers';
import ReportSummary from './ReportSummary';
import TopCategories from './TopCategories';
import Highlights from './Highlights';

const Reports = () => {
  const { colors } = useTheme();
  const { expenses, salary } = useExpenses();
  
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = salary - totalExpenses;
  const savingsRate = salary > 0 ? Math.round((remaining / salary) * 100) : 0;
  const catTotals = calculateCategoryTotals(expenses, CATEGORIES);

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-1">📈 Monthly Report</h2>
      <p className="text-sm mb-6" style={{ color: colors.muted }}>
        Financial summary for March 2025
      </p>

      <ReportSummary 
        salary={salary}
        totalExpenses={totalExpenses}
        expenseCount={expenses.length}
      />
      
      <TopCategories 
        catTotals={catTotals}
        totalExpenses={totalExpenses}
      />
      
      <Highlights 
        catTotals={catTotals}
        remaining={remaining}
        savingsRate={savingsRate}
        expenseCount={expenses.length}
        totalExpenses={totalExpenses}
      />
    </div>
  );
};

export default Reports;
