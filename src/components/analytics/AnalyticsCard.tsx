import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: number;
  suffix?: string;
  prefix?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  change,
  suffix,
  prefix,
}) => {
  const isPositiveChange = change !== undefined && change >= 0;
  
  return (
    <div className="card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {prefix}{value}{suffix}
          </p>
          
          {change !== undefined && (
            <div className={`flex items-center mt-1 text-sm ${
              isPositiveChange ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
            }`}>
              {isPositiveChange ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(change)}% from last period</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;