import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsPanel = ({ analyticsData, platforms, selectedPlatforms }) => {
  const getOptimalTimes = () => {
    if (selectedPlatforms.includes('all')) {
      return analyticsData.optimalPostingTimes;
    }
    
    const filteredTimes = {};
    selectedPlatforms.forEach(platformId => {
      if (analyticsData.optimalPostingTimes[platformId]) {
        filteredTimes[platformId] = analyticsData.optimalPostingTimes[platformId];
      }
    });
    
    return filteredTimes;
  };

  const connectedPlatforms = platforms.filter(p => p.connected);
  const optimalTimes = getOptimalTimes();

  return (
    <div className="space-y-6">
      {/* Analytics Summary */}
      <div className="bg-surface rounded-lg border border-border card-elevation p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Analytics Summary</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">Total Reach</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              {analyticsData.totalReach.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">Engagement</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              {analyticsData.totalEngagement.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">Avg. Rate</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              {analyticsData.averageEngagementRate}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">Total Posts</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              {analyticsData.totalPosts}
            </span>
          </div>
        </div>

        {/* Top Performing Platform */}
        <div className="mt-4 p-3 bg-success-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Top Performer</span>
          </div>
          <p className="text-sm text-text-primary mt-1">
            {analyticsData.topPerformingPlatform}
          </p>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-surface rounded-lg border border-border card-elevation p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Platform Performance</h3>
        
        <div className="space-y-3">
          {connectedPlatforms.map(platform => (
            <div key={platform.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}>
                  <Icon name={platform.icon} size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{platform.name}</p>
                  <p className="text-xs text-text-muted">{platform.followers.toLocaleString()} followers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{platform.engagement}%</p>
                <p className="text-xs text-text-muted">{platform.posts} posts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimal Posting Times */}
      <div className="bg-surface rounded-lg border border-border card-elevation p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Optimal Posting Times</h3>
        
        <div className="space-y-3">
          {Object.entries(optimalTimes).map(([platformId, times]) => {
            const platform = platforms.find(p => p.id === platformId);
            if (!platform) return null;
            
            return (
              <div key={platformId} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 ${platform.color} rounded-full flex items-center justify-center`}>
                    <Icon name={platform.icon} size={12} color="white" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{platform.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {times.map(time => (
                    <span
                      key={time}
                      className="text-xs bg-primary-100 text-primary px-2 py-1 rounded"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-surface rounded-lg border border-border card-elevation p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Performance</h3>
        
        <div className="space-y-2">
          {analyticsData.weeklyStats.map(stat => (
            <div key={stat.day} className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">{stat.day}</span>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {stat.reach.toLocaleString()}
                </div>
                <div className="text-xs text-text-muted">
                  {stat.engagement} engagements
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border card-elevation p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 p-3 bg-muted hover:bg-border rounded-lg transition-colors">
            <Icon name="BarChart3" size={16} className="text-text-muted" />
            <span className="text-sm text-text-primary">View Full Analytics</span>
          </button>
          
          <button className="w-full flex items-center space-x-2 p-3 bg-muted hover:bg-border rounded-lg transition-colors">
            <Icon name="Download" size={16} className="text-text-muted" />
            <span className="text-sm text-text-primary">Export Report</span>
          </button>
          
          <button className="w-full flex items-center space-x-2 p-3 bg-muted hover:bg-border rounded-lg transition-colors">
            <Icon name="Settings" size={16} className="text-text-muted" />
            <span className="text-sm text-text-primary">Analytics Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;