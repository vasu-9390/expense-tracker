import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import Input from '../common/Input';

const Signup = () => {
  const { authForm, setAuthForm, authError, handleSignup } = useAuth();
  const { colors } = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Full Name"
        placeholder="Arjun Mehta"
        value={authForm.name}
        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
        className="mb-4"
      />
      
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
        className="mb-4"
      />
      
      <Input
        label="Monthly Salary (₹)"
        type="number"
        placeholder="50000"
        value={authForm.salary}
        onChange={(e) => setAuthForm({ ...authForm, salary: e.target.value })}
        className="mb-6"
      />

      {authError && (
        <p className="text-sm mb-4 text-center" style={{ color: colors.red }}>
          {authError}
        </p>
      )}

      <Button type="submit" fullWidth className="py-3 text-base">
        Create Account →
      </Button>
    </form>
  );
};

export default Signup;