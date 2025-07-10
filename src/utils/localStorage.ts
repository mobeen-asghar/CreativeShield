// Utility functions for localStorage management
export const STORAGE_KEYS = {
  USER: 'user',
  DASHBOARD_STATS: 'dashboardStats',
  ACTIVITIES: 'activities',
  PROJECTS: 'projects',
  TEAM_MEMBERS: 'teamMembers',
  DOCUMENTS: 'documents',
  NOTIFICATIONS: 'notifications',
  USER_SETTINGS: 'userSettings',
} as const;

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

export const clearAllStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.USER) { // Keep user data
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};