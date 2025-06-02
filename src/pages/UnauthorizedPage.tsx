import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Unauthorized Access</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6">
        You don't have permission to access this page. Please contact your building manager if you believe this is an error.
      </p>
      <Link to="/dashboard" className="btn btn-primary flex items-center">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;