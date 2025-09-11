import React, { useState } from 'react';
import type { Employee, EmployeeFormData } from '@/types/Employee';
import { AdminTable } from './AdminTable';
import { EmployeeForm } from './EmployeeForm';
import { DeleteConfirmation } from './DeleteConfirmation';
import { Plus, Users } from 'lucide-react';

interface AdminProps {
  employees: Employee[];
  onAddEmployee: (employee: EmployeeFormData) => void;
  onUpdateEmployee: (id: string, employee: EmployeeFormData) => void;
  onDeleteEmployee: (id: string) => void;
}

export const Admin: React.FC<AdminProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | undefined>();

  const handleAddEmployee = () => {
    setEditingEmployee(undefined);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setDeletingEmployee(employee);
    setIsDeleteOpen(true);
  };

  const handleSaveEmployee = (employeeData: EmployeeFormData) => {
    if (editingEmployee) {
      onUpdateEmployee(editingEmployee.id, employeeData);
    } else {
      onAddEmployee(employeeData);
    }
    setIsFormOpen(false);
    setEditingEmployee(undefined);
  };

  const handleConfirmDelete = () => {
    if (deletingEmployee) {
      onDeleteEmployee(deletingEmployee.id);
      setIsDeleteOpen(false);
      setDeletingEmployee(undefined);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteOpen(false);
    setDeletingEmployee(undefined);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingEmployee(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage employee records and information</p>
          </div>
          <button
            onClick={handleAddEmployee}
            className="flex items-center space-x-2 bg-gradient-to-r from-bua-red to-bua-dark-red text-white px-6 py-3 rounded-xl hover:shadow-lg focus:ring-2 focus:ring-bua-red focus:ring-offset-2 transition-all duration-200 hover:scale-105 font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors duration-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-bua-red/10 to-bua-red/20 rounded-xl flex items-center justify-center shadow-inner">
              <Users className="w-6 h-6 text-bua-red" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{employees.length}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-bua-gold/20 to-bua-gold/30 rounded-xl flex items-center justify-center shadow-inner">
              <div className="w-4 h-4 bg-bua-gold rounded-full shadow-md"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Departments</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {new Set(employees.map(emp => emp.department)).size}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
              <div className="w-6 h-6 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Floors</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {new Set(employees.map(emp => emp.floor)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdminTable
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <EmployeeForm
        employee={editingEmployee}
        onSave={handleSaveEmployee}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />

      <DeleteConfirmation
        employee={deletingEmployee}
        isOpen={isDeleteOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};