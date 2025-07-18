import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountRightPanel = ({ selectedAccount, onCreateAccount, onImpersonateAccount }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const quickActions = [
    { id: 'impersonate', label: 'Impersonate Account', icon: 'UserCheck', action: () => onImpersonateAccount(selectedAccount) },
    { id: 'reset-password', label: 'Reset Admin Password', icon: 'Key', action: () => console.log('Reset password') },
    { id: 'send-email', label: 'Send Email', icon: 'Mail', action: () => console.log('Send email') },
    { id: 'export-data', label: 'Export Data', icon: 'Download', action: () => console.log('Export data') }
  ];

  const usageMetrics = [
    { label: 'Contacts', value: '2,450', limit: '5,000', percentage: 49 },
    { label: 'Workflows', value: '12', limit: '25', percentage: 48 },
    { label: 'Storage', value: '1.2 GB', limit: '5 GB', percentage: 24 },
    { label: 'API Calls', value: '45,230', limit: '100,000', percentage: 45 }
  ];

  const recentActivity = [
    { id: 1, action: 'User login', user: 'John Doe', time: '2 minutes ago', type: 'info' },
    { id: 2, action: 'Workflow created', user: 'Sarah Wilson', time: '15 minutes ago', type: 'success' },
    { id: 3, action: 'Payment processed', user: 'System', time: '1 hour ago', type: 'success' },
    { id: 4, action: 'User added', user: 'Mike Johnson', time: '2 hours ago', type: 'info' }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">Usage Metrics</h3>
        <div className="space-y-3">
          {usageMetrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{metric.label}</span>
                <span className="text-text-primary">{metric.value} / {metric.limit}</span>
              </div>
              <div className="w-full h-2 bg-secondary-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    metric.percentage > 80 ? 'bg-error' : 
                    metric.percentage > 60 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-150">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-success' : 
                activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">{activity.action}</p>
                <p className="text-xs text-text-muted">by {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="CreditCard" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Professional Plan</span>
        </div>
        <p className="text-2xl font-bold text-text-primary">IDR 2,500,000</p>
        <p className="text-xs text-text-muted">per month • Next billing: Jan 15, 2024</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">Payment History</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">December 2023</p>
              <p className="text-xs text-text-muted">Paid on Dec 15, 2023</p>
            </div>
            <span className="text-sm font-medium text-success">IDR 2,500,000</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">November 2023</p>
              <p className="text-xs text-text-muted">Paid on Nov 15, 2023</p>
            </div>
            <span className="text-sm font-medium text-success">IDR 2,500,000</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text-primary">Active Users</h3>
        <span className="text-xs text-text-muted">8 / 15 users</span>
      </div>
      
      <div className="space-y-2">
        {[
          { name: 'John Doe', role: 'Admin', status: 'online' },
          { name: 'Sarah Wilson', role: 'Manager', status: 'offline' },
          { name: 'Mike Johnson', role: 'User', status: 'online' }
        ].map((user, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-150">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="User" size={14} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-xs text-text-muted">{user.role}</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              user.status === 'online' ? 'bg-success' : 'bg-text-muted'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">Account Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2">
            <span className="text-sm text-text-secondary">Two-Factor Auth</span>
            <div className="w-8 h-4 bg-success rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <span className="text-sm text-text-secondary">SSO Enabled</span>
            <div className="w-8 h-4 bg-secondary-300 rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">Permissions</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span className="text-text-secondary">CRM Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span className="text-text-secondary">Workflow Automation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="X" size={14} className="text-error" />
            <span className="text-text-secondary">White-label Branding</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!selectedAccount) {
    return (
      <div className="h-full flex flex-col bg-surface border-l border-border">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Account Details</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Building" size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No account selected</p>
            <p className="text-sm text-text-muted mb-4">Select an account from the tree to view details</p>
            <Button variant="primary" onClick={onCreateAccount} iconName="Plus">
              Create New Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-surface border-l border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Building" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{selectedAccount.name}</h2>
            <p className="text-sm text-text-muted">{selectedAccount.company}</p>
          </div>
        </div>

        <div className="flex space-x-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'billing' && renderBillingTab()}
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>

      <div className="p-4 border-t border-border">
        <h3 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              size="sm"
              fullWidth
              iconName={action.icon}
              onClick={action.action}
              className="justify-start"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountRightPanel;