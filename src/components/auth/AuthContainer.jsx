import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Login from './Login';
import Signup from './Signup';
import Card from '../common/Card';
import ThemeToggle from '../common/ThemeToggle';

const AuthContainer = () => {
  const { authView, setAuthView } = useAuth();
  const { colors } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ background: colors.bg, color: colors.text }}
    >
      <Card className="w-full max-w-md p-10 mx-4">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">💰</div>
          <h1 className="text-3xl font-extrabold m-0">FinTrack</h1>
          <p className="text-sm mt-1.5" style={{ color: colors.muted }}>
            Smart Expense Management
          </p>
        </div>

        <div className="flex gap-1.5 mb-7 p-1 rounded-xl" style={{ background: colors.bg }}>
          {['login', 'signup'].map((view) => (
            <button
              key={view}
              onClick={() => setAuthView(view)}
              className="flex-1 py-2 px-0 text-sm font-semibold rounded-lg transition-all"
              style={{
                background: authView === view ? colors.accent : 'transparent',
                color: authView === view ? '#fff' : colors.muted,
              }}
            >
              {view === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {authView === 'login' ? <Login /> : <Signup />}
      </Card>
      <ThemeToggle />
    </div>
  );
};

export default AuthContainer;