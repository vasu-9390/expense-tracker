import React, { createContext, useState, useContext } from 'react';
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
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
      password: "1234",
      avatar: "DU"
    }
  ]);
  
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [authError, setAuthError] = useState('');
  const { showAlert } = useAlert();

  const handleLogin = () => {
    setAuthError('');
    
    if (!authForm.email || !authForm.password) {
      setAuthError('Email and password are required');
      return false;
    }

    const found = users.find(function(u) {
      return u.email === authForm.email && u.password === authForm.password;
    });

    if (!found) {
      setAuthError('Invalid email or password');
      return false;
    }

    setUser(found);
    showAlert('Welcome back, ' + found.name + '!', 'success');
    setAuthForm({ name: '', email: '', password: '' });
    return true;
  };

  const handleSignup = function() {
    setAuthError('');
    
    console.log("Signup - Current authForm:", authForm);
    
    if (!authForm.name || authForm.name.trim() === '') {
      setAuthError('Full name is required');
      return false;
    }
    
    if (!authForm.email || authForm.email.trim() === '') {
      setAuthError('Email is required');
      return false;
    }
    
    if (!authForm.password || authForm.password.trim() === '') {
      setAuthError('Password is required');
      return false;
    }
    
    var emailExists = users.find(function(u) {
      return u.email === authForm.email;
    });
    
    if (emailExists) {
      setAuthError('Email already registered');
      return false;
    }
    
    var nameParts = authForm.name.split(' ');
    var avatar = '';
    
    for (var i = 0; i < nameParts.length; i++) {
      if (nameParts[i] && nameParts[i][0]) {
        avatar = avatar + nameParts[i][0];
      }
    }
    avatar = avatar.toUpperCase().slice(0, 2);
    
    var newUser = {
      id: Date.now(),
      name: authForm.name.trim(),
      email: authForm.email.trim(),
      password: authForm.password,
      avatar: avatar
    };
    
    setUsers([...users, newUser]);
    setUser(newUser);
    showAlert('Account created successfully!', 'success');
    setAuthForm({ name: '', email: '', password: '' });
    return true;
  };

  const logout = function() {
    setUser(null);
    showAlert('Logged out successfully', 'info');
    setAuthForm({ name: '', email: '', password: '' });
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user: user,
        users: users,
        authView: authView,
        authForm: authForm,
        authError: authError,
        setAuthView: setAuthView,
        setAuthForm: setAuthForm,
        setAuthError: setAuthError,
        handleLogin: handleLogin,
        handleSignup: handleSignup,
        logout: logout
      }
    },
    children
  );
};