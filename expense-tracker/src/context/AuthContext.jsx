import React, { createContext, useState, useContext } from 'react';
import { DEMO_USERS } from '../utils/constants';
import { useAlert } from './AlertContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(DEMO_USERS);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', salary: '' });
  const [authError, setAuthError] = useState('');
  const { showAlert } = useAlert();

  const handleLogin = () => {
    const found = users.find((u) => u.email === authForm.email && u.password === authForm.password);
    if (!found) {
      setAuthError('Invalid email or password');
      return false;
    }
    setUser(found);
    setAuthError('');
    showAlert(`Welcome back, ${found.name}!`, 'success');
    return true;
  };

  const handleSignup = () => {
    if (!authForm.name || !authForm.email || !authForm.password || !authForm.salary) {
      setAuthError('All fields are required');
      return false;
    }
    if (users.find((u) => u.email === authForm.email)) {
      setAuthError('Email already registered');
      return false;
    }
    const newUser = {
      id: Date.now(),
      name: authForm.name,
      email: authForm.email,
      password: authForm.password,
      salary: Number(authForm.salary),
      avatar: authForm.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setAuthError('');
    showAlert('Account created successfully!', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showAlert('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      authView,
      authForm,
      authError,
      setAuthView,
      setAuthForm,
      setAuthError,
      handleLogin,
      handleSignup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};