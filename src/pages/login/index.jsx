import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandingPanel from './components/BrandingPanel';
import LoginForm from './components/LoginForm';
import SSOOptions from './components/SSOOptions';
import TwoFactorModal from './components/TwoFactorModal';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
      return;
    }

    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [navigate]);

  const handleTwoFactorRequired = () => {
    setShowTwoFactor(true);
  };

  const handleTwoFactorClose = () => {
    setShowTwoFactor(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-text-secondary">Loading...</span>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <BrandingPanel />

      {/* Right Panel - Login Form */}
      <div className="flex-1 lg:w-2/5 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-text-primary">Leveling.ID</span>
            </div>
            <p className="text-text-secondary">Marketing Automation Platform</p>
          </div>

          {/* Login Form */}
          <LoginForm onTwoFactorRequired={handleTwoFactorRequired} />

          {/* SSO Options */}
          <SSOOptions />

          {/* Footer */}
          <LoginFooter />
        </div>
      </div>

      {/* Two-Factor Authentication Modal */}
      <TwoFactorModal
        isOpen={showTwoFactor}
        onClose={handleTwoFactorClose} />

    </div>);

};

export default Login;