import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChurnPredictionInsights = () => {
  const churnInsights = [
    {
      id: 1,
      contact: 'PT Digital Marketing',
      riskLevel: 'high',
      churnProbability: 85,
      lastActivity: '14 days ago',
      reasons: ['Decreased email engagement', 'No recent purchases', 'Support tickets unresolved'],
      suggestedActions: ['Send personalized re-engagement email', 'Offer discount or incentive', 'Schedule check-in call'],
      value: 'IDR 15,000,000'
    },
    {
      id: 2,
      contact: 'Sarah Johnson',
      riskLevel: 'medium',
      churnProbability: 65,
      lastActivity: '7 days ago',
      reasons: ['Reduced platform usage', 'Missed last two meetings'],
      suggestedActions: ['Send usage tips and tutorials', 'Schedule product demo'],
      value: 'IDR 8,500,000'
    },
    {
      id: 3,
      contact: 'Tech Startup Hub',
      riskLevel: 'low',
      churnProbability: 25,
      lastActivity: '2 days ago',
      reasons: ['Seasonal usage pattern'],
      suggestedActions: ['Monitor engagement levels'],
      value: 'IDR 12,000,000'
    }
  ];

  const getRiskColor = (riskLevel) => {
    const colorMap = {
      high: 'bg-error-50 text-error border-error-200',
      medium: 'bg-warning-50 text-warning border-warning-200',
      low: 'bg-success-50 text-success border-success-200'
    };
    return colorMap[riskLevel] || colorMap.medium;
  };

  const getRiskIcon = (riskLevel) => {
    const iconMap = {
      high: 'AlertTriangle',
      medium: 'AlertCircle',
      low: 'CheckCircle'
    };
    return iconMap[riskLevel] || 'AlertCircle';
  };

  const getProgressColor = (probability) => {
    if (probability >= 70) return 'bg-error';
    if (probability >= 40) return 'bg-warning';
    return 'bg-success';
  };

  const handleTakeAction = (insight) => {
    console.log('Take action for:', insight.contact);
  };

  const handleViewDetails = (insight) => {
    console.log('View details for:', insight.contact);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Churn Prediction</h3>
          <span className="px-2 py-1 bg-error-100 text-error-600 text-xs rounded-full font-medium">
            {churnInsights.filter(i => i.riskLevel === 'high').length} high risk
          </span>
        </div>
        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-150">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {churnInsights.map((insight) => (
          <div 
            key={insight.id}
            className="p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRiskColor(insight.riskLevel)}`}>
                  <Icon name={getRiskIcon(insight.riskLevel)} size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm">{insight.contact}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getRiskColor(insight.riskLevel)}`}>
                      {insight.riskLevel} risk
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-text-secondary text-xs">Value: {insight.value}</span>
                    <span className="text-text-muted text-xs">Last activity: {insight.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Churn Probability Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Churn Probability</span>
                <span className="text-xs font-medium text-text-primary">{insight.churnProbability}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(insight.churnProbability)}`}
                  style={{ width: `${insight.churnProbability}%` }}
                ></div>
              </div>
            </div>
            
            {/* Risk Factors */}
            <div className="mb-3">
              <h5 className="text-xs font-medium text-text-primary mb-2">Risk Factors:</h5>
              <div className="flex flex-wrap gap-1">
                {insight.reasons.map((reason, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-error-50 text-error text-xs rounded-full"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Suggested Actions */}
            <div className="mb-4">
              <h5 className="text-xs font-medium text-text-primary mb-2">Suggested Actions:</h5>
              <ul className="space-y-1">
                {insight.suggestedActions.map((action, index) => (
                  <li key={index} className="text-xs text-text-secondary flex items-center space-x-2">
                    <Icon name="ArrowRight" size={12} className="text-primary" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewDetails(insight)}
                className="text-xs text-text-secondary hover:text-text-primary"
              >
                View Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleTakeAction(insight)}
                className="text-xs"
              >
                Take Action
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center justify-center space-x-2">
          <Icon name="Brain" size={14} />
          <span>Configure AI Predictions</span>
        </button>
      </div>
    </div>
  );
};

export default ChurnPredictionInsights;