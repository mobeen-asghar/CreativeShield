import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Zap, Users, FileText } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const { elementRef, isVisible } = useScrollAnimation();

  const features = [
    {
      icon: Shield,
      title: "Intelligent Protection",
      description: "AI-powered threat detection that learns your creative workflow patterns.",
      details: "Advanced machine learning algorithms monitor your data in real-time, identifying potential threats before they impact your creative process."
    },
    {
      icon: Lock,
      title: "Zero-Trust Security",
      description: "Military-grade encryption that doesn't compromise on usability.",
      details: "End-to-end encryption with seamless integration into your existing creative tools and workflows."
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "GDPR-compliant tools that respect your creative freedom.",
      details: "Built-in privacy controls that automatically adapt to international regulations while maintaining creative flexibility."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Security that accelerates rather than hinders your creative process.",
      details: "Optimized performance ensures security measures enhance rather than slow down your creative workflow."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Secure sharing and collaboration tools for creative teams.",
      details: "Granular permissions and secure sharing capabilities designed specifically for creative team dynamics."
    },
    {
      icon: FileText,
      title: "Compliance Made Simple",
      description: "Automated compliance reporting that speaks your language.",
      details: "Intuitive dashboards and automated reports that make compliance transparent and manageable."
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAyIj4KICAgICAgPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-6" ref={elementRef}>
        {/* Section header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
            Features That
            <br />
            <span className="text-gray-600">Inspire Confidence</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light px-4 sm:px-0">
            Security tools designed with the same attention to detail as your creative work.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-6 sm:p-8 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-light leading-relaxed">
                  {feature.description}
                </p>

                {/* Expandable details */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeFeature === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-3 sm:pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-light">
                      {feature.details}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-2 h-2 bg-gray-400 rounded-full transition-all duration-300 ${
                  activeFeature === index ? 'scale-150 bg-gray-700' : 'scale-100'
                }`}></div>
              </div>

              {/* Subtle shadow */}
              <div className="absolute inset-0 rounded-3xl shadow-md group-hover:shadow-xl transition-shadow duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;