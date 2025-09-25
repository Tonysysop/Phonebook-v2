import React from "react";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  departments: string[];
  selectedFloor: string;
  onFloorChange: (floor: string) => void;
  floors: string[];
  // viewMode, onViewModeChange, and related types are removed
  // sortOrder and onSortOrderChange are kept commented out
  // sortOrder: 'default' | 'floor-asc' | 'floor-desc';
  // onSortOrderChange: (order: 'default' | 'floor-asc' | 'floor-desc') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  selectedFloor,
  onFloorChange,
  floors,
  // viewMode and onViewModeChange are removed from destructuring
  // sortOrder,
  // onSortOrderChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-colors duration-200">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search employees by name, email, role, department, floor..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-bua-red focus:border-bua-red outline-none text-sm font-medium placeholder-gray-500 dark:placeholder-gray-400 bg-gray-50/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex gap-4">
          {/* Department Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <select
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-bua-red focus:border-bua-red outline-none text-sm font-medium bg-gray-50/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[180px] transition-all duration-200"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Floor Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <select
              value={selectedFloor}
              onChange={(e) => onFloorChange(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-bua-red focus:border-bua-red outline-none text-sm font-medium bg-gray-50/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[180px] transition-all duration-200"
            >
              <option value="">All Floors</option>
              {floors.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
          </div>

          {/* Removed View Toggle functionality (previously the div below) */}
          {/* <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 shadow-inner transition-colors duration-200">
            ... buttons for Grid and List views ...
          </div> 
          */}
        </div>
      </div>
    </div>
  );
};
