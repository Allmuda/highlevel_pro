import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ElementConfigPanel = ({ element, onElementUpdate, onClose }) => {
  const [config, setConfig] = useState(element?.config || {});

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onElementUpdate?.({ ...element, config: newConfig });
  };

  const renderConfigFields = () => {
    if (!element) return null;

    switch (element.type) {
      case 'Email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Subject Line
              </label>
              <Input
                value={config.subject || ''}
                onChange={(e) => handleConfigChange('subject', e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Content
              </label>
              <textarea
                value={config.content || ''}
                onChange={(e) => handleConfigChange('content', e.target.value)}
                placeholder="Enter email content"
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Template
              </label>
              <select
                value={config.template || ''}
                onChange={(e) => handleConfigChange('template', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select template</option>
                <option value="newsletter">Newsletter</option>
                <option value="promotional">Promotional</option>
                <option value="welcome">Welcome Email</option>
              </select>
            </div>
          </div>
        );

      case 'WhatsApp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                value={config.message || ''}
                onChange={(e) => handleConfigChange('message', e.target.value)}
                placeholder="Enter WhatsApp message"
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Template
              </label>
              <select
                value={config.template || ''}
                onChange={(e) => handleConfigChange('template', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select template</option>
                <option value="greeting">Greeting</option>
                <option value="support">Support</option>
                <option value="promotional">Promotional</option>
              </select>
            </div>
          </div>
        );

      case 'Delay':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Delay Duration
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={config.delay || ''}
                  onChange={(e) => handleConfigChange('delay', parseInt(e.target.value))}
                  placeholder="Duration"
                  className="flex-1"
                />
                <select
                  value={config.unit || 'minutes'}
                  onChange={(e) => handleConfigChange('unit', e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'Condition':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Condition Type
              </label>
              <select
                value={config.conditionType || ''}
                onChange={(e) => handleConfigChange('conditionType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select condition</option>
                <option value="tag">Has Tag</option>
                <option value="field">Custom Field</option>
                <option value="behavior">Behavior</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Condition Value
              </label>
              <Input
                value={config.conditionValue || ''}
                onChange={(e) => handleConfigChange('conditionValue', e.target.value)}
                placeholder="Enter condition value"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Icon name="Settings" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">
              Configuration options for {element.type} will appear here
            </p>
          </div>
        );
    }
  };

  if (!element) {
    return (
      <div className="w-80 bg-surface border-l border-border p-6">
        <div className="text-center py-8">
          <Icon name="MousePointer" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">Select an Element</h3>
          <p className="text-text-secondary">
            Click on a campaign element to configure its settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-surface border-l border-border p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} />
          <h3 className="text-lg font-medium text-text-primary">Configure</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
          className="text-text-muted hover:text-text-primary"
        />
      </div>

      {/* Element Info */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Mail" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">{element.type}</h4>
            <p className="text-sm text-text-secondary">Campaign element</p>
          </div>
        </div>
      </div>

      {/* Configuration Fields */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Settings</h4>
          {renderConfigFields()}
        </div>

        {/* Targeting Options */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Audience Targeting</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Target Audience
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Contacts</option>
                <option>Subscribers</option>
                <option>Customers</option>
                <option>Custom Segment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tags
              </label>
              <Input placeholder="Add tags..." />
            </div>
          </div>
        </div>

        {/* Scheduling */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Scheduling</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Send Time
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Immediately</option>
                <option>Optimal Time</option>
                <option>Specific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm" fullWidth>
            Test
          </Button>
          <Button variant="primary" size="sm" fullWidth>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElementConfigPanel;