import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useExpenses } from '../../context/ExpenseContext';
import { CATEGORIES } from '../../utils/constants';
import { calculateCategoryTotals, calculateInsights } from '../../utils/helpers';
import StatsCards from './StatsCards';
import BudgetProgress from './BudgetProgress';
import CategoryCharts from './CategoryCharts';
import CategoryBudgetList from './CategoryBudgetList';
import Insights from './Insights';

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, salary } = useExpenses();
  
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const catTotals = calculateCategoryTotals(expenses, CATEGORIES);
  const insights = calculateInsights(expenses, salary, catTotals);

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-1">Hello, {user?.name.split(' ')[0]}! 👋</h2>
      <p className="text-sm mb-6" style={{ color: 'inherit', opacity: 0.7 }}>
        Your financial overview for March 2025
      </p>

      <StatsCards salary={salary} expenses={expenses} />
      <BudgetProgress salary={salary} totalExpenses={totalExpenses} />
      <CategoryCharts catTotals={catTotals} />
      <CategoryBudgetList catTotals={catTotals} />
      <Insights insights={insights} />
    </div>
  );
};

export default Dashboard;