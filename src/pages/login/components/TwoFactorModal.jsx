import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TwoFactorModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  const correctCode = '123456'; // Mock verification code

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      setTimeout(() => handleVerify(newCode.join('')), 100);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code = verificationCode.join('')) => {
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (code === correctCode) {
        localStorage.setItem('authToken', 'mock-jwt-token');
        navigate('/dashboard');
      } else {
        setError('Invalid verification code. Try: 123456');
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendCode = () => {
    setResendCooldown(30);
    setError('');
    console.log('Resending verification code...');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1050 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6 animate-slide-down">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Two-Factor Authentication</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-secondary transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <p className="text-text-secondary">
            We've sent a 6-digit verification code to your registered device. Enter it below to complete sign in.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{error}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Verification Code
          </label>
          <div className="flex space-x-2 justify-center">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            fullWidth
            onClick={() => handleVerify()}
            loading={isLoading}
            disabled={isLoading || verificationCode.some(digit => digit === '')}
            className="h-12"
          >
            {isLoading ? 'Verifying...' : 'Verify & Sign In'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-text-muted mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={resendCooldown > 0}
              className="text-primary hover:text-primary-600"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            Having trouble? Contact{' '}
            <button className="text-primary hover:text-primary-600 transition-colors duration-150">
              support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;