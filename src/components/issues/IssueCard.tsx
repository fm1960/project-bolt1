import React, { useState } from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { Issue } from '../../types';
import { formatDate } from '../../utils/formatters';

interface IssueCardProps {
  issue: Issue;
  onClick: (issue: Issue) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      className={`card overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(issue)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {issue.ticketNumber}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {issue.location || 'Location not specified'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`badge ${getUrgencyBadgeClass(issue.urgency)}`}>{issue.urgency}</span>
          <span className={`badge ${getStatusBadgeClass(issue.status)}`}>{issue.status}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full mb-2">
          {issue.category}
        </span>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{issue.description}</p>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatDate(issue.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{issue.comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;