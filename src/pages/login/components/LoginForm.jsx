import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onTwoFactorRequired }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    admin: { email: 'admin@highlevel.com', password: 'admin123', has2FA: true },
    user: { email: 'user@company.com', password: 'user123', has2FA: false },
    demo: { email: 'demo@demo.com', password: 'demo123', has2FA: false }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const validCredential = Object.values(mockCredentials).find(
        cred => cred.email === formData.email && cred.password === formData.password
      );
      
      if (validCredential) {
        if (validCredential.has2FA) {
          onTwoFactorRequired();
        } else {
          localStorage.setItem('authToken', 'mock-jwt-token');
          navigate('/dashboard');
        }
      } else {
        setErrors({ 
          general: 'Invalid email or password. Try: admin@highlevel.com / admin123' 
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password');
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">Welcome back</h2>
        <p className="text-text-secondary">Sign in to your HighLevel Pro account</p>
      </div>

      {errors.general && (
        <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'border-error focus:border-error focus:ring-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={`pr-12 ${errors.password ? 'border-error focus:border-error focus:ring-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors duration-150"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Input
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="h-12"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;