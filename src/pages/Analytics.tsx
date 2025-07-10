import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, FileText, Calendar, Download } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import FloatingButton from '../components/FloatingButton';
import CircularProgress from '../components/CircularProgress';

const Analytics: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const { stats, activities } = useDashboardData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const analyticsData = [
    { label: 'User Growth', value: stats.userGrowth, color: 'from-blue-100 to-blue-200' },
    { label: 'Revenue Growth', value: stats.revenueGrowth, color: 'from-green-100 to-green-200' },
    { label: 'Document Growth', value: stats.documentGrowth, color: 'from-purple-100 to-purple-200' },
    { label: 'Security Score', value: stats.securityScore, color: 'from-red-100 to-red-200' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className={`mb-8 transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600 font-light">Detailed insights into your performance</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="flex bg-gray-100 rounded-2xl p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    timeRange === range.value
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <FloatingButton variant="secondary" onClick={() => {}}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </FloatingButton>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((item, index) => (
          <div
            key={item.label}
            className={`bg-white rounded-3xl p-6 shadow-lg border border-gray-100 transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <CircularProgress
                percentage={item.value}
                size={80}
                strokeWidth={6}
                label={item.label}
              />
              <h3 className="text-lg font-light text-gray-900 mt-4">{item.label}</h3>
              <p className="text-2xl font-light text-gray-900 mt-2">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-xl font-light text-gray-900 mb-6">Activity Overview</h3>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-light">Activity chart visualization</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-xl font-light text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {activities.slice(0, 8).map((activity) => (
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
  );
};

export default Analytics;