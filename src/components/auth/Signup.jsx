import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Signup = () => {
  const { authForm, setAuthForm, authError, handleSignup } = useAuth();
  const { colors } = useTheme();

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    console.log("Changing field:", fieldName, "to:", fieldValue);
    
    setAuthForm({
      ...authForm,
      [fieldName]: fieldValue
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", authForm);
    handleSignup();
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: colors?.text || '#000' }}>
          FULL NAME
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={authForm.name || ''}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: colors?.inputBg || '#fff',
            color: colors?.text || '#000',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: colors?.text || '#000' }}>
          EMAIL
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={authForm.email || ''}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: colors?.inputBg || '#fff',
            color: colors?.text || '#000',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: colors?.text || '#000' }}>
          PASSWORD
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={authForm.password || ''}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: colors?.inputBg || '#fff',
            color: colors?.text || '#000',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {authError && (
        <p style={{ 
          color: colors?.red || 'red', 
          textAlign: 'center', 
          marginBottom: '10px',
          fontSize: '14px'
        }}>
          {authError}
        </p>
      )}

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Create Account →
      </button>

      <p style={{ 
        textAlign: 'center', 
        fontSize: '12px', 
        marginTop: '15px', 
        color: colors?.muted || '#666' 
      }}>
        All fields are required
      </p>
    </form>
  );
};

export default Signup;