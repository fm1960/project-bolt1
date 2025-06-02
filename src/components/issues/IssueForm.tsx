import React, { useState } from 'react';
import { 
  X, Check, AlertTriangle, Clock 
} from 'lucide-react';
import { IssueCategory, UrgencyLevel } from '../../types';
import { createIssue } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

interface IssueFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onClose, onSubmit }) => {
  const { user } = useAuth();
  const [category, setCategory] = useState<IssueCategory>('Plumbing');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Medium');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Please provide a description of the issue');
      return;
    }
    
    if (!user) {
      setError('You must be logged in to submit an issue');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      createIssue({
        category,
        urgency,
        description,
        status: 'Open',
        createdBy: user.id,
        buildingId: user.buildingId,
        location,
      });
      
      setSuccess(true);
      setTimeout(() => {
        onSubmit();
      }, 1500);
    } catch (err) {
      setError('An error occurred while submitting your issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Report a New Issue</h2>
            <button 
              className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Form content */}
        {success ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Issue Submitted Successfully!</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Your issue has been submitted. You can track its status in your dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueCategory)}
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="HVAC">HVAC</option>
                <option value="Structural">Structural</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Urgency Level
              </label>
              <select
                id="urgency"
                className="select"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="input"
                placeholder="e.g., Floor 3, Room 302"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="input min-h-[150px]"
                placeholder="Please describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Issue'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default IssueForm;