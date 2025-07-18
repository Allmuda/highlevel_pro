import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BottleneckAlerts = () => {
  const bottlenecks = [
    {
      id: 1,
      title: 'Low Email Open Rates',
      description: 'Welcome email sequence showing 15% open rate (below 25% target)',
      severity: 'high',
      category: 'email_marketing',
      suggestion: 'Review subject lines and sender reputation',
      action: 'Optimize Campaign',
      impact: 'High'
    },
    {
      id: 2,
      title: 'WhatsApp API Rate Limit',
      description: 'Approaching 80% of daily message limit (1,600/2,000)',
      severity: 'medium',
      category: 'communication',
      suggestion: 'Upgrade plan or optimize message frequency',
      action: 'Upgrade Plan',
      impact: 'Medium'
    },
    {
      id: 3,
      title: 'Lead Response Time',
      description: 'Average response time is 4.2 hours (target: &lt;2 hours)',
      severity: 'medium',
      category: 'sales',
      suggestion: 'Enable auto-responses or add team members',
      action: 'Setup Automation',
      impact: 'Medium'
    },
    {
      id: 4,
      title: 'Payment Gateway Errors',
      description: '12% transaction failure rate with BCA integration',
      severity: 'high',
      category: 'payments',
      suggestion: 'Contact BCA support or add backup gateway',
      action: 'Fix Integration',
      impact: 'High'
    }
  ];

  const getSeverityColor = (severity) => {
    const colorMap = {
      high: 'bg-error-50 text-error border-error-200',
      medium: 'bg-warning-50 text-warning border-warning-200',
      low: 'bg-success-50 text-success border-success-200'
    };
    return colorMap[severity] || colorMap.medium;
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      email_marketing: 'Mail',
      communication: 'MessageCircle',
      sales: 'TrendingUp',
      payments: 'CreditCard',
      automation: 'Zap'
    };
    return iconMap[category] || 'AlertTriangle';
  };

  const handleActionClick = (bottleneck) => {
    console.log('Handle bottleneck action:', bottleneck.title);
  };

  const handleDismiss = (bottleneckId, event) => {
    event.stopPropagation();
    console.log('Dismiss bottleneck:', bottleneckId);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Bottleneck Alerts</h3>
          <span className="px-2 py-1 bg-error-100 text-error-600 text-xs rounded-full font-medium">
            {bottlenecks.filter(b => b.severity === 'high').length} critical
          </span>
        </div>
        <button className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {bottlenecks.map((bottleneck) => (
          <div 
            key={bottleneck.id}
            className="p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-error-50 rounded-lg flex items-center justify-center">
                  <Icon name={getCategoryIcon(bottleneck.category)} size={16} className="text-error" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm">{bottleneck.title}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getSeverityColor(bottleneck.severity)}`}>
                      {bottleneck.severity}
                    </span>
                  </div>
                  <p className="text-text-secondary text-xs mb-2" dangerouslySetInnerHTML={{ __html: bottleneck.description }}></p>
                  <p className="text-text-muted text-xs mb-3">
                    <strong>Suggestion:</strong> {bottleneck.suggestion}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => handleDismiss(bottleneck.id, e)}
                className="text-text-muted hover:text-text-secondary transition-colors duration-150"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-text-muted">
                  Impact: <span className="font-medium">{bottleneck.impact}</span>
                </span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleActionClick(bottleneck)}
                className="text-xs"
              >
                {bottleneck.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center justify-center space-x-2">
          <Icon name="Settings" size={14} />
          <span>Configure Alert Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BottleneckAlerts;