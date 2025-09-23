import React from 'react';
import { useAuth } from '@/hook/useAuth';
import LoginPage from '@/pages/loginPage';
import { Admin } from './Admin';
import type { Employee, EmployeeFormData } from '@/types/Employee';

interface AdminRouteProps {
  employees: Employee[];
  onAddEmployee: (employeeData: EmployeeFormData) => void;
  onUpdateEmployee: (id: string, employeeData: EmployeeFormData) => void;
  onDeleteEmployee: (id: string) => void;
}

export const AdminRoute: React.FC<AdminRouteProps> = (props) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bua-red"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Admin {...props} />;
};