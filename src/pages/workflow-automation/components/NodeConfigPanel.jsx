import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NodeConfigPanel = ({ node, onNodeUpdate, onClose, className = '' }) => {
  const [config, setConfig] = useState(node?.config || {});
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    if (node) {
      setConfig(node.config || {});
    }
  }, [node]);

  if (!node) {
    return (
      <div className={`bg-surface border-l border-border p-6 ${className}`}>
        <div className="text-center">
          <Icon name="Settings" size={32} className="mx-auto text-text-muted mb-3" />
          <h3 className="font-medium text-text-primary mb-2">No Node Selected</h3>
          <p className="text-sm text-text-secondary">Select a node to configure its settings</p>
        </div>
      </div>
    );
  }

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onNodeUpdate(node.id, { ...node, config: newConfig });
  };

  const getNodeTypeColor = (type) => {
    const colors = {
      triggers: 'text-success',
      actions: 'text-primary',
      logic: 'text-accent',
      integrations: 'text-secondary'
    };
    return colors[type] || 'text-text-primary';
  };

  const renderTriggerConfig = () => {
    switch (node.nodeId) {
      case 'form-submission':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Form Selection</label>
              <select 
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary"
                value={config.formId || ''}
                onChange={(e) => handleConfigChange('formId', e.target.value)}
              >
                <option value="">Select a form</option>
                <option value="contact-form">Contact Form</option>
                <option value="newsletter-signup">Newsletter Signup</option>
                <option value="demo-request">Demo Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Trigger Conditions</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={config.requireEmail || false}
                    onChange={(e) => handleConfigChange('requireEmail', e.target.checked)}
                  />
                  <span className="text-sm text-text-secondary">Require email field</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={config.validatePhone || false}
                    onChange={(e) => handleConfigChange('validatePhone', e.target.checked)}
                  />
                  <span className="text-sm text-text-secondary">Validate phone number</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Schedule Type</label>
              <select 
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary"
                value={config.scheduleType || 'once'}
                onChange={(e) => handleConfigChange('scheduleType', e.target.value)}
              >
                <option value="once">Run Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Date & Time</label>
              <Input
                type="datetime-local"
                value={config.scheduledTime || ''}
                onChange={(e) => handleConfigChange('scheduledTime', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-4">
            <p className="text-sm text-text-secondary">No specific configuration available</p>
          </div>
        );
    }
  };

  const renderActionConfig = () => {
    switch (node.nodeId) {
      case 'send-email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email Template</label>
              <select 
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary"
                value={config.templateId || ''}
                onChange={(e) => handleConfigChange('templateId', e.target.value)}
              >
                <option value="">Select template</option>
                <option value="welcome">Welcome Email</option>
                <option value="follow-up">Follow-up Email</option>
                <option value="newsletter">Newsletter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Subject Line</label>
              <Input
                type="text"
                placeholder="Enter email subject"
                value={config.subject || ''}
                onChange={(e) => handleConfigChange('subject', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Sender Name</label>
              <Input
                type="text"
                placeholder="Your Name"
                value={config.senderName || ''}
                onChange={(e) => handleConfigChange('senderName', e.target.value)}
              />
            </div>
          </div>
        );
      case 'send-whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Message Template</label>
              <select 
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary"
                value={config.templateId || ''}
                onChange={(e) => handleConfigChange('templateId', e.target.value)}
              >
                <option value="">Select template</option>
                <option value="welcome-wa">Welcome Message</option>
                <option value="reminder-wa">Reminder Message</option>
                <option value="promotion-wa">Promotion Message</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Message Text</label>
              <textarea
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary h-24 resize-none"
                placeholder="Enter your WhatsApp message"
                value={config.message || ''}
                onChange={(e) => handleConfigChange('message', e.target.value)}
              />
            </div>
          </div>
        );
      case 'update-contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Fields to Update</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={config.updateName || false}
                    onChange={(e) => handleConfigChange('updateName', e.target.checked)}
                  />
                  <span className="text-sm text-text-secondary">Name</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={config.updateEmail || false}
                    onChange={(e) => handleConfigChange('updateEmail', e.target.checked)}
                  />
                  <span className="text-sm text-text-secondary">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={config.updatePhone || false}
                    onChange={(e) => handleConfigChange('updatePhone', e.target.checked)}
                  />
                  <span className="text-sm text-text-secondary">Phone</span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-4">
            <p className="text-sm text-text-secondary">No specific configuration available</p>
          </div>
        );
    }
  };

  const renderLogicConfig = () => {
    switch (node.nodeId) {
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Condition Type</label>
              <select 
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary"
                value={config.conditionType || 'equals'}
                onChange={(e) => handleConfigChange('conditionType', e.target.value)}
              >
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
                <option value="exists">Field Exists</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Field to Check</label>
              <Input
                type="text"
                placeholder="e.g., email, name, phone"
                value={config.field || ''}
                onChange={(e) => handleConfigChange('field', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Value to Compare</label>
              <Input
                type="text"
                placeholder="Enter comparison value"
                value={config.value || ''}
                onChange={(e) => handleConfigChange('value', e.target.value)}
              />
            </div>
          </div>
        );
      case 'delay':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Delay Duration</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={config.delayAmount || ''}
                  onChange={(e) => handleConfigChange('delayAmount', e.target.value)}
                  className="flex-1"
                />
                <select 
                  className="p-2 border border-border rounded-lg bg-surface text-text-primary"
                  value={config.delayUnit || 'minutes'}
                  onChange={(e) => handleConfigChange('delayUnit', e.target.value)}
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-4">
            <p className="text-sm text-text-secondary">No specific configuration available</p>
          </div>
        );
    }
  };

  const renderIntegrationConfig = () => {
    switch (node.nodeId) {
      case 'gopay': case'ovo': case'dana':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Payment Amount</label>
              <div className="flex space-x-2">
                <span className="p-2 bg-muted border border-border rounded-lg text-text-secondary">IDR</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={config.amount || ''}
                  onChange={(e) => handleConfigChange('amount', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
              <Input
                type="text"
                placeholder="Payment description"
                value={config.description || ''}
                onChange={(e) => handleConfigChange('description', e.target.value)}
              />
            </div>
          </div>
        );
      case 'google-sheets':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Spreadsheet ID</label>
              <Input
                type="text"
                placeholder="Enter Google Sheets ID"
                value={config.spreadsheetId || ''}
                onChange={(e) => handleConfigChange('spreadsheetId', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Sheet Name</label>
              <Input
                type="text"
                placeholder="Sheet1"
                value={config.sheetName || ''}
                onChange={(e) => handleConfigChange('sheetName', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-4">
            <p className="text-sm text-text-secondary">No specific configuration available</p>
          </div>
        );
    }
  };

  const renderConfigContent = () => {
    switch (node.type) {
      case 'triggers':
        return renderTriggerConfig();
      case 'actions':
        return renderActionConfig();
      case 'logic':
        return renderLogicConfig();
      case 'integrations':
        return renderIntegrationConfig();
      default:
        return (
          <div className="text-center py-4">
            <p className="text-sm text-text-secondary">No configuration available</p>
          </div>
        );
    }
  };

  const tabs = [
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'data', label: 'Data Mapping', icon: 'Database' },
    { id: 'testing', label: 'Testing', icon: 'Play' }
  ];

  return (
    <div className={`bg-surface border-l border-border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name={node.icon} size={18} className={getNodeTypeColor(node.type)} />
            <h3 className="font-semibold text-text-primary">{node.label}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>
        <p className="text-sm text-text-secondary">{node.description}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        {activeTab === 'settings' && renderConfigContent()}
        
        {activeTab === 'data' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Available Fields</h4>
              <div className="space-y-2">
                <div className="p-2 bg-muted rounded border text-sm">
                  <span className="font-medium">contact.email</span>
                  <span className="text-text-muted ml-2">Contact's email address</span>
                </div>
                <div className="p-2 bg-muted rounded border text-sm">
                  <span className="font-medium">contact.name</span>
                  <span className="text-text-muted ml-2">Contact's full name</span>
                </div>
                <div className="p-2 bg-muted rounded border text-sm">
                  <span className="font-medium">contact.phone</span>
                  <span className="text-text-muted ml-2">Contact's phone number</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'testing' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Test Configuration</h4>
              <p className="text-sm text-text-secondary mb-4">
                Test this node with sample data to ensure it works correctly.
              </p>
              <Button variant="primary" size="sm" iconName="Play">
                Run Test
              </Button>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <h5 className="font-medium text-text-primary mb-2">Test Results</h5>
              <p className="text-sm text-text-secondary">No test results yet. Run a test to see output.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeConfigPanel;