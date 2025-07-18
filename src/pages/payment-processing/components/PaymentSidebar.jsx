import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSidebar = ({ onCreateInvoice, onCreateSubscription, onCreatePaymentLink }) => {
  const quickActions = [
    {
      id: 1,
      title: 'Create Invoice',
      description: 'Generate new invoice for customers',
      icon: 'FileText',
      color: 'primary',
      onClick: onCreateInvoice
    },
    {
      id: 2,
      title: 'Setup Subscription',
      description: 'Configure recurring billing',
      icon: 'Repeat',
      color: 'accent',
      onClick: onCreateSubscription
    },
    {
      id: 3,
      title: 'Payment Link',
      description: 'Create shareable payment link',
      icon: 'Link',
      color: 'success',
      onClick: onCreatePaymentLink
    }
  ];

  const paymentMethods = [
    { id: 1, name: 'GoPay', status: 'active', icon: 'Smartphone', color: 'success' },
    { id: 2, name: 'OVO', status: 'active', icon: 'Smartphone', color: 'success' },
    { id: 3, name: 'DANA', status: 'active', icon: 'Smartphone', color: 'success' },
    { id: 4, name: 'BSI', status: 'active', icon: 'Building', color: 'success' },
    { id: 5, name: 'BRI', status: 'pending', icon: 'Building', color: 'warning' },
    { id: 6, name: 'BCA', status: 'active', icon: 'Building', color: 'success' },
    { id: 7, name: 'BNI', status: 'inactive', icon: 'Building', color: 'error' }
  ];

  const getStatusColor = (status) => {
    const statusMap = {
      active: 'text-success',
      pending: 'text-warning',
      inactive: 'text-error'
    };
    return statusMap[status] || 'text-text-muted';
  };

  return (
    <div className="w-80 bg-surface border-r border-border p-6 overflow-y-auto">
      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              onClick={action.onClick}
              className="w-full justify-start p-4 h-auto border border-border hover:border-primary-200 transition-all duration-150"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.color === 'primary' ? 'bg-primary-50 text-primary' :
                  action.color === 'accent'? 'bg-accent-50 text-accent' : 'bg-success-50 text-success'
                }`}>
                  <Icon name={action.icon} size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-text-primary">{action.title}</p>
                  <p className="text-xs text-text-secondary">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Payment Methods Status */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Methods</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={method.icon} size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">{method.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  method.status === 'active' ? 'bg-success' :
                  method.status === 'pending'? 'bg-warning' : 'bg-error'
                }`} />
                <span className={`text-xs capitalize ${getStatusColor(method.status)}`}>
                  {method.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary-600">
          <Icon name="Settings" size={16} className="mr-2" />
          Configure Methods
        </Button>
      </div>
    </div>
  );
};

export default PaymentSidebar;