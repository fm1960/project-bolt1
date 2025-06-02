import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/issues/IssueCard';
import IssueDetail from '../components/issues/IssueDetail';
import IssueForm from '../components/issues/IssueForm';
import { Issue, IssueStatus } from '../types';
import { getIssuesByBuilding, getIssuesByUser } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'All'>('All');
  
  // Load issues based on user role
  useEffect(() => {
    if (user) {
      const loadedIssues = user.role === 'manager'
        ? getIssuesByBuilding(user.buildingId)
        : getIssuesByUser(user.id);
      
      setIssues(loadedIssues);
      setFilteredIssues(loadedIssues);
    }
  }, [user]);
  
  // Apply filters
  useEffect(() => {
    if (!issues.length) return;
    
    let filtered = [...issues];
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.ticketNumber.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term) ||
        issue.category.toLowerCase().includes(term) ||
        (issue.location && issue.location.toLowerCase().includes(term))
      );
    }
    
    setFilteredIssues(filtered);
  }, [issues, statusFilter, searchTerm]);
  
  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };
  
  const handleIssueClose = () => {
    setSelectedIssue(null);
  };
  
  const handleIssueUpdate = (updatedIssue: Issue) => {
    const updatedIssues = issues.map(issue => 
      issue.id === updatedIssue.id ? updatedIssue : issue
    );
    setIssues(updatedIssues);
    setSelectedIssue(updatedIssue);
  };
  
  const handleIssueFormSubmit = () => {
    // Refresh issues after submission
    if (user) {
      const loadedIssues = user.role === 'manager'
        ? getIssuesByBuilding(user.buildingId)
        : getIssuesByUser(user.id);
      
      setIssues(loadedIssues);
      setFilteredIssues(loadedIssues);
    }
    
    setShowIssueForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'manager' ? 'Building Issues Dashboard' : 'My Issues'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {user?.role === 'manager' 
              ? 'Manage and track all building maintenance issues' 
              : 'Track and manage your submitted maintenance issues'}
          </p>
        </div>
        
        {user?.role === 'occupant' && (
          <button
            className="btn btn-primary mt-4 md:mt-0 flex items-center"
            onClick={() => setShowIssueForm(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Report an Issue
          </button>
        )}
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by ticket number, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="select pl-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as IssueStatus | 'All')}
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No issues found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            {searchTerm || statusFilter !== 'All'
              ? 'Try adjusting your search or filter criteria'
              : user?.role === 'occupant'
                ? 'You have not reported any maintenance issues yet'
                : 'There are no maintenance issues reported for this building'}
          </p>
          {user?.role === 'occupant' && (
            <button
              className="btn btn-primary mt-4 flex items-center"
              onClick={() => setShowIssueForm(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Report an Issue
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onClick={handleIssueClick}
            />
          ))}
        </div>
      )}
      
      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetail
          issue={selectedIssue}
          onClose={handleIssueClose}
          onUpdate={handleIssueUpdate}
        />
      )}
      
      {/* Issue Form Modal */}
      {showIssueForm && (
        <IssueForm
          onClose={() => setShowIssueForm(false)}
          onSubmit={handleIssueFormSubmit}
        />
      )}
    </div>
  );
};

export default DashboardPage;