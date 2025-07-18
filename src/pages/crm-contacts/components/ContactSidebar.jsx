import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSidebar = ({ 
  segments, 
  recentActivity, 
  selectedSegment, 
  onSegmentChange,
  onBulkAction 
}) => {
  const [expandedSegments, setExpandedSegments] = useState(['main']);

  const toggleSegmentExpansion = (segmentId) => {
    setExpandedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'email': 'Mail',
      'whatsapp': 'MessageSquare',
      'call': 'Phone',
      'meeting': 'Calendar',
      'note': 'FileText',
      'task': 'CheckSquare'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'email': 'text-primary',
      'whatsapp': 'text-success',
      'call': 'text-warning',
      'meeting': 'text-accent',
      'note': 'text-secondary',
      'task': 'text-error'
    };
    return colorMap[type] || 'text-text-muted';
  };

  const formatActivityTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Contact Segments */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Contact Segments</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            className="text-text-secondary hover:text-primary"
          />
        </div>
        
        <div className="space-y-2">
          {segments.map((segment) => (
            <div key={segment.id}>
              <button
                onClick={() => segment.children ? toggleSegmentExpansion(segment.id) : onSegmentChange(segment.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-150 ${
                  selectedSegment === segment.id 
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:bg-muted hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={segment.icon} size={16} />
                  <span className="font-medium">{segment.name}</span>
                  <span className="px-2 py-0.5 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                    {segment.count}
                  </span>
                </div>
                {segment.children && (
                  <Icon 
                    name={expandedSegments.includes(segment.id) ? "ChevronDown" : "ChevronRight"} 
                    size={14} 
                  />
                )}
              </button>
              
              {segment.children && expandedSegments.includes(segment.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {segment.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onSegmentChange(child.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-150 ${
                        selectedSegment === child.id 
                          ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:bg-muted hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name={child.icon} size={14} />
                        <span className="text-sm">{child.name}</span>
                        <span className="px-1.5 py-0.5 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                          {child.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Bulk Actions</h3>
        
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Mail"
            onClick={() => onBulkAction('email')}
            className="justify-start"
          >
            Send Email Campaign
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="MessageSquare"
            onClick={() => onBulkAction('whatsapp')}
            className="justify-start"
          >
            WhatsApp Broadcast
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Tag"
            onClick={() => onBulkAction('tag')}
            className="justify-start"
          >
            Add Tags
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="UserPlus"
            onClick={() => onBulkAction('segment')}
            className="justify-start"
          >
            Move to Segment
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Download"
            onClick={() => onBulkAction('export')}
            className="justify-start"
          >
            Export Contacts
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Upload"
            onClick={() => onBulkAction('import')}
            className="justify-start"
          >
            Import Contacts
          </Button>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            className="text-text-secondary hover:text-primary"
          />
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'email' ? 'bg-primary-100' :
                activity.type === 'whatsapp' ? 'bg-success-100' :
                activity.type === 'call' ? 'bg-warning-100' :
                activity.type === 'meeting'? 'bg-accent-100' : 'bg-secondary-100'
              }`}>
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={14} 
                  className={getActivityColor(activity.type)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{activity.title}</p>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">{activity.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-text-muted">{formatActivityTime(activity.timestamp)}</span>
                  <span className="text-xs text-text-muted">{activity.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="Clock"
            className="text-text-secondary hover:text-primary"
          >
            View All Activity
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Contacts</span>
            <span className="text-sm font-medium text-text-primary">1,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Active This Month</span>
            <span className="text-sm font-medium text-success">892</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">New This Week</span>
            <span className="text-sm font-medium text-primary">34</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Avg. Lead Score</span>
            <span className="text-sm font-medium text-accent">67</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Conversion Rate</span>
            <span className="text-sm font-medium text-warning">12.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;