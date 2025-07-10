import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-2 border-black border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;