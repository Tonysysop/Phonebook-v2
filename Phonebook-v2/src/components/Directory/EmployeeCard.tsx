import React from 'react';
import type { Employee } from '@/types/Employee';
import { Mail, Phone, MapPin, User, Building } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-bua-red/20 dark:hover:border-bua-red/30 transition-all duration-200 group">
      <div className="flex items-start space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-bua-red to-bua-dark-red rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
          {employee.avatar ? (
            <img src={employee.avatar} alt="" className="w-14 h-14 rounded-xl object-cover" />
          ) : (
            <span className="text-lg">{getInitials(employee.firstName, employee.lastName)}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-bua-red dark:group-hover:text-bua-red transition-colors">
            {employee.firstName} {employee.lastName}
          </h3>
          
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">{employee.role}</p>
          
          {/* Prominent Extension Display */}
          <div className="bg-gradient-to-r from-bua-gold/10 to-bua-gold/5 dark:from-bua-gold/20 dark:to-bua-gold/10 border border-bua-gold/30 dark:border-bua-gold/40 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-bua-gold rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-bua-dark-red" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Extension</p>
                <p className="text-lg font-bold text-bua-dark-red">{employee.extension}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-bua-red dark:hover:text-bua-red transition-colors">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${employee.email}`} className="hover:text-bua-red dark:hover:text-bua-red transition-colors font-medium">
                {employee.email}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <Building className="w-4 h-4" />
              <span className="font-medium">{employee.department}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{employee.floor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};