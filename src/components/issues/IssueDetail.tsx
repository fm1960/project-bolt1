import React, { useState } from 'react';
import { 
  Calendar, Clock, Edit, MessageSquare, X, Save, User, CornerDownRight, Building 
} from 'lucide-react';
import { Issue, Comment, IssueStatus } from '../../types';
import { formatDate, formatTimeFromNow } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { addComment, updateIssue } from '../../data/mockData';

interface IssueDetailProps {
  issue: Issue;
  onClose: () => void;
  onUpdate: (updatedIssue: Issue) => void;
}

const IssueDetail: React.FC<IssueDetailProps> = ({ issue, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<IssueStatus>(issue.status);
  const [comment, setComment] = useState('');
  const [newComments, setNewComments] = useState<Comment[]>([]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as IssueStatus);
  };

  const handleSave = () => {
    if (isEditing && user) {
      const updatedIssue = updateIssue({
        ...issue,
        status,
      });
      onUpdate(updatedIssue);
      setIsEditing(false);
    }
  };

  const handleAddComment = () => {
    if (comment.trim() && user) {
      const newComment = addComment(issue.id, user.id, comment.trim());
      if (newComment) {
        setNewComments([...newComments, newComment]);
        setComment('');
        
        // Get the updated issue with the new comment
        const updatedIssue = {
          ...issue,
          comments: [...issue.comments, newComment]
        };
        onUpdate(updatedIssue);
      }
    }
  };

  const getUrgencyBadgeClass = (urgency: string) => {
    switch (urgency) {
      case 'Low':
        return 'badge-low';
      case 'Medium':
        return 'badge-medium';
      case 'High':
        return 'badge-high';
      case 'Emergency':
        return 'badge-emergency';
      default:
        return 'badge-low';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Open':
        return 'badge-open';
      case 'In Progress':
        return 'badge-in-progress';
      case 'Resolved':
        return 'badge-resolved';
      default:
        return 'badge-open';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">{issue.ticketNumber}</span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <Building className="h-4 w-4 mr-1" />
                {issue.location || 'Location not specified'}
              </p>
            </div>
            <div className="flex space-x-2">
              {user?.role === 'manager' && !isEditing && (
                <button 
                  className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
              {isEditing && (
                <button 
                  className="p-2 text-gray-500 hover:text-green-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleSave}
                >
                  <Save className="h-5 w-5" />
                </button>
              )}
              <button 
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`badge ${getUrgencyBadgeClass(issue.urgency)}`}>
              {issue.urgency}
            </span>
            {isEditing ? (
              <select
                value={status}
                onChange={handleStatusChange}
                className="select text-sm py-1"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            ) : (
              <span className={`badge ${getStatusBadgeClass(issue.status)}`}>
                {issue.status}
              </span>
            )}
            <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {issue.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">{issue.description}</p>
          </div>
          
          <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created: {formatDate(issue.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last Updated: {formatDate(issue.updatedAt)}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>Reported by: {issue.createdBy}</span>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Comments ({issue.comments.length})
            </h3>
            
            <div className="space-y-4 mb-6">
              {issue.comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 italic">No comments yet.</p>
              ) : (
                issue.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-gray-800 dark:text-white flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {comment.userName}
                        <span className="ml-2 text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300">
                          {comment.userRole}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeFromNow(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 ml-5">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
            
            {/* Add Comment */}
            {user && (
              <div className="mt-4">
                <div className="flex items-start space-x-2">
                  <div className="flex-grow">
                    <textarea
                      className="input min-h-[80px]"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="btn btn-primary flex items-center mt-2"
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                  >
                    <CornerDownRight className="h-4 w-4 mr-1" />
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;