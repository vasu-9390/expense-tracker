import React from 'react';
import Card from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

const Insights = ({ insights }) => {
  const { colors } = useTheme();

  return (
    <Card>
      <div className="font-bold text-sm mb-3">💡 Smart Insights</div>
      <div className="flex flex-col gap-2">
        {insights.map((msg, i) => (
          <div 
            key={i} 
            className="p-2.5 text-sm rounded-lg"
            style={{ 
              background: colors.bg,
              borderLeft: `3px solid ${colors.accent}`
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Insights;