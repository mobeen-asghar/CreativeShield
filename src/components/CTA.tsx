import React, { useState } from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import FloatingButton from './FloatingButton';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setEmail('');
    alert('Thank you for your interest! We\'ll be in touch soon.');
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6" ref={elementRef}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              Ready to Transform
              <br />
              <span className="text-gray-600">Your Security?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light px-4 sm:px-0">
              Join thousands of creative professionals who trust CreativeShield 
              to protect their most valuable assets.
            </p>
          </div>

          {/* Main CTA form */}
          <div className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl mb-12 sm:mb-16 mx-4 sm:mx-0 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-6 sm:mb-8">
              Start Your Free Trial Today
            </h3>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col gap-4 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300"
                />
                <FloatingButton
                  variant="primary"
                  onClick={() => {}}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </FloatingButton>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 font-light">
                No credit card required. 30-day free trial.
              </p>
            </form>
          </div>

          {/* Contact options */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto px-4 sm:px-0 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-900">Email Us</h4>
                  <p className="text-sm sm:text-base text-gray-600 font-light">Get a personalized demo</p>
                </div>
              </div>
              <button className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light">
                hello@creativeshield.com
              </button>
            </div>

            <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-900">Call Us</h4>
                  <p className="text-sm sm:text-base text-gray-600 font-light">Speak with our team</p>
                </div>
              </div>
              <button className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light">
                +1 (555) 123-4567
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;