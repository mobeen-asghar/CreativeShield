import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'from-gray-100 to-gray-200',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative bg-white rounded-3xl p-6 shadow-lg border border-gray-100 
        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center transform transition-all duration-300 ${
          isHovered ? 'scale-110 rotate-3' : ''
        }`}>
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        
        {change && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            change.startsWith('+') 
              ? 'text-green-600 bg-green-50' 
              : 'text-red-600 bg-red-50'
          }`}>
            {change}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-light text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 font-light">{title}</p>
      </div>

      {/* Hover effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 opacity-50 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
};

export default DashboardCard;