import React, { useState } from 'react';
import { Building, AlertTriangle, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For demo purposes, use any password
      const success = await login(email, 'password');
      
      if (!success) {
        setError('Invalid email or password. Try "manager@example.com" or "occupant@example.com"');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          BuildingCare
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Commercial Building Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For demo: manager@example.com or occupant@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Use any password for demo"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn btn-primary flex justify-center py-2 px-4"
                disabled={isSubmitting || isLoading}
              >
                <LogIn className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              <p>For demo purposes:</p>
              <p className="mt-1">Manager login: <strong>manager@example.com</strong></p>
              <p>Occupant login: <strong>occupant@example.com</strong></p>
              <p className="mt-1">(Use any password)</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;