export interface DashboardStats {
  totalUsers: number;
  revenue: number;
  documents: number;
  securityScore: number;
  userGrowth: number;
  revenueGrowth: number;
  documentGrowth: number;
  securityGrowth: number;
}

export interface ActivityItem {
  id: string;
  action: string;
  time: string;
  type: 'user' | 'document' | 'security' | 'team';
  details?: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  dueDate: string;
  team: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  joinedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  status: 'processing' | 'completed' | 'error';
  securityLevel: 'low' | 'medium' | 'high';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    security: boolean;
    updates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    dataSharing: boolean;
    analytics: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    loginAlerts: boolean;
  };
}