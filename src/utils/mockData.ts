import { DashboardStats, ActivityItem, Project, TeamMember, Document, Notification } from '../types/dashboard';

export const generateMockStats = (): DashboardStats => ({
  totalUsers: Math.floor(Math.random() * 5000) + 2000,
  revenue: Math.floor(Math.random() * 100000) + 30000,
  documents: Math.floor(Math.random() * 2000) + 500,
  securityScore: Math.floor(Math.random() * 20) + 80,
  userGrowth: Math.floor(Math.random() * 30) + 5,
  revenueGrowth: Math.floor(Math.random() * 25) + 3,
  documentGrowth: Math.floor(Math.random() * 40) + 10,
  securityGrowth: Math.floor(Math.random() * 10) + 1,
});

export const generateMockActivities = (): ActivityItem[] => {
  const actions = [
    'New user registered',
    'Document uploaded',
    'Security scan completed',
    'Team member invited',
    'Project created',
    'Settings updated',
    'Backup completed',
    'Alert resolved',
  ];

  const types: ActivityItem['type'][] = ['user', 'document', 'security', 'team'];

  return Array.from({ length: 10 }, (_, index) => ({
    id: `activity-${index + 1}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    time: `${Math.floor(Math.random() * 60) + 1} minutes ago`,
    type: types[Math.floor(Math.random() * types.length)],
  }));
};

export const generateMockProjects = (): Project[] => {
  const projectNames = [
    'Website Redesign',
    'Mobile App Development',
    'Security Audit',
    'Data Migration',
    'API Integration',
    'User Research',
    'Brand Guidelines',
    'Marketing Campaign',
  ];

  const statuses: Project['status'][] = ['active', 'completed', 'paused'];
  const priorities: Project['priority'][] = ['low', 'medium', 'high'];

  return Array.from({ length: 6 }, (_, index) => ({
    id: `project-${index + 1}`,
    name: projectNames[Math.floor(Math.random() * projectNames.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    progress: Math.floor(Math.random() * 100),
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    team: [`user-${Math.floor(Math.random() * 5) + 1}`, `user-${Math.floor(Math.random() * 5) + 1}`],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  }));
};

export const generateMockTeamMembers = (): TeamMember[] => {
  const names = [
    'Alice Johnson',
    'Bob Smith',
    'Carol Davis',
    'David Wilson',
    'Emma Brown',
    'Frank Miller',
    'Grace Lee',
    'Henry Taylor',
  ];

  const roles = [
    'Product Manager',
    'Software Engineer',
    'UX Designer',
    'Data Analyst',
    'Marketing Specialist',
    'Security Expert',
  ];

  const statuses: TeamMember['status'][] = ['online', 'offline', 'away'];

  return Array.from({ length: 8 }, (_, index) => ({
    id: `user-${index + 1}`,
    name: names[index],
    email: `${names[index].toLowerCase().replace(' ', '.')}@creativeshield.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export const generateMockDocuments = (): Document[] => {
  const documentNames = [
    'Project Proposal.pdf',
    'Design Mockups.sketch',
    'User Research.docx',
    'Financial Report.xlsx',
    'Security Policy.pdf',
    'Brand Guidelines.ai',
    'Meeting Notes.md',
    'Code Review.txt',
  ];

  const types = ['pdf', 'sketch', 'docx', 'xlsx', 'ai', 'md', 'txt'];
  const statuses: Document['status'][] = ['processing', 'completed', 'error'];
  const securityLevels: Document['securityLevel'][] = ['low', 'medium', 'high'];

  return Array.from({ length: 12 }, (_, index) => ({
    id: `doc-${index + 1}`,
    name: documentNames[Math.floor(Math.random() * documentNames.length)],
    type: types[Math.floor(Math.random() * types.length)],
    size: Math.floor(Math.random() * 10000000) + 100000, // 100KB to 10MB
    uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    uploadedBy: `user-${Math.floor(Math.random() * 8) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    securityLevel: securityLevels[Math.floor(Math.random() * securityLevels.length)],
  }));
};

export const generateMockNotifications = (): Notification[] => {
  const notifications = [
    { title: 'Security Alert', message: 'Unusual login activity detected', type: 'warning' as const },
    { title: 'Backup Complete', message: 'Your data has been successfully backed up', type: 'success' as const },
    { title: 'New Team Member', message: 'Alice Johnson joined your team', type: 'info' as const },
    { title: 'System Update', message: 'New features are now available', type: 'info' as const },
    { title: 'Storage Warning', message: 'You are running low on storage space', type: 'warning' as const },
    { title: 'Document Processed', message: 'Your document has been processed successfully', type: 'success' as const },
  ];

  return Array.from({ length: 8 }, (_, index) => ({
    id: `notification-${index + 1}`,
    ...notifications[Math.floor(Math.random() * notifications.length)],
    read: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};