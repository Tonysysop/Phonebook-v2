import React from 'react';
import { Settings, Search, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hook/useAuth';

interface HeaderProps {
  currentView: 'directory' | 'admin';
  onViewChange: (view: 'directory' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-bua-red dark:bg-gray-800 border-b border-bua-dark-red dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/bua-logo.jpg" alt="BUA Group" className="w-12 h-12  shadow-md" />
              <h1 className="text-xl font-bold text-white dark:text-gray-100">BUA GROUP</h1>
            </div>
            
            <nav className="flex space-x-4">
              {!isAuthenticated && (
                <button
                  onClick={() => onViewChange('directory')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'directory'
                      ? 'bg-bua-gold text-bua-dark-red font-bold shadow-md dark:bg-bua-gold dark:text-bua-dark-red'
                      : 'text-white dark:text-gray-200 hover:text-bua-gold dark:hover:text-bua-gold hover:bg-bua-dark-red/80 dark:hover:bg-gray-700'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Directory</span>
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => onViewChange('admin')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'admin'
                      ? 'bg-bua-gold text-bua-dark-red font-bold shadow-md dark:bg-bua-gold dark:text-bua-dark-red'
                      : 'text-white dark:text-gray-200 hover:text-bua-gold dark:hover:text-bua-gold hover:bg-bua-dark-red/80 dark:hover:bg-gray-700'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white dark:text-gray-200 hover:text-bua-gold dark:hover:text-bua-gold hover:bg-bua-dark-red/80 dark:hover:bg-gray-700 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-white dark:text-gray-200 hover:text-red-300 dark:hover:text-red-300 hover:bg-bua-dark-red/80 dark:hover:bg-gray-700 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};