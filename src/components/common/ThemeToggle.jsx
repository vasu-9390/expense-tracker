import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAlert } from '../../context/AlertContext';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { alerts } = useAlert();

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      className="fixed top-4 z-50"
      style={{ 
        right: alerts.length ? '340px' : '14px',
        padding: '7px 13px',
        fontSize: 13
      }}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </Button>
  );
};

export default ThemeToggle;