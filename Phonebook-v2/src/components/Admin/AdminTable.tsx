import React, { useState, useMemo } from "react";
import type { Employee } from "@/types/Employee";
import { Edit, Trash2, Phone } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define a default number of items per page
const ITEMS_PER_PAGE = 10;
// Define how many page numbers to show (excluding previous, next, and ellipsis)
const MAX_VISIBLE_PAGES = 5;

interface AdminTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 2. Data Calculation (Memoized for performance)
  const currentEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return employees.slice(startIndex, endIndex);
  }, [employees, currentPage]);

  // Handler for page change
  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper to get initials (kept from original)
  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Helper to calculate visible page numbers
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxPages = MAX_VISIBLE_PAGES;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const startPage = Math.max(2, currentPage - Math.floor(maxPages / 2) + 1);
    const endPage = Math.min(
      totalPages - 1,
      currentPage + Math.floor(maxPages / 2) - 1
    );

    pages.push(1);

    if (startPage > 2) {
      pages.push("ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Simple deduplication for adjacent ellipses, though the logic above avoids this
    return pages.filter(
      (value, index, self) =>
        value !== "ellipsis" || self[index - 1] !== "ellipsis"
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
            {/* Table Header (omitted for brevity) */}
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Extension
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Floor
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/* 3. Display only the current page's employees */}
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gradient-to-r hover:from-bua-red/5 hover:to-transparent dark:hover:from-bua-red/10 dark:hover:to-transparent transition-all duration-200"
                >
                  {/* ... Table Cell Content (omitted for brevity) ... */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-bua-red to-bua-dark-red rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-md">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          getInitials(employee.name)
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {employee.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {employee.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-bua-gold rounded-md flex items-center justify-center">
                        <Phone className="w-3 h-3 text-bua-dark-red" />
                      </div>
                      <span className="text-lg font-bold text-bua-dark-red">
                        {employee.extension}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {employee.floor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(employee)}
                        className="text-bua-red hover:text-bua-dark-red p-2 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-110"
                        title="Edit employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(employee)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-110"
                        title="Delete employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Optional: Display a message if no data is available
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Component */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
    </div>
  );
};

// import React, { useMemo, useState } from 'react';
// import type { Employee } from '@/types/Employee';
// import { Edit, Trash2, Phone } from 'lucide-react';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const ITEMS_PER_PAGE = 10

// const MAX_VISIBLE_PAGES = 5

// interface AdminTableProps {
//   employees: Employee[];
//   onEdit: (employee: Employee) => void;
//   onDelete: (employee: Employee) => void;
// }

// export const AdminTable: React.FC<AdminTableProps> = ({
//   employees,
//   onEdit,
//   onDelete,
// }) => {
//   // 1. Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalItems = employees.length;
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   // 2. Data Calculation (Memoized for performance)
//   const currentEmployees = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     return employees.slice(startIndex, endIndex);
//   }, [employees, currentPage]);

//   // Handler for page change
//   const onPageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Helper to get initials (kept from original)
//   const getInitials = (fullName: string) => {
//     if (!fullName) return "?";
//     const parts = fullName.trim().split(" ");
//     if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
//     return (
//       parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
//     ).toUpperCase();
//   };

//   // Helper to calculate visible page numbers
//   const getVisiblePages = () => {
//     const pages: (number | "ellipsis")[] = [];
//     const maxPages = MAX_VISIBLE_PAGES;

//     if (totalPages <= maxPages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//       return pages;
//     }

//     const startPage = Math.max(2, currentPage - Math.floor(maxPages / 2) + 1);
//     const endPage = Math.min(
//       totalPages - 1,
//       currentPage + Math.floor(maxPages / 2) - 1
//     );

//     pages.push(1);

//     if (startPage > 2) {
//       pages.push("ellipsis");
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       if (i > 1 && i < totalPages) {
//         pages.push(i);
//       }
//     }

//     if (endPage < totalPages - 1) {
//       pages.push("ellipsis");
//     }

//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }

//     // Simple deduplication for adjacent ellipses, though the logic above avoids this
//     return pages.filter(
//       (value, index, self) =>
//         value !== "ellipsis" || self[index - 1] !== "ellipsis"
//     );
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                 Employee
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                 Extension
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                 Contact
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                 Department
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                 Floor
//               </th>
//               <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//             {currentEmployees.length > 0 ? (
//               currentEmployees.map((employee) => (
//               <tr
//                 key={employee.id}
//                 className="hover:bg-gradient-to-r hover:from-bua-red/5 hover:to-transparent dark:hover:from-bua-red/10 dark:hover:to-transparent transition-all duration-200"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-bua-red to-bua-dark-red rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-md">
//                       {employee.avatar ? (
//                         <img
//                           src={employee.avatar}
//                           alt=""
//                           className="w-10 h-10 rounded-lg object-cover"
//                         />
//                       ) : (
//                         getInitials(employee.name)
//                       )}
//                     </div>
//                     <div>
//                       <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                         {employee.name}
//                       </div>
//                       <div className="text-xs text-gray-600 dark:text-gray-400">
//                         {employee.role}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-6 h-6 bg-bua-gold rounded-md flex items-center justify-center">
//                       <Phone className="w-3 h-3 text-bua-dark-red" />
//                     </div>
//                     <span className="text-lg font-bold text-bua-dark-red">
//                       {employee.extension}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {employee.email}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
//                   {employee.department}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
//                   {employee.floor}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <div className="flex items-center justify-end space-x-2">
//                     <button
//                       onClick={() => onEdit(employee)}
//                       className="text-bua-red hover:text-bua-dark-red p-2 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-110"
//                       title="Edit employee"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => onDelete(employee)}
//                       className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-110"
//                       title="Delete employee"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
