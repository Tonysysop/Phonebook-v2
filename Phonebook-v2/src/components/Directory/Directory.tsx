import React, { useState, useMemo } from 'react';
import type { Employee } from '@/types/Employee';
import { SearchBar } from './SearchBar';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeList } from './EmployeeList';

interface DirectoryProps {
  employees: Employee[];
}

export const Directory: React.FC<DirectoryProps> = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  // const [sortOrder, setSortOrder] = useState<'default' | 'floor-asc' | 'floor-desc'>('default');

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department))).sort();
  }, [employees]);

  const floors = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.floor))).sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const filtered = employees.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        `${employee.name} `.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.floor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = selectedDepartment === '' || employee.department === selectedDepartment;

      const matchesFloor = selectedFloor === '' || employee.floor === selectedFloor;

      return matchesSearch && matchesDepartment && matchesFloor;
    });

    // if (sortOrder === 'floor-asc') {
    //   return filtered.sort((a, b) => parseInt(a.floor) - parseInt(b.floor));
    // } else if (sortOrder === 'floor-desc') {
    //   return filtered.sort((a, b) => parseInt(b.floor) - parseInt(a.floor));
    // }

    return filtered;
  }, [employees, searchTerm, selectedDepartment, selectedFloor]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Head Office Phone Directory</h2>
        <p className="text-gray-600 dark:text-gray-400">Find and connect with your colleagues</p>
      </div>

      <div className="mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          departments={departments}
          selectedFloor={selectedFloor}
          onFloorChange={setSelectedFloor}
          floors={floors}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          // sortOrder={sortOrder}
          // onSortOrderChange={setSortOrder}
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>

      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M34 34l8-8m0 0l-8-8m8 8H14m28-4v8a2 2 0 01-2 2H8a2 2 0 01-2-2V14a2 2 0 012-2h32a2 2 0 012 2v4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};