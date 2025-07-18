import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Workflow Completed Successfully',
      message: 'Email campaign "Welcome Series" has finished processing 1,250 contacts',
      time: '2 minutes ago',
      type: 'success',
      read: false,
      category: 'workflow'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'IDR 2,500,000 payment processed for Invoice #INV-2024-001',
      time: '15 minutes ago',
      type: 'success',
      read: false,
      category: 'payment'
    },
    {
      id: 3,
      title: 'API Rate Limit Warning',
      message: 'WhatsApp Business API approaching 80% of daily limit',
      time: '1 hour ago',
      type: 'warning',
      read: false,
      category: 'system'
    },
    {
      id: 4,
      title: 'New Contact Added',
      message: 'Sarah Johnson was added to "Premium Leads" segment',
      time: '2 hours ago',
      type: 'info',
      read: true,
      category: 'crm'
    },
    {
      id: 5,
      title: 'Sub-Account Created',
      message: 'New sub-account "PT Digital Marketing" has been activated',
      time: '3 hours ago',
      type: 'info',
      read: true,
      category: 'account'
    }
  ]);

  const notificationRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
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

  const getNotificationIcon = (type, category) => {
    const iconMap = {
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
      info: 'Info'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-primary'
    };
    return colorMap[type] || 'text-primary';
  };

  const getCategoryIcon = (category) => {
    const categoryMap = {
      workflow: 'Zap',
      payment: 'CreditCard',
      system: 'Settings',
      crm: 'Users',
      account: 'Building'
    };
    return categoryMap[category] || 'Bell';
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    // Navigate based on category
    const navigationMap = {
      workflow: '/workflow-automation',
      payment: '/payment-processing',
      crm: '/crm-contacts',
      account: '/sub-account-management',
      system: '/dashboard'
    };

    const path = navigationMap[notification.category] || '/dashboard';
    console.log('Navigate to:', path);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id, event) => {
    event.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className={`relative ${className}`} ref={notificationRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-text-secondary hover:text-text-primary transition-colors duration-150"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center px-1 font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-surface border border-border rounded-lg shadow-xl z-1010 animate-slide-down">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-accent-100 text-accent-600 text-xs rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary-600"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-border-muted hover:bg-muted transition-colors duration-150 cursor-pointer relative ${
                    !notification.read ? 'bg-primary-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                      <Icon name={getNotificationIcon(notification.type)} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`font-medium text-sm ${!notification.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => clearNotification(notification.id, e)}
                          className="ml-2 text-text-muted hover:text-text-secondary transition-colors duration-150"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                      <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-text-muted text-xs">{notification.time}</span>
                        <div className="flex items-center space-x-1">
                          <Icon name={getCategoryIcon(notification.category)} size={12} className="text-text-muted" />
                          <span className="text-text-muted text-xs capitalize">{notification.category}</span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="mx-auto text-text-muted mb-3" />
                <p className="text-text-secondary">No notifications</p>
                <p className="text-text-muted text-sm mt-1">You're all caught up!</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" fullWidth className="text-primary hover:text-primary-600">
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;