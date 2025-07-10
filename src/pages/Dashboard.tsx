import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  Shield,
  Plus,
  MoreHorizontal,
  Activity,
  Calendar,
  RefreshCw,
  Bell,
  Settings as SettingsIcon
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import CircularProgress from '../components/CircularProgress';
import FloatingButton from '../components/FloatingButton';
import { useDashboardData } from '../hooks/useDashboardData';
import ProjectModal from '../components/ProjectModal';
import NotificationPanel from '../components/NotificationPanel';
import Analytics from './Analytics';
import Team from './Team';
import Documents from './Documents';
import Settings from './Settings';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const {
    stats,
    activities,
    projects,
    notifications,
    addProject,
    updateProject,
    deleteProject,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    refreshData,
  } = useDashboardData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const statsCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers.toLocaleString(), 
      change: `+${stats.userGrowth}%`, 
      icon: Users, 
      color: 'from-blue-100 to-blue-200' 
    },
    { 
      title: 'Revenue', 
      value: `$${stats.revenue.toLocaleString()}`, 
      change: `+${stats.revenueGrowth}%`, 
      icon: TrendingUp, 
      color: 'from-green-100 to-green-200' 
    },
    { 
      title: 'Documents', 
      value: stats.documents.toLocaleString(), 
      change: `+${stats.documentGrowth}%`, 
      icon: FileText, 
      color: 'from-purple-100 to-purple-200' 
    },
    { 
      title: 'Security Score', 
      value: `${stats.securityScore}%`, 
      change: `+${stats.securityGrowth}%`, 
      icon: Shield, 
      color: 'from-red-100 to-red-200' 
    },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleCreateProject = (projectData: any) => {
    addProject({
      name: projectData.name,
      status: 'active',
      progress: 0,
      dueDate: projectData.dueDate,
      team: projectData.team || [],
      priority: projectData.priority || 'medium',
    });
    setShowProjectModal(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <Analytics />;
      case 'team':
        return <Team />;
      case 'documents':
        return <Documents />;
      case 'notifications':
        return <Documents />; // Using Documents as placeholder for notifications page
      case 'settings':
        return <Settings />;
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div className="p-8">
      {/* Header */}
      <div className={`mb-8 transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600 font-light">Welcome back! Here's what's happening.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <FloatingButton 
              variant="ghost" 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </FloatingButton>
            <FloatingButton variant="ghost" onClick={refreshData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </FloatingButton>
            <FloatingButton variant="secondary" onClick={() => {}}>
              <Calendar className="w-4 h-4 mr-2" />
              This Week
            </FloatingButton>
            <FloatingButton variant="primary" onClick={() => setShowProjectModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </FloatingButton>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {statsCards.map((stat, index) => (
          <div
            key={stat.title}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DashboardCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Analytics Chart */}
        <div className={`lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-light text-gray-900">Performance Overview</h3>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Mock chart area */}
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-light">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Progress & Activity */}
        <div className="space-y-8">
          {/* Progress Card */}
          <div className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h3 className="text-xl font-light text-gray-900 mb-6">Goal Progress</h3>
            <div className="flex justify-center mb-6">
              <CircularProgress 
                percentage={Math.round((stats.revenue / 100000) * 100)} 
                label="Revenue Goal" 
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-light">Completed</span>
                <span className="font-medium">{Math.round((stats.revenue / 100000) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-light">Remaining</span>
                <span className="font-medium">{100 - Math.round((stats.revenue / 100000) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-1000 delay-600 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h3 className="text-xl font-light text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activities.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-2xl transition-colors duration-200">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={markNotificationAsRead}
          onMarkAllAsRead={markAllNotificationsAsRead}
          onDelete={deleteNotification}
        />
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <ProjectModal
          onClose={() => setShowProjectModal(false)}
          onSave={handleCreateProject}
        />
      )}

      {/* Floating Action Menu */}
      <div className="fixed bottom-8 right-8">
        <FloatingButton
          variant="primary"
          size="lg"
          onClick={() => setShowProjectModal(true)}
          className="rounded-full w-16 h-16 shadow-2xl"
        >
          <Plus className="w-6 h-6" />
        </FloatingButton>
      </div>
    </div>
  );
};

export default Dashboard;