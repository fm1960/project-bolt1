import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Settings,
  User,
  Bell,
  Building,
  BarChart2,
  Users,
  MessageSquare
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      roles: ['manager', 'occupant']
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <BarChart2 className="h-5 w-5" />,
      roles: ['manager']
    },
    {
      name: 'Building Info',
      path: '/building',
      icon: <Building className="h-5 w-5" />,
      roles: ['manager']
    },
    {
      name: 'Occupants',
      path: '/occupants',
      icon: <Users className="h-5 w-5" />,
      roles: ['manager']
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ['manager', 'occupant']
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className="h-5 w-5" />,
      roles: ['manager', 'occupant']
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
      roles: ['manager', 'occupant']
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['manager', 'occupant']
    }
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <Building className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                BuildingCare
              </span>
            </div>
            
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems
                .filter(item => item.roles.includes(user?.role || ''))
                .map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      isActive(item.path)
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
            </nav>
          </div>
          
          {user && (
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {user.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;