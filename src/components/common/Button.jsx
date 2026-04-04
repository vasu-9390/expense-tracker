import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Button = ({ 
  children, 
  onClick, 
  type = "button",   // 🔥 ADD THIS
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const { colors } = useTheme();
  
  const baseStyle = {
    border: 'none',
    borderRadius: 10,
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    transition: 'opacity 0.2s',
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: { background: colors.accent, color: '#fff' },
    secondary: { background: 'transparent', color: colors.text, border: `1px solid ${colors.border}` },
    danger: { background: colors.red + '22', color: colors.red },
    success: { background: colors.green + '22', color: colors.green },
    warning: { background: colors.yellow + '22', color: colors.yellow },
  };

  const style = { ...baseStyle, ...variants[variant] };

  return (
    <button 
      type={type}   // 🔥 VERY IMPORTANT
      style={style} 
      onClick={onClick}
      className={`hover:opacity-85 transition-opacity ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;