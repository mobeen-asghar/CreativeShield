import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Mail, Chrome, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FloatingButton from '../components/FloatingButton';
import FormInput from '../components/FormInput';
import PasswordStrength from '../components/PasswordStrength';
import LoadingSpinner from '../components/LoadingSpinner';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const success = await signup({ name, email, password, confirmPassword });
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Failed to create account. Please try again.');
    }
  };

  const socialProviders = [
    { name: 'Google', icon: Chrome, color: 'hover:bg-red-50' },
    { name: 'GitHub', icon: Github, color: 'hover:bg-gray-50' },
    { name: 'Email', icon: Mail, color: 'hover:bg-blue-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAyIj4KICAgICAgPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+')]"></div>
      </div>

      <div className={`w-full max-w-md transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600 font-light">Join us and start your journey</p>
          </div>

          {/* Social signup options */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              {socialProviders.map((provider, index) => (
                <button
                  key={provider.name}
                  className={`w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${provider.color} hover:border-gray-300`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <provider.icon className="w-5 h-5 text-gray-700" />
                </button>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-light">or create with email</span>
              </div>
            </div>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Full Name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="Enter your full name"
              required
            />

            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              required
            />

            <div>
              <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Create a password"
                required
                showPasswordToggle
              />
              <PasswordStrength password={password} />
            </div>

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
              required
              showPasswordToggle
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <FloatingButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </FloatingButton>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-light">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-black font-medium hover:underline transition-all duration-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-15 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Signup;