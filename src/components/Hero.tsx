import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronDown, Zap, Lock } from 'lucide-react';
import FloatingButton from './FloatingButton';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjEiIHR5cGU9ImZyYWN0YWxOb2lzZSIvPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iYmxhY2siIGZpbHRlcj0idXJsKCNub2lzZSkiLz4KPC9zdmc+')]"></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 transform transition-all duration-1000 ${
          isLoaded ? 'translate-x-0 opacity-20' : 'translate-x-full opacity-0'
        }`}>
          <div className="relative w-full h-full">
            {/* Hexagonal pattern that morphs into shield */}
            <div className="absolute inset-0 border-2 border-gray-300 transform rotate-45 transition-all duration-2000 hover:rotate-90 hover:border-gray-800">
              <div className="absolute inset-4 border border-gray-400 transform -rotate-45 transition-all duration-1000 hover:rotate-0">
                <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute top-2/3 right-1/3 w-32 h-32 transform transition-all duration-1500 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-15' : 'translate-y-full opacity-0'
        }`}>
          <div className="relative w-full h-full border border-gray-300 transform rotate-12 transition-all duration-2000 hover:rotate-180">
            <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Cursor follower */}
      <div 
        className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 pointer-events-none z-50 transition-all duration-200 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'scale(0.8)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className={`max-w-4xl mx-auto w-full transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Logo/Brand */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                  <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900">CreativeShield</h1>
            </div>
          </div>

          {/* Main heading */}
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-gray-900 mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Data Protection
            <br />
            <span className="text-gray-600">Reimagined</span>
          </h2>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0 transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Elegant compliance tools designed for creative professionals who value both security and aesthetics.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0 transform transition-all duration-1000 delay-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <FloatingButton 
              variant="primary" 
              onClick={() => navigate('/signup')}
              className="group w-full sm:w-auto"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </FloatingButton>

            <FloatingButton 
              variant="secondary"
              onClick={() => navigate('/login')}
              className="group border-2 border-gray-300 hover:border-gray-800 transition-colors duration-300 w-full sm:w-auto"
            >
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Watch Demo</span>
            </FloatingButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col items-center space-y-2 text-gray-500">
            <span className="text-sm font-light">Discover More</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;