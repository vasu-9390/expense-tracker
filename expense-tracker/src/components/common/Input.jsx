import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Input = ({ label, error, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  
  const inputStyle = {
    background: colors.bg,
    border: `1px solid ${error ? colors.red : colors.border}`,
    borderRadius: 10,
    padding: '10px 14px',
    color: colors.text,
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    ...style
  };

  const labelStyle = {
    fontSize: 11,
    color: colors.muted,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 7
  };

  return (
    <div className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <input style={inputStyle} {...props} />
      {error && <p style={{ color: colors.red, fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  );
};

export default Input;