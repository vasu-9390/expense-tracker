import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import Input from '../common/Input';

const Login = () => {
  const { authForm, setAuthForm, authError, handleLogin } = useAuth();
  const { colors } = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={authForm.email}
        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
        className="mb-4"
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="••••••"
        value={authForm.password}
        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
        className="mb-6"
      />

      {authError && (
        <p className="text-sm mb-4 text-center" style={{ color: colors.red }}>
          {authError}
        </p>
      )}

      <Button type="submit" fullWidth className="py-3 text-base">
        Sign In →
      </Button>

      <p className="text-xs text-center mt-3.5" style={{ color: colors.muted }}>
        Demo: arjun@example.com / 1234
      </p>
    </form>
  );
};

export default Login;