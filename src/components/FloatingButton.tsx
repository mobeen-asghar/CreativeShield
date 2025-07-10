import React, { useState } from 'react';

interface FloatingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black shadow-lg hover:shadow-xl",
    secondary: "bg-white text-black border-2 border-black hover:bg-gray-50 focus:ring-black shadow-md hover:shadow-lg",
    ghost: "bg-transparent text-black hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed transform-none hover:scale-100 hover:shadow-none" 
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      <span className={`relative z-10 transition-transform duration-150 ${isPressed ? 'scale-95' : 'scale-100'}`}>
        {children}
      </span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
};

export default FloatingButton;