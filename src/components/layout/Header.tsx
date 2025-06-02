import React from 'react';
import { Building, Home, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Building className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">BuildingCare</span>
              </Link>
            </div>
          </div>

          {user && (
            <>
              {/* Desktop menu */}
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'border-blue-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
                {user.role === 'manager' && (
                  <Link
                    to="/analytics"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/analytics')
                        ? 'border-blue-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    Analytics
                  </Link>
                )}
              </nav>

              {/* User dropdown */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <div className="mr-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{user.name}</span>
                      <span className="ml-1 text-xs text-gray-500">({user.role})</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {user && mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-slide-in">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className={`${
                isActive('/dashboard')
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-gray-700 dark:text-white'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Dashboard
            </Link>
            {user.role === 'manager' && (
              <Link
                to="/analytics"
                onClick={closeMobileMenu}
                className={`${
                  isActive('/analytics')
                    ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-gray-700 dark:text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                Analytics
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{user.name}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;