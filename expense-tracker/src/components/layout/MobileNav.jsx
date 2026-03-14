import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS } from '../../utils/constants';

const MobileNav = ({ section, setSection }) => {
  const { colors } = useTheme();

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 flex justify-around py-1.5 z-20 md:hidden"
      style={{ 
        background: colors.card, 
        borderTop: `1px solid ${colors.border}` 
      }}
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => setSection(item.id)}
          className="flex flex-col items-center gap-0.5 py-1.5 px-2.5 text-xs transition-colors"
          style={{
            color: section === item.id ? colors.accent : colors.muted,
          }}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileNav;