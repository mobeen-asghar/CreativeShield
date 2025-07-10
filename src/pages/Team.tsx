import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, MoreHorizontal, UserPlus, Search } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import FloatingButton from '../components/FloatingButton';
import FormInput from '../components/FormInput';

const Team: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { teamMembers } = useDashboardData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className={`mb-8 transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Team</h1>
            <p className="text-gray-600 font-light">Manage your team members and permissions</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors duration-200"
              />
            </div>
            <FloatingButton variant="primary" onClick={() => setShowInviteModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </FloatingButton>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-900">{teamMembers.length}</h3>
              <p className="text-gray-600 font-light">Total Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-900">
                {teamMembers.filter(m => m.status === 'online').length}
              </h3>
              <p className="text-gray-600 font-light">Online Now</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-900">
                {new Set(teamMembers.map(m => m.role)).size}
              </h3>
              <p className="text-gray-600 font-light">Different Roles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform transition-all duration-1000 delay-400 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
              </div>
              
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Joined {formatJoinDate(member.joinedAt)}</span>
              <span className="capitalize">{member.status}</span>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors duration-200">
                <Mail className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors duration-200">
                <Phone className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Invite Team Member</h2>
            <div className="space-y-4">
              <FormInput
                label="Email Address"
                type="email"
                value=""
                onChange={() => {}}
                placeholder="Enter email address"
              />
              <FormInput
                label="Role"
                value=""
                onChange={() => {}}
                placeholder="Enter role"
              />
              <div className="flex space-x-4 pt-4">
                <FloatingButton
                  variant="secondary"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1"
                >
                  Cancel
                </FloatingButton>
                <FloatingButton
                  variant="primary"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1"
                >
                  Send Invite
                </FloatingButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;