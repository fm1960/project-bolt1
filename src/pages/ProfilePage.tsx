import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Building, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              </div>
            )}
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Building className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Building ID</p>
                <p className="text-sm text-gray-900 dark:text-white">{user.buildingId}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                <p className="text-sm text-gray-900 dark:text-white">April 2023</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary w-full">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;