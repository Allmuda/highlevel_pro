import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BroadcastPanel = ({ onClose }) => {
  const [broadcastData, setBroadcastData] = useState({
    name: '',
    message: '',
    selectedTemplate: null,
    audience: 'all',
    scheduledTime: '',
    includeTags: [],
    excludeTags: []
  });

  const templates = [
    {
      id: '1',
      name: 'Weekly Newsletter',
      content: 'Here\'s your weekly update with the latest news and offers...',
      approved: true
    },
    {
      id: '2',
      name: 'Product Launch',
      content: 'Exciting news! We\'re launching a new product...',
      approved: true
    },
    {
      id: '3',
      name: 'Special Offer',
      content: 'Limited time offer: Get 20% off your next purchase...',
      approved: false
    }
  ];

  const audienceOptions = [
    { id: 'all', name: 'All Contacts', count: 1247 },
    { id: 'customers', name: 'Customers', count: 892 },
    { id: 'leads', name: 'Leads', count: 355 },
    { id: 'subscribers', name: 'Subscribers', count: 1180 }
  ];

  const handleInputChange = (field, value) => {
    setBroadcastData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateSelect = (template) => {
    setBroadcastData(prev => ({
      ...prev,
      selectedTemplate: template,
      message: template.content
    }));
  };

  const handleSendBroadcast = () => {
    console.log('Sending broadcast:', broadcastData);
    // Implement broadcast sending logic
  };

  const handleScheduleBroadcast = () => {
    console.log('Scheduling broadcast:', broadcastData);
    // Implement broadcast scheduling logic
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Create Broadcast</h2>
            <p className="text-sm text-text-secondary mt-1">
              Send messages to multiple contacts at once
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-text-muted hover:text-text-primary"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full">
            {/* Left Panel - Message Composition */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Message Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Campaign Name
                    </label>
                    <Input
                      value={broadcastData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter campaign name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message Content
                    </label>
                    <textarea
                      value={broadcastData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Type your message here..."
                      rows={6}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      {broadcastData.message.length}/1000 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Or Choose Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-150 ${
                        broadcastData.selectedTemplate?.id === template.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-border-muted hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{template.name}</h4>
                        {template.approved && (
                          <span className="px-2 py-1 bg-success-50 text-success text-xs rounded-full">
                            Approved
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {template.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Scheduling</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="schedule"
                        value="now"
                        checked={!broadcastData.scheduledTime}
                        onChange={() => handleInputChange('scheduledTime', '')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary">Send Now</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="schedule"
                        value="scheduled"
                        checked={!!broadcastData.scheduledTime}
                        onChange={() => handleInputChange('scheduledTime', new Date().toISOString().slice(0, 16))}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary">Schedule</span>
                    </label>
                  </div>
                  
                  {broadcastData.scheduledTime && (
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Schedule Time
                      </label>
                      <input
                        type="datetime-local"
                        value={broadcastData.scheduledTime}
                        onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Audience Selection */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Audience</h3>
                <div className="space-y-3">
                  {audienceOptions.map(option => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-150 ${
                        broadcastData.audience === option.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-border-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="audience"
                          value={option.id}
                          checked={broadcastData.audience === option.id}
                          onChange={(e) => handleInputChange('audience', e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-text-primary">{option.name}</p>
                          <p className="text-sm text-text-secondary">{option.count} contacts</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Preview</h3>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="MessageCircle" size={16} color="var(--color-primary)" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">Your Business</span>
                    </div>
                    <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm">
                        {broadcastData.message || 'Your message will appear here...'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted">
                    This is how your message will appear to recipients
                  </p>
                </div>
              </div>

              {/* Estimated Reach */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Estimated Reach</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Total Recipients</span>
                    <span className="text-sm font-medium text-text-primary">
                      {audienceOptions.find(opt => opt.id === broadcastData.audience)?.count || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Estimated Cost</span>
                    <span className="text-sm font-medium text-text-primary">IDR 25,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Ready to send to {audienceOptions.find(opt => opt.id === broadcastData.audience)?.count || 0} recipients
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            {broadcastData.scheduledTime ? (
              <Button
                variant="primary"
                onClick={handleScheduleBroadcast}
                disabled={!broadcastData.message.trim()}
                iconName="Calendar"
              >
                Schedule Broadcast
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSendBroadcast}
                disabled={!broadcastData.message.trim()}
                iconName="Send"
              >
                Send Broadcast
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastPanel;