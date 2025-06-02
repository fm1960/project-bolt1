import React from 'react';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <FileQuestion className="h-16 w-16 text-blue-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn btn-primary flex items-center">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;