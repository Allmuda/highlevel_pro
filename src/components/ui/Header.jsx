import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'CRM', path: '/crm-contacts', icon: 'Users' },
    { label: 'Campaigns', path: '/campaign-builder', icon: 'Megaphone' },
    { label: 'Messaging', path: '/whats-app-business-center', icon: 'MessageCircle' },
    { label: 'Automation', path: '/workflow-automation', icon: 'Zap' },
    { label: 'Payments', path: '/payment-processing', icon: 'CreditCard' },
    { label: 'Administration', path: '/sub-account-management', icon: 'Settings' },
  ];

  const notifications = [
    { id: 1, title: 'Workflow Completed', message: 'Email campaign automation finished successfully', time: '2 min ago', type: 'success' },
    { id: 2, title: 'Payment Received', message: 'IDR 2,500,000 payment processed', time: '15 min ago', type: 'success' },
    { id: 3, title: 'System Alert', message: 'API rate limit approaching threshold', time: '1 hour ago', type: 'warning' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-text-primary">Levelin.id</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out min-h-44 ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:block relative" ref={searchRef}>
            {!isSearchOpen ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                iconName="Search"
                className="text-text-secondary hover:text-text-primary"
              />
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search across platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-9"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                  className="ml-2"
                />
              </form>
            )}
          </div>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            iconName="Search"
            className="md:hidden text-text-secondary hover:text-text-primary"
          />

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative text-text-secondary hover:text-text-primary"
            >
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-lg shadow-xl z-1010 animate-slide-down">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border-muted hover:bg-muted transition-colors duration-150">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-success' : 
                          notification.type === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary text-sm">{notification.title}</h4>
                          <p className="text-text-secondary text-sm mt-1">{notification.message}</p>
                          <span className="text-text-muted text-xs mt-2 block">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth>
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 bg-surface border border-border rounded-lg shadow-xl z-1010 animate-slide-down">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-text-primary">John Doe</p>
                  <p className="text-sm text-text-secondary">john@company.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-2">
                    <Icon name="Building" size={16} />
                    <span>Switch Account</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-150 flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            className="lg:hidden text-text-secondary hover:text-text-primary"
          />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-border bg-surface p-4">
          <form onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              placeholder="Search across platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-surface z-1020">
          <nav className="p-6 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-150 ease-out min-h-44 ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;