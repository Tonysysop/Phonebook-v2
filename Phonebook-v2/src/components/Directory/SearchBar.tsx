import React from 'react';
import { Search, Filter, Grid, List, ArrowUpDown } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  departments: string[];
  selectedFloor: string;
  onFloorChange: (floor: string) => void;
  floors: string[];
  viewMode: 'card' | 'list';
  onViewModeChange: (mode: 'card' | 'list') => void;
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
  viewMode,
  onViewModeChange,
  // sortOrder,
  // onSortOrderChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-colors duration-200">
      <div className="flex flex-col lg:flex-row gap-4">
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
        <div className="flex gap-4">
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
          {/* <div className="relative">
            <ArrowUpDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value as 'default' | 'floor-asc' | 'floor-desc')}
              className="pl-12 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-bua-red focus:border-bua-red outline-none text-sm font-medium bg-gray-50/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[180px] transition-all duration-200"
            >
              <option value="default">Default Sort</option>
              <option value="floor-asc">Floor (Ascending)</option>
              <option value="floor-desc">Floor (Descending)</option>
            </select>
          </div> */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 shadow-inner transition-colors duration-200">
            <button
              onClick={() => onViewModeChange('card')}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'card'
                  ? 'bg-bua-red text-white shadow-md scale-105 dark:bg-bua-red'
                  : 'text-gray-600 dark:text-gray-400 hover:text-bua-red dark:hover:text-bua-red hover:bg-white/80 dark:hover:bg-gray-600/80'
              }`}
              title="Card view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-bua-red text-white shadow-md scale-105 dark:bg-bua-red'
                  : 'text-gray-600 dark:text-gray-400 hover:text-bua-red dark:hover:text-bua-red hover:bg-white/80 dark:hover:bg-gray-600/80'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};