import { useState, useEffect } from 'react';
import { DashboardStats, ActivityItem, Project, TeamMember, Document, Notification } from '../types/dashboard';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '../utils/localStorage';
import {
  generateMockStats,
  generateMockActivities,
  generateMockProjects,
  generateMockTeamMembers,
  generateMockDocuments,
  generateMockNotifications,
} from '../utils/mockData';

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>(() =>
    getFromStorage(STORAGE_KEYS.DASHBOARD_STATS, generateMockStats())
  );
  
  const [activities, setActivities] = useState<ActivityItem[]>(() =>
    getFromStorage(STORAGE_KEYS.ACTIVITIES, generateMockActivities())
  );
  
  const [projects, setProjects] = useState<Project[]>(() =>
    getFromStorage(STORAGE_KEYS.PROJECTS, generateMockProjects())
  );
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    getFromStorage(STORAGE_KEYS.TEAM_MEMBERS, generateMockTeamMembers())
  );
  
  const [documents, setDocuments] = useState<Document[]>(() =>
    getFromStorage(STORAGE_KEYS.DOCUMENTS, generateMockDocuments())
  );
  
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getFromStorage(STORAGE_KEYS.NOTIFICATIONS, generateMockNotifications())
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    setToStorage(STORAGE_KEYS.DASHBOARD_STATS, stats);
  }, [stats]);

  useEffect(() => {
    setToStorage(STORAGE_KEYS.ACTIVITIES, activities);
  }, [activities]);

  useEffect(() => {
    setToStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    setToStorage(STORAGE_KEYS.TEAM_MEMBERS, teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    setToStorage(STORAGE_KEYS.DOCUMENTS, documents);
  }, [documents]);

  useEffect(() => {
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  // Data manipulation functions
  const addActivity = (activity: Omit<ActivityItem, 'id'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: `activity-${Date.now()}`,
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const updateStats = (newStats: Partial<DashboardStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const refreshData = () => {
    setStats(generateMockStats());
    setActivities(generateMockActivities());
    // Don't refresh projects, team members, documents, and notifications as they should persist
  };

  return {
    stats,
    activities,
    projects,
    teamMembers,
    documents,
    notifications,
    addActivity,
    updateProject,
    addProject,
    deleteProject,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    updateStats,
    refreshData,
  };
};