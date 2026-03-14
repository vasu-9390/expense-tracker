import React from 'react';
import { useAlert } from '../../context/AlertContext';
import { useTheme } from '../../context/ThemeContext';

const Alert = () => {
  const { alerts, removeAlert } = useAlert();
  const { colors } = useTheme();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className="text-white px-4 py-3 rounded-xl shadow-lg max-w-xs text-sm animate-slide-in cursor-pointer"
          style={{ background: alert.type === 'success' ? colors.green : colors.red }}
          onClick={() => removeAlert(alert.id)}
        >
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

export default Alert;