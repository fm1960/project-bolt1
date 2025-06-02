import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface LayoutProps {
  requireAuth?: boolean;
  requireRole?: 'manager' | 'occupant';
}

const Layout: React.FC<LayoutProps> = ({ requireAuth = false, requireRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user && user.role !== requireRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {user && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
        <footer className="bg-white shadow-inner dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} BuildingCare. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;