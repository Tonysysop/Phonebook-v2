import React, { useState, useEffect } from 'react';
import type { Employee, EmployeeFormData } from '@/types/Employee';
import { X } from 'lucide-react';

interface EmployeeFormProps {
  employee?: Employee;
  onSave: (employee: EmployeeFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSave,
  onCancel,
  isOpen,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    extension: '',
    department: '',
    role: '',
    floor: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        extension: employee.extension,
        department: employee.department,
        role: employee.role,
        floor: employee.floor,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        extension: '',
        department: '',
        role: '',
        floor: '',
      });
    }
    setErrors({});
  }, [employee, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.extension.trim()) newErrors.extension = 'Extension is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.floor.trim()) newErrors.floor = 'Floor is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                  errors.firstName ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                  errors.lastName ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                errors.email ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="extension" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Extension *
            </label>
            <input
              type="text"
              id="extension"
              name="extension"
              value={formData.extension}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                errors.extension ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.extension && <p className="text-red-600 text-xs mt-1">{errors.extension}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department *
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                  errors.department ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                  errors.role ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="floor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Floor *
            </label>
            <input
              type="text"
              id="floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-bua-red focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                errors.floor ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.floor && <p className="text-red-600 text-xs mt-1">{errors.floor}</p>}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-bua-red to-bua-dark-red text-white px-6 py-3 rounded-xl hover:shadow-lg focus:ring-2 focus:ring-bua-red focus:ring-offset-2 transition-all duration-200 hover:scale-105 font-semibold"
            >
              {employee ? 'Update Employee' : 'Add Employee'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};