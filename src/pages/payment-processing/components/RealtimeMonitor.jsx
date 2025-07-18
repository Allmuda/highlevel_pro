import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealtimeMonitor = () => {
  const [notifications, setNotifications] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Successful',
      message: 'IDR 2.500.000 received from PT Digital Solutions via GoPay',
      timestamp: new Date(),
      paymentMethod: 'GoPay',
      amount: 'IDR 2.500.000'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Payment Retry',
      message: 'Subscription payment failed, retrying in 1 hour',
      timestamp: new Date(Date.now() - 300000),
      paymentMethod: 'BCA',
      amount: 'IDR 750.000'
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Failed',
      message: 'Transaction declined - insufficient funds',
      timestamp: new Date(Date.now() - 600000),
      paymentMethod: 'OVO',
      amount: 'IDR 1.200.000'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: Math.random() > 0.7 ? 'success' : Math.random() > 0.5 ? 'warning' : 'error',
        title: Math.random() > 0.5 ? 'Payment Successful' : 'Payment Failed',
        message: `IDR ${(Math.random() * 5000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} transaction update`,
        timestamp: new Date(),
        paymentMethod: ['GoPay', 'OVO', 'DANA', 'BCA', 'BRI'][Math.floor(Math.random() * 5)],
        amount: `IDR ${(Math.random() * 5000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    const iconMap = {
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colorMap[type] || 'text-primary';
  };

  const getPaymentMethodIcon = (method) => {
    const methodMap = {
      'GoPay': 'Smartphone',
      'OVO': 'Smartphone',
      'DANA': 'Smartphone',
      'BCA': 'Building',
      'BRI': 'Building',
      'BSI': 'Building',
      'BNI': 'Building'
    };
    return methodMap[method] || 'CreditCard';
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <h3 className="font-medium text-text-primary">Real-time Monitor</h3>
          <span className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full font-medium">
            Live
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearNotifications}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="Trash2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name={isMinimized ? "ChevronDown" : "ChevronUp"} size={14} />
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {!isMinimized && (
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-3 border-b border-border-muted hover:bg-muted transition-colors duration-150"
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                    <Icon name={getNotificationIcon(notification.type)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary text-sm">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-text-muted">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getPaymentMethodIcon(notification.paymentMethod)} 
                          size={12} 
                          className="text-text-muted" 
                        />
                        <span className="text-xs text-text-muted">
                          {notification.paymentMethod}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-text-primary">
                        {notification.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Icon name="Activity" size={32} className="mx-auto text-text-muted mb-3" />
              <p className="text-text-secondary">No recent activity</p>
              <p className="text-text-muted text-sm mt-1">
                Payment notifications will appear here
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      {!isMinimized && notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-border bg-muted">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              {notifications.length} recent notifications
            </span>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-600">
              View All Activity
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeMonitor;