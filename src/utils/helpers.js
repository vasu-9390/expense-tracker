export const formatCurrency = (n) => "₹" + Number(n).toLocaleString("en-IN");

export const todayStr = () => new Date().toISOString().split("T")[0];

export const calculateCategoryTotals = (expenses, categories) => {
  return categories.map((cat) => ({
    ...cat,
    total: expenses.filter((e) => e.category === cat.name).reduce((s, e) => s + e.amount, 0)
  }));
};

export const calculateInsights = (expenses, salary, catTotals) => {
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = salary - totalExpenses;
  const savingsRate = salary > 0 ? Math.round((remaining / salary) * 100) : 0;
  
  const msgs = [];
  const rentPct = Math.round((catTotals.find(x => x.name === "Rent")?.total || 0) / salary * 100);
  const foodPct = Math.round((catTotals.find(x => x.name === "Food")?.total || 0) / salary * 100);
  
  if (rentPct > 30) msgs.push(`🏠 Rent is ${rentPct}% of income — ideally keep it under 30%.`);
  if (foodPct > 15) msgs.push(`🍛 Food at ${foodPct}% of income. Review dining-out habits.`);
  if (savingsRate >= 20) msgs.push(`✅ Excellent! Saving ${savingsRate}% of income this month.`);
  if (remaining < 0) msgs.push(`❌ Overspent by ${formatCurrency(Math.abs(remaining))}! Reduce discretionary spending.`);
  
  const topCat = [...catTotals].sort((a, b) => b.total - a.total)[0];
  if (topCat?.total > 0) msgs.push(`📊 Biggest spend: ${topCat.name} at ${formatCurrency(topCat.total)}.`);
  
  return msgs.length ? msgs : ["📋 Add expenses to unlock personalized insights!"];
};

export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);