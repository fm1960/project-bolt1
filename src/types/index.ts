export type UserRole = 'manager' | 'occupant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  buildingId: string;
  avatar?: string;
}

export type IssueCategory = 'Plumbing' | 'Electrical' | 'HVAC' | 'Structural' | 'Cleaning' | 'Other';
export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Emergency';
export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';

export interface Issue {
  id: string;
  ticketNumber: string;
  category: IssueCategory;
  urgency: UrgencyLevel;
  description: string;
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
  buildingId: string;
  location?: string;
  images?: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  managerId: string;
}

export interface Analytics {
  issuesByCategory: Record<IssueCategory, number>;
  issuesByUrgency: Record<UrgencyLevel, number>;
  averageResolutionTime: number;
  totalOpenIssues: number;
  totalInProgressIssues: number;
  totalResolvedIssues: number;
  issuesTrend: {
    date: string;
    count: number;
  }[];
}