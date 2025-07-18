import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SSOOptions = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const ssoProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'text-gray-800',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSSOLogin = async (provider) => {
    setLoadingProvider(provider.id);
    
    // Simulate SSO authentication
    setTimeout(() => {
      console.log(`Authenticating with ${provider.name}`);
      // In real implementation, this would redirect to OAuth provider
      setLoadingProvider(null);
    }, 2000);
  };

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-muted">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {ssoProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            fullWidth
            onClick={() => handleSSOLogin(provider)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider !== null}
            className={`h-12 justify-center ${provider.bgColor} border-border hover:border-primary-200 transition-all duration-150`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={provider.icon} size={18} className={provider.color} />
              <span className="font-medium text-text-primary">
                {loadingProvider === provider.id ? 'Connecting...' : `Continue with ${provider.name}`}
              </span>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-muted">
          Don't have an account?{' '}
          <button className="text-primary hover:text-primary-600 font-medium transition-colors duration-150">
            Contact Sales
          </button>
        </p>
      </div>
    </div>
  );
};

export default SSOOptions;