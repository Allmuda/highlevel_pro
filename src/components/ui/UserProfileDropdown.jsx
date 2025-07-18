import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser] = useState({
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Administrator',
    avatar: null,
    company: 'HighLevel Pro'
  });

  const [subAccounts] = useState([
    { id: 1, name: 'Main Account', company: 'HighLevel Pro', active: true },
    { id: 2, name: 'PT Digital Solutions', company: 'Digital Marketing Agency', active: false },
    { id: 3, name: 'Startup Hub', company: 'Tech Incubator', active: false }
  ]);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setIsOpen(false);
  };

  const handleProfileSettings = () => {
    console.log('Navigate to profile settings');
    setIsOpen(false);
  };

  const handleSwitchAccount = (account) => {
    console.log('Switch to account:', account.name);
    setIsOpen(false);
  };

  const handlePreferences = () => {
    console.log('Navigate to preferences');
    setIsOpen(false);
  };

  const handleBilling = () => {
    console.log('Navigate to billing');
    setIsOpen(false);
  };

  const handleSupport = () => {
    console.log('Navigate to support');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-150 px-2"
      >
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          ) : (
            <Icon name="User" size={16} className="text-primary" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-text-primary">{currentUser.name}</p>
          <p className="text-xs text-text-muted">{currentUser.role}</p>
        </div>
        <Icon name="ChevronDown" size={16} className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-72 bg-surface border border-border rounded-lg shadow-xl z-1010 animate-slide-down">
          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="User" size={20} className="text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-primary">{currentUser.name}</p>
                <p className="text-sm text-text-secondary">{currentUser.email}</p>
                <p className="text-xs text-text-muted">{currentUser.role} • {currentUser.company}</p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="py-2">
            <button
              onClick={handleProfileSettings}
              className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="User" size={16} />
              <span>Profile Settings</span>
            </button>
            <button
              onClick={handlePreferences}
              className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="Settings" size={16} />
              <span>Preferences</span>
            </button>
            <button
              onClick={handleBilling}
              className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="CreditCard" size={16} />
              <span>Billing & Plans</span>
            </button>
          </div>

          {/* Sub-Account Switching */}
          {subAccounts.length > 1 && (
            <>
              <div className="border-t border-border py-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Switch Account</p>
                </div>
                {subAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleSwitchAccount(account)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-150 flex items-center justify-between ${
                      account.active 
                        ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:bg-muted hover:text-text-primary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Building" size={14} />
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-xs text-text-muted">{account.company}</p>
                      </div>
                    </div>
                    {account.active && <Icon name="Check" size={14} className="text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Support & Logout */}
          <div className="border-t border-border py-2">
            <button
              onClick={handleSupport}
              className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Help & Support</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;