import React, { useState, useEffect } from 'react';
import type { Employee, EmployeeFormData } from './types/Employee';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from './lib/firebase';
import { Header } from './components/Layout/Header';
import { Directory } from './components/Directory/Directory';
import { AdminRoute } from './components/Admin/AdminRoute';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  const [currentView, setCurrentView] = useState<'directory' | 'admin'>('directory');
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading: isFetching } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: getEmployees,
    enabled: true, // Always fetch employees
  });

  const addEmployeeMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: (variables: { id: string; employeeData: EmployeeFormData }) => 
      updateEmployee(variables.id, variables.employeeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

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

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
    addEmployeeMutation.mutate(employeeData);
  };

  const handleUpdateEmployee = (id: string, employeeData: EmployeeFormData) => {
    updateEmployeeMutation.mutate({ id, employeeData });
  };

  const handleDeleteEmployee = (id: string) => {
    deleteEmployeeMutation.mutate(id);
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

  // Show main app
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header currentView={currentView} onViewChange={handleViewChange} />
        
        {isFetching ? (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bua-red"></div>
          </div>
        ) : (
          <>
            {currentView === 'directory' ? (
              <Directory employees={employees} />
            ) : (
              <AdminRoute
                employees={employees}
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;