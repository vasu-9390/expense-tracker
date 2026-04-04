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

  return (
    <div className={className}>
      {label && <label>{label}</label>}

      {/* 🔥 SIMPLE INPUT (no props spreading issues) */}
      <input
        type={props.type || "text"}
        name={props.name}
        value={props.value || ""}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        style={inputStyle}
      />

      {error && <p style={{ color: colors.red }}>{error}</p>}
    </div>
  );
};

export default Input;