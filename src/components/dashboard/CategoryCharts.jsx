import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const CategoryCharts = ({ catTotals }) => {
  const { colors } = useTheme();
  const nonZeroCategories = catTotals.filter(x => x.total > 0);

  const tooltipStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    color: colors.text,
    fontSize: 13
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      <Card>
        <div className="font-bold text-sm mb-3.5">Spending by Category</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={nonZeroCategories}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={3}
              dataKey="total"
              nameKey="name"
            >
              {nonZeroCategories.map((cat) => (
                <Cell key={cat.name} fill={cat.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={tooltipStyle} />
            <Legend formatter={(v) => <span style={{ color: colors.text, fontSize: 11 }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="font-bold text-sm mb-3.5">Category Breakdown</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={nonZeroCategories} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <XAxis dataKey="icon" tick={{ fill: colors.muted, fontSize: 13 }} />
            <YAxis tick={{ fill: colors.muted, fontSize: 10 }} />
            <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={tooltipStyle} />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {nonZeroCategories.map((cat) => (
                <Cell key={cat.name} fill={cat.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default CategoryCharts;