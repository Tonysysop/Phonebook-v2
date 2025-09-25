import React, { useState, useMemo } from "react";
import type { Employee } from "@/types/Employee";
import { SearchBar } from "./SearchBar";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeeList } from "./EmployeeList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// --- Configuration Constants ---
const ITEMS_PER_PAGE_LIST = 10;
const ITEMS_PER_PAGE_CARD = 12; // More items for grid view
const MAX_VISIBLE_PAGES = 5;

interface DirectoryProps {
  employees: Employee[];
}

export const Directory: React.FC<DirectoryProps> = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("list");

  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when search/filter changes
  // Using a custom hook or useEffect is cleaner, but for a direct fix:
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setCurrentPage(1);
  };
  const handleFloorChange = (floor: string) => {
    setSelectedFloor(floor);
    setCurrentPage(1);
  };
  const handleViewModeChange = (mode: "card" | "list") => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // --- Filter and Sort Logic (Unchanged) ---
  const departments = useMemo(() => {
    return Array.from(new Set(employees.map((emp) => emp.department))).sort();
  }, [employees]);

  const floors = useMemo(() => {
    return Array.from(new Set(employees.map((emp) => emp.floor))).sort();
  }, [employees]);

  const allFilteredEmployees = useMemo(() => {
    const filtered = employees.filter((employee) => {
      const matchesSearch =
        searchTerm === "" ||
        `${employee.name} `.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.floor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "" || employee.department === selectedDepartment;
      const matchesFloor =
        selectedFloor === "" || employee.floor === selectedFloor;

      return matchesSearch && matchesDepartment && matchesFloor;
    });

    // Note: Add sorting logic here if needed
    return filtered;
  }, [employees, searchTerm, selectedDepartment, selectedFloor]);

  // 2. Pagination Calculation for the Current View
  const itemsPerPage =
    viewMode === "list" ? ITEMS_PER_PAGE_LIST : ITEMS_PER_PAGE_CARD;
  const totalItems = allFilteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allFilteredEmployees.slice(startIndex, endIndex);
  }, [allFilteredEmployees, currentPage, itemsPerPage]);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper to calculate visible page numbers (reused logic)
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Logic for showing ellipsis
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (start > 2) pages.push("ellipsis");

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (end < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages.filter(
      (value, index, self) =>
        value !== "ellipsis" || self[index - 1] !== "ellipsis"
    );
  };
  const visiblePages = getVisiblePages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Block (Unchanged) */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Head Office Phone Directory
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find and connect with your colleagues
        </p>
      </div>

      {/* SearchBar */}
      <div className="mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={handleDepartmentChange}
          departments={departments}
          selectedFloor={selectedFloor}
          onFloorChange={handleFloorChange}
          floors={floors}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          // sortOrder={sortOrder}
          // onSortOrderChange={setSortOrder}
        />
      </div>

      {/* Count Info */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedEmployees.length} of {allFilteredEmployees.length}{" "}
          employees (Page {currentPage} of {totalPages})
        </p>
      </div>

      {/* --- Render Paginated Content --- */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        // For list view, we need to pass the PAGINATED slice
        // IMPORTANT: The EmployeeList component should now ONLY render data, not handle pagination itself.
        <EmployeeList employees={paginatedEmployees} />
      )}
      {/* ---------------------------------- */}

      {/* 3. Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>

              {/* Page Number Links */}
              {visiblePages.map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(page as number);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* No employees found message */}
      {allFilteredEmployees.length === 0 && (
        <div className="text-center py-12">{/* ... SVG and text ... */}</div>
      )}
    </div>
  );
};

// import React, { useState, useMemo } from 'react';
// import type { Employee } from '@/types/Employee';
// import { SearchBar } from './SearchBar';
// import { EmployeeCard } from './EmployeeCard';
// import { EmployeeList } from './EmployeeList';

// interface DirectoryProps {
//   employees: Employee[];
// }

// export const Directory: React.FC<DirectoryProps> = ({ employees }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedFloor, setSelectedFloor] = useState('');
//   const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
//   // const [sortOrder, setSortOrder] = useState<'default' | 'floor-asc' | 'floor-desc'>('default');

//   const departments = useMemo(() => {
//     return Array.from(new Set(employees.map(emp => emp.department))).sort();
//   }, [employees]);

//   const floors = useMemo(() => {
//     return Array.from(new Set(employees.map(emp => emp.floor))).sort();
//   }, [employees]);

//   const filteredEmployees = useMemo(() => {
//     const filtered = employees.filter(employee => {
//       const matchesSearch = searchTerm === '' ||
//         `${employee.name} `.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.floor.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesDepartment = selectedDepartment === '' || employee.department === selectedDepartment;

//       const matchesFloor = selectedFloor === '' || employee.floor === selectedFloor;

//       return matchesSearch && matchesDepartment && matchesFloor;
//     });

//     // if (sortOrder === 'floor-asc') {
//     //   return filtered.sort((a, b) => parseInt(a.floor) - parseInt(b.floor));
//     // } else if (sortOrder === 'floor-desc') {
//     //   return filtered.sort((a, b) => parseInt(b.floor) - parseInt(a.floor));
//     // }

//     return filtered;
//   }, [employees, searchTerm, selectedDepartment, selectedFloor]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Head Office Phone Directory</h2>
//         <p className="text-gray-600 dark:text-gray-400">Find and connect with your colleagues</p>
//       </div>

//       <div className="mb-8">
//         <SearchBar
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           selectedDepartment={selectedDepartment}
//           onDepartmentChange={setSelectedDepartment}
//           departments={departments}
//           selectedFloor={selectedFloor}
//           onFloorChange={setSelectedFloor}
//           floors={floors}
//           viewMode={viewMode}
//           onViewModeChange={setViewMode}
//           // sortOrder={sortOrder}
//           // onSortOrderChange={setSortOrder}
//         />
//       </div>

//       <div className="mb-6">
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           Showing {filteredEmployees.length} of {employees.length} employees
//         </p>
//       </div>

//       {viewMode === 'card' ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredEmployees.map(employee => (
//             <EmployeeCard key={employee.id} employee={employee} />
//           ))}
//         </div>
//       ) : (
//         <EmployeeList employees={filteredEmployees} />
//       )}

//       {filteredEmployees.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 dark:text-gray-500 mb-4">
//             <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M34 34l8-8m0 0l-8-8m8 8H14m28-4v8a2 2 0 01-2 2H8a2 2 0 01-2-2V14a2 2 0 012-2h32a2 2 0 012 2v4" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
//           <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };
