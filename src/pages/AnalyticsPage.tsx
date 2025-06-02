import React from 'react';
import { FileClock, Users, AlertCircle, CheckCircle, Activity, BarChart3 } from 'lucide-react';
import { mockAnalytics, mockIssues } from '../data/mockData';
import AnalyticsCard from '../components/analytics/AnalyticsCard';
import ChartContainer from '../components/analytics/ChartContainer';
import { formatDuration } from '../utils/formatters';

const AnalyticsPage: React.FC = () => {
  const { 
    issuesByCategory, 
    issuesByUrgency,
    averageResolutionTime,
    totalOpenIssues,
    totalInProgressIssues,
    totalResolvedIssues,
    issuesTrend
  } = mockAnalytics;
  
  // Calculate total issues
  const totalIssues = totalOpenIssues + totalInProgressIssues + totalResolvedIssues;
  
  // Calculate percentage changes (mock data)
  const openIssuesChange = 12.5;
  const resolutionTimeChange = -8.3;
  const resolvedIssuesChange = 15.2;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track, analyze, and manage building maintenance performance
        </p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AnalyticsCard
          title="Total Issues"
          value={totalIssues}
          icon={<Activity className="h-6 w-6 text-blue-500" />}
        />
        
        <AnalyticsCard
          title="Open Issues"
          value={totalOpenIssues}
          change={openIssuesChange}
          icon={<AlertCircle className="h-6 w-6 text-amber-500" />}
        />
        
        <AnalyticsCard
          title="Average Resolution Time"
          value={formatDuration(averageResolutionTime * 24)} // Convert days to hours
          change={resolutionTimeChange}
          icon={<FileClock className="h-6 w-6 text-purple-500" />}
        />
        
        <AnalyticsCard
          title="Resolved Issues"
          value={totalResolvedIssues}
          change={resolvedIssuesChange}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer title="Issues by Category">
          <div className="h-full flex flex-col justify-center">
            {Object.entries(issuesByCategory).map(([category, count], index) => (
              <div key={category} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{count}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(issuesByCategory))) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
        
        <ChartContainer title="Issues by Urgency">
          <div className="h-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              {Object.entries(issuesByUrgency).map(([urgency, count]) => {
                const percentage = Math.round((count / totalIssues) * 100);
                let color;
                
                switch(urgency) {
                  case 'Low':
                    color = 'bg-green-500';
                    break;
                  case 'Medium':
                    color = 'bg-blue-500';
                    break;
                  case 'High':
                    color = 'bg-amber-500';
                    break;
                  case 'Emergency':
                    color = 'bg-red-500';
                    break;
                  default:
                    color = 'bg-gray-500';
                }
                
                return (
                  <div key={urgency} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-2">
                      <div 
                        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold`}
                      >
                        {percentage}%
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{urgency}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{count} issues</p>
                  </div>
                );
              })}
            </div>
          </div>
        </ChartContainer>
      </div>
      
      {/* Issues Trend Chart */}
      <ChartContainer title="Issues Trend (Last 7 Weeks)">
        <div className="h-full flex items-end justify-between pt-6">
          {issuesTrend.map((item, index) => {
            const height = (item.count / Math.max(...issuesTrend.map(i => i.count))) * 100;
            const date = new Date(item.date);
            const label = `${date.getMonth() + 1}/${date.getDate()}`;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-10">
                  <div 
                    className="absolute bottom-0 w-6 bg-blue-500 rounded-t transition-all duration-1000"
                    style={{ 
                      height: `${height}%`,
                      maxHeight: '180px',
                      animationDelay: `${index * 0.1}s`
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{label}</div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.count}</div>
              </div>
            );
          })}
        </div>
      </ChartContainer>
      
      {/* Recent Issues */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Issues
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mockIssues.slice(0, 5).map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {issue.ticketNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {issue.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {issue.location || 'Not specified'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        issue.urgency === 'Low' ? 'badge-low' :
                        issue.urgency === 'Medium' ? 'badge-medium' :
                        issue.urgency === 'High' ? 'badge-high' :
                        'badge-emergency'
                      }`}>
                        {issue.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        issue.status === 'Open' ? 'badge-open' :
                        issue.status === 'In Progress' ? 'badge-in-progress' :
                        'badge-resolved'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;