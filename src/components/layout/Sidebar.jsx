import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import Button from '../common/Button';

const Sidebar = ({ section, setSection }) => {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <div 
      className="w-60 h-screen fixed top-0 left-0 flex flex-col p-6 overflow-y-auto hidden md:flex"
      style={{ 
        background: colors.card, 
        borderRight: `1px solid ${colors.border}` 
      }}
    >
      <div className="pl-2.5 mb-8">
        <div className="text-xl font-extrabold">💰 FinTrack</div>
        <div className="text-xs mt-1" style={{ color: colors.muted }}>Smart Money Manager</div>
      </div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => setSection(item.id)}
          className="w-full text-left py-2.5 px-3.5 mb-1 flex items-center gap-2.5 rounded-lg transition-all nav-btn"
          style={{
            background: section === item.id ? colors.accent : 'transparent',
            color: section === item.id ? '#fff' : colors.text,
          }}
        >
          <span>{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </button>
      ))}

      <div className="mt-auto pt-4 border-t" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-2.5 pb-3.5">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: colors.accent }}
          >
            {user?.avatar}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{user?.name}</div>
            <div className="text-xs" style={{ color: colors.muted }}>
              {formatCurrency(user?.salary || 0)}/mo
            </div>
          </div>
        </div>
        <Button 
          onClick={logout}
          variant="danger"
          fullWidth
          className="text-xs py-2"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;