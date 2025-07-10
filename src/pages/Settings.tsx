import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '../utils/localStorage';
import { UserSettings } from '../types/dashboard';
import FloatingButton from '../components/FloatingButton';
import FormInput from '../components/FormInput';

const Settings: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const { user, updateUser } = useAuth();

  const [settings, setSettings] = useState<UserSettings>(() =>
    getFromStorage(STORAGE_KEYS.USER_SETTINGS, {
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        security: true,
        updates: false,
      },
      privacy: {
        profileVisibility: 'private',
        dataSharing: false,
        analytics: true,
      },
      security: {
        twoFactorEnabled: false,
        sessionTimeout: 30,
        loginAlerts: true,
      },
    })
  );

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    setToStorage(STORAGE_KEYS.USER_SETTINGS, settings);
    
    // Update user profile if changed
    if (profileData.name !== user?.name) {
      updateUser({ name: profileData.name });
    }
    
    setIsSaving(false);
  };

  const updateSetting = (category: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({
    enabled,
    onChange,
  }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        enabled ? 'bg-black' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className={`mb-8 transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600 font-light">Manage your account and preferences</p>
          </div>
          
          <FloatingButton
            variant="primary"
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </FloatingButton>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className={`lg:col-span-1 transform transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className={`lg:col-span-3 transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Profile Information</h2>
                
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-medium text-gray-700">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <button className="text-sm text-black hover:underline mt-1">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    value={profileData.name}
                    onChange={(value) => setProfileData(prev => ({ ...prev, name: value }))}
                    placeholder="Enter your full name"
                  />
                  <FormInput
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    onChange={(value) => setProfileData(prev => ({ ...prev, email: value }))}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <FormInput
                      label="Current Password"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={(value) => setProfileData(prev => ({ ...prev, currentPassword: value }))}
                      placeholder="Enter current password"
                      showPasswordToggle
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="New Password"
                        type="password"
                        value={profileData.newPassword}
                        onChange={(value) => setProfileData(prev => ({ ...prev, newPassword: value }))}
                        placeholder="Enter new password"
                        showPasswordToggle
                      />
                      <FormInput
                        label="Confirm Password"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(value) => setProfileData(prev => ({ ...prev, confirmPassword: value }))}
                        placeholder="Confirm new password"
                        showPasswordToggle
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-gray-600">Receive notifications via email</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.email}
                      onChange={(enabled) => updateSetting('notifications', 'email', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-gray-600">Receive push notifications in your browser</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.push}
                      onChange={(enabled) => updateSetting('notifications', 'push', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
                      <p className="text-gray-600">Get notified about security events</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.security}
                      onChange={(enabled) => updateSetting('notifications', 'security', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Product Updates</h3>
                      <p className="text-gray-600">Stay informed about new features</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.updates}
                      onChange={(enabled) => updateSetting('notifications', 'updates', enabled)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Visibility</h3>
                    <div className="flex space-x-4">
                      {['public', 'private'].map((visibility) => (
                        <button
                          key={visibility}
                          onClick={() => updateSetting('privacy', 'profileVisibility', visibility)}
                          className={`px-4 py-2 rounded-2xl border-2 transition-all duration-200 ${
                            settings.privacy.profileVisibility === visibility
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Data Sharing</h3>
                      <p className="text-gray-600">Allow sharing of anonymized data for improvements</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.privacy.dataSharing}
                      onChange={(enabled) => updateSetting('privacy', 'dataSharing', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                      <p className="text-gray-600">Help us improve by sharing usage analytics</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.privacy.analytics}
                      onChange={(enabled) => updateSetting('privacy', 'analytics', enabled)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Appearance</h2>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                  <div className="flex space-x-4">
                    {['light', 'dark'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => updateSetting('theme', '', theme)}
                        className={`px-6 py-4 rounded-2xl border-2 transition-all duration-200 ${
                          settings.theme === theme
                            ? 'border-black bg-black text-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full ${
                            theme === 'light' ? 'bg-white border border-gray-300' : 'bg-gray-800'
                          }`}></div>
                          <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;