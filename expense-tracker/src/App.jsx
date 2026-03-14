import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AlertProvider } from './context/AlertContext';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Alert from './components/common/Alert';
import AuthContainer from './components/auth/AuthContainer';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ExpenseForm from './components/expenses/ExpenseForm';
import ExpenseHistory from './components/expenses/ExpenseHistory';
import Reports from './components/reports/Reports';
import Settings from './components/settings/Settings';
import './index.css';

const AppContent = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [section, setSection] = React.useState('dashboard');

  if (!user) {
    return <AuthContainer />;
  }

  const renderSection = () => {
    switch(section) {
      case 'dashboard':
        return <Dashboard />;
      case 'add':
        return <ExpenseForm onSuccess={() => setSection('dashboard')} />;
      case 'history':
        return <ExpenseHistory />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: '100vh' }}>
      <Alert />
      <Layout section={section} setSection={setSection}>
        {renderSection()}
      </Layout>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AuthProvider>
          <ExpenseProvider>
            <AppContent />
          </ExpenseProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;