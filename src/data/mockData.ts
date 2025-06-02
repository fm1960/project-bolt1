import { User, Issue, Building, IssueCategory, UrgencyLevel, IssueStatus, Analytics } from '../types';

// Helper function to generate ticket numbers
const generateTicketNumber = () => {
  return `BLD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'manager@example.com',
    role: 'manager',
    buildingId: '1',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'occupant@example.com',
    role: 'occupant',
    buildingId: '1',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'occupant',
    buildingId: '1'
  }
];

// Mock Buildings
export const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'Skyline Tower',
    address: '123 Main St, City, State 12345',
    managerId: '1',
  },
  {
    id: '2',
    name: 'Harbor Point',
    address: '456 Ocean Blvd, City, State 12345',
    managerId: '1',
  }
];

// Mock Issues
export const mockIssues: Issue[] = [
  {
    id: '1',
    ticketNumber: 'BLD-0001',
    category: 'Plumbing',
    urgency: 'High',
    description: 'Water leak in the bathroom ceiling, dripping constantly.',
    status: 'Open',
    createdAt: '2023-04-15T09:30:00Z',
    updatedAt: '2023-04-15T09:30:00Z',
    createdBy: '2',
    buildingId: '1',
    location: 'Floor 3, Room 302',
    comments: [
      {
        id: '101',
        issueId: '1',
        userId: '2',
        userName: 'Jane Smith',
        userRole: 'occupant',
        content: 'The leak is getting worse, please help!',
        createdAt: '2023-04-15T10:30:00Z',
      },
      {
        id: '102',
        issueId: '1',
        userId: '1',
        userName: 'John Doe',
        userRole: 'manager',
        content: 'I\'ve scheduled a plumber to visit tomorrow morning.',
        createdAt: '2023-04-15T11:45:00Z',
      }
    ]
  },
  {
    id: '2',
    ticketNumber: 'BLD-0002',
    category: 'Electrical',
    urgency: 'Medium',
    description: 'Flickering lights in the conference room.',
    status: 'In Progress',
    createdAt: '2023-04-10T14:15:00Z',
    updatedAt: '2023-04-11T09:20:00Z',
    createdBy: '3',
    assignedTo: '1',
    buildingId: '1',
    location: 'Floor 2, Conference Room',
    comments: [
      {
        id: '201',
        issueId: '2',
        userId: '3',
        userName: 'Bob Johnson',
        userRole: 'occupant',
        content: 'The lights are flickering and it\'s disrupting our meetings.',
        createdAt: '2023-04-10T14:20:00Z',
      },
      {
        id: '202',
        issueId: '2',
        userId: '1',
        userName: 'John Doe',
        userRole: 'manager',
        content: 'An electrician is scheduled for this afternoon.',
        createdAt: '2023-04-11T09:20:00Z',
      }
    ]
  },
  {
    id: '3',
    ticketNumber: 'BLD-0003',
    category: 'HVAC',
    urgency: 'Low',
    description: 'The AC is making a strange noise but still working.',
    status: 'Resolved',
    createdAt: '2023-04-05T11:00:00Z',
    updatedAt: '2023-04-07T15:30:00Z',
    createdBy: '2',
    assignedTo: '1',
    buildingId: '1',
    location: 'Floor 4, Office 405',
    comments: [
      {
        id: '301',
        issueId: '3',
        userId: '2',
        userName: 'Jane Smith',
        userRole: 'occupant',
        content: 'The AC unit is making a buzzing sound.',
        createdAt: '2023-04-05T11:05:00Z',
      },
      {
        id: '302',
        issueId: '3',
        userId: '1',
        userName: 'John Doe',
        userRole: 'manager',
        content: 'Technician found a loose part and fixed it.',
        createdAt: '2023-04-07T15:30:00Z',
      }
    ]
  },
  {
    id: '4',
    ticketNumber: 'BLD-0004',
    category: 'Cleaning',
    urgency: 'Medium',
    description: 'Carpet stain in the main lobby area.',
    status: 'Open',
    createdAt: '2023-04-14T13:45:00Z',
    updatedAt: '2023-04-14T13:45:00Z',
    createdBy: '3',
    buildingId: '1',
    location: 'Ground Floor, Main Lobby',
    comments: []
  },
  {
    id: '5',
    ticketNumber: 'BLD-0005',
    category: 'Structural',
    urgency: 'Emergency',
    description: 'Crack in the wall that appears to be growing.',
    status: 'In Progress',
    createdAt: '2023-04-13T08:20:00Z',
    updatedAt: '2023-04-13T09:15:00Z',
    createdBy: '2',
    assignedTo: '1',
    buildingId: '1',
    location: 'Floor 1, Room 105',
    comments: [
      {
        id: '501',
        issueId: '5',
        userId: '1',
        userName: 'John Doe',
        userRole: 'manager',
        content: 'Structural engineer will visit today to assess the situation.',
        createdAt: '2023-04-13T09:15:00Z',
      }
    ]
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  issuesByCategory: {
    'Plumbing': 12,
    'Electrical': 8,
    'HVAC': 15,
    'Structural': 3,
    'Cleaning': 10,
    'Other': 5
  },
  issuesByUrgency: {
    'Low': 18,
    'Medium': 20,
    'High': 10,
    'Emergency': 5
  },
  averageResolutionTime: 2.5, // in days
  totalOpenIssues: 15,
  totalInProgressIssues: 10,
  totalResolvedIssues: 28,
  issuesTrend: [
    { date: '2023-03-01', count: 8 },
    { date: '2023-03-08', count: 12 },
    { date: '2023-03-15', count: 10 },
    { date: '2023-03-22', count: 15 },
    { date: '2023-03-29', count: 9 },
    { date: '2023-04-05', count: 14 },
    { date: '2023-04-12', count: 11 }
  ]
};

// Helper functions to work with mock data
export const getIssuesByUser = (userId: string): Issue[] => {
  return mockIssues.filter(issue => issue.createdBy === userId);
};

export const getIssuesByBuilding = (buildingId: string): Issue[] => {
  return mockIssues.filter(issue => issue.buildingId === buildingId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getBuildingById = (buildingId: string): Building | undefined => {
  return mockBuildings.find(building => building.id === buildingId);
};

export const createIssue = (issue: Omit<Issue, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt'>): Issue => {
  const newIssue: Issue = {
    ...issue,
    id: Math.random().toString(36).substring(2, 9),
    ticketNumber: generateTicketNumber(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: []
  };
  
  // In a real app, this would be an API call
  mockIssues.push(newIssue);
  return newIssue;
};

export const updateIssue = (issue: Issue): Issue => {
  const index = mockIssues.findIndex(i => i.id === issue.id);
  if (index >= 0) {
    const updatedIssue = {
      ...issue,
      updatedAt: new Date().toISOString()
    };
    mockIssues[index] = updatedIssue;
    return updatedIssue;
  }
  return issue;
};

export const addComment = (
  issueId: string, 
  userId: string, 
  content: string
): Comment | null => {
  const user = getUserById(userId);
  if (!user) return null;
  
  const issue = mockIssues.find(i => i.id === issueId);
  if (!issue) return null;
  
  const newComment: Comment = {
    id: Math.random().toString(36).substring(2, 9),
    issueId,
    userId,
    userName: user.name,
    userRole: user.role,
    content,
    createdAt: new Date().toISOString()
  };
  
  issue.comments.push(newComment);
  return newComment;
};