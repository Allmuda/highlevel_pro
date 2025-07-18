import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'contact_added',
      title: 'New contact added',
      description: 'Sarah Johnson joined Premium Leads segment',
      time: '2 minutes ago',
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'payment_received',
      title: 'Payment received',
      description: 'IDR 2,500,000 from PT Digital Solutions',
      time: '15 minutes ago',
      icon: 'CreditCard',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'workflow_completed',
      title: 'Workflow completed',
      description: 'Welcome email sequence finished for 45 contacts',
      time: '1 hour ago',
      icon: 'Zap',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'campaign_sent',
      title: 'Campaign sent',
      description: 'Monthly newsletter delivered to 1,250 subscribers',
      time: '2 hours ago',
      icon: 'Mail',
      color: 'text-secondary'
    },
    {
      id: 5,
      type: 'appointment_booked',
      title: 'Appointment booked',
      description: 'Demo call scheduled with John Smith for tomorrow',
      time: '3 hours ago',
      icon: 'Calendar',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-150">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary text-sm">{activity.title}</h4>
              <p className="text-text-secondary text-xs mt-1 line-clamp-2">{activity.description}</p>
              <span className="text-text-muted text-xs mt-2 block">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center justify-center space-x-2">
          <Icon name="RefreshCw" size={14} />
          <span>Refresh Activity</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;