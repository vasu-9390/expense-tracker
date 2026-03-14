import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Card = ({ children, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  
  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    padding: '20px 24px',
    ...style
  };

  return (
    <div style={cardStyle} className={className} {...props}>
      {children}
    </div>
  );
};

export default Card;