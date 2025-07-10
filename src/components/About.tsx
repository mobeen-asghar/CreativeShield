import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Award, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Creative Professionals' },
    { icon: Award, value: '99.9%', label: 'Uptime Guarantee' },
    { icon: Globe, value: '45+', label: 'Countries Served' },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Parallax background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-15 blur-2xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={elementRef}>
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left column - Text */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 mb-6 sm:mb-8 leading-tight">
              Built by Creatives,
              <br />
              <span className="text-gray-600">for Creatives</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 font-light leading-relaxed">
              We understand that security shouldn't feel like a barrier to creativity. 
              That's why we've reimagined data protection from the ground up, 
              creating tools that enhance rather than hinder your creative process.
            </p>

            <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 font-light leading-relaxed">
              Our team of security experts and creative professionals work together 
              to ensure that protection feels as natural as inspiration itself.
            </p>

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <button className="group flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-300">
                <span className="text-base sm:text-lg font-light">Learn Our Story</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right column - Interactive element */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 sm:space-x-6 group"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm sm:text-base text-gray-600 font-light">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-50"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full opacity-30"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-15 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;