import React, { useState, useEffect } from 'react';
import type { Employee, EmployeeFormData } from './types/Employee';
import { mockEmployees } from '@/data/mockData';
import { Header } from './components/Layout/Header';
import { Directory } from './components/Directory/Directory';
import { Admin } from './components/Admin/Admin';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from './pages/loginPage';

function App() {
  const [currentView, setCurrentView] = useState<'directory' | 'admin'>('directory');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const { isAuthenticated, loading } = useAuth();

  // Handle URL routing
  useEffect(() => {
    const updateViewFromPath = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('directory');
      }
    };

    // Initial load
    updateViewFromPath();

    // Handle browser back/forward
    const handlePopState = () => {
      updateViewFromPath();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: generateId(),
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (id: string, employeeData: EmployeeFormData) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...employeeData, id } : emp))
    );
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleViewChange = (view: 'directory' | 'admin') => {
    setCurrentView(view);
    // Update URL without page reload
    if (view === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bua-red"></div>
      </div>
    );
  }

  // Show login page if trying to access admin without authentication
  if (currentView === 'admin' && !isAuthenticated) {
    return (
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );
  }

  // Show main app
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header currentView={currentView} onViewChange={handleViewChange} />
        
        {currentView === 'directory' ? (
          <Directory employees={employees} />
        ) : (
          <Admin
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;