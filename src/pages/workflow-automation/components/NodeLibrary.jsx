import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NodeLibrary = ({ onDragStart, className = '' }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    triggers: true,
    actions: true,
    logic: true,
    integrations: false
  });

  const nodeCategories = [
    {
      id: 'triggers',
      label: 'Triggers',
      icon: 'Play',
      color: 'text-success',
      nodes: [
        { id: 'form-submission', label: 'Form Submission', icon: 'FileText', description: 'Triggered when a form is submitted' },
        { id: 'new-contact', label: 'New Contact', icon: 'UserPlus', description: 'Triggered when a new contact is added' },
        { id: 'payment-received', label: 'Payment Received', icon: 'CreditCard', description: 'Triggered when payment is processed' },
        { id: 'email-opened', label: 'Email Opened', icon: 'Mail', description: 'Triggered when email is opened' },
        { id: 'webhook', label: 'Webhook', icon: 'Globe', description: 'Triggered by external webhook' },
        { id: 'schedule', label: 'Schedule', icon: 'Clock', description: 'Triggered at specific times' }
      ]
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: 'Zap',
      color: 'text-primary',
      nodes: [
        { id: 'send-email', label: 'Send Email', icon: 'Mail', description: 'Send automated email' },
        { id: 'send-sms', label: 'Send SMS', icon: 'MessageSquare', description: 'Send SMS message' },
        { id: 'send-whatsapp', label: 'Send WhatsApp', icon: 'MessageCircle', description: 'Send WhatsApp message' },
        { id: 'update-contact', label: 'Update Contact', icon: 'UserCheck', description: 'Update contact information' },
        { id: 'create-task', label: 'Create Task', icon: 'CheckSquare', description: 'Create a new task' },
        { id: 'add-tag', label: 'Add Tag', icon: 'Tag', description: 'Add tag to contact' },
        { id: 'create-deal', label: 'Create Deal', icon: 'DollarSign', description: 'Create sales opportunity' },
        { id: 'send-notification', label: 'Send Notification', icon: 'Bell', description: 'Send internal notification' }
      ]
    },
    {
      id: 'logic',
      label: 'Logic & Flow',
      icon: 'GitBranch',
      color: 'text-accent',
      nodes: [
        { id: 'condition', label: 'Condition', icon: 'GitBranch', description: 'Branch workflow based on conditions' },
        { id: 'delay', label: 'Delay', icon: 'Clock', description: 'Wait for specified time' },
        { id: 'loop', label: 'Loop', icon: 'RotateCcw', description: 'Repeat actions multiple times' },
        { id: 'filter', label: 'Filter', icon: 'Filter', description: 'Filter data based on criteria' },
        { id: 'merge', label: 'Merge', icon: 'Merge', description: 'Combine multiple workflow paths' },
        { id: 'split', label: 'Split', icon: 'Split', description: 'Split workflow into multiple paths' }
      ]
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Plug',
      color: 'text-secondary',
      nodes: [
        { id: 'google-sheets', label: 'Google Sheets', icon: 'FileSpreadsheet', description: 'Connect to Google Sheets' },
        { id: 'facebook-ads', label: 'Facebook Ads', icon: 'Facebook', description: 'Manage Facebook advertising' },
        { id: 'instagram', label: 'Instagram', icon: 'Instagram', description: 'Post to Instagram' },
        { id: 'gopay', label: 'GoPay', icon: 'Smartphone', description: 'Process GoPay payments' },
        { id: 'ovo', label: 'OVO', icon: 'Wallet', description: 'Process OVO payments' },
        { id: 'dana', label: 'DANA', icon: 'CreditCard', description: 'Process DANA payments' },
        { id: 'bca', label: 'BCA Bank', icon: 'Building', description: 'Connect to BCA banking' },
        { id: 'bri', label: 'BRI Bank', icon: 'Building2', description: 'Connect to BRI banking' }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleDragStart = (e, node, category) => {
    const dragData = {
      type: 'node',
      nodeType: category,
      nodeId: node.id,
      label: node.label,
      icon: node.icon,
      description: node.description
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    onDragStart && onDragStart(dragData);
  };

  return (
    <div className={`bg-surface border-r border-border h-full overflow-y-auto ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Layers" size={18} />
          <span>Node Library</span>
        </h3>
        <p className="text-sm text-text-secondary mt-1">Drag nodes to canvas</p>
      </div>

      <div className="p-2">
        {nodeCategories.map((category) => (
          <div key={category.id} className="mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCategory(category.id)}
              className="w-full justify-between text-left p-2 hover:bg-muted"
            >
              <div className="flex items-center space-x-2">
                <Icon name={category.icon} size={16} className={category.color} />
                <span className="font-medium text-text-primary">{category.label}</span>
                <span className="text-xs text-text-muted">({category.nodes.length})</span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className={`transition-transform duration-150 ${expandedCategories[category.id] ? 'rotate-180' : ''}`} 
              />
            </Button>

            {expandedCategories[category.id] && (
              <div className="ml-2 mt-1 space-y-1">
                {category.nodes.map((node) => (
                  <div
                    key={node.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, node, category.id)}
                    className="p-2 rounded-lg border border-border hover:border-primary-200 hover:bg-primary-50 cursor-grab active:cursor-grabbing transition-all duration-150 group"
                  >
                    <div className="flex items-start space-x-2">
                      <Icon name={node.icon} size={14} className="mt-0.5 text-text-secondary group-hover:text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary group-hover:text-primary">{node.label}</p>
                        <p className="text-xs text-text-muted line-clamp-2">{node.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border mt-4">
        <Button variant="outline" size="sm" fullWidth iconName="Plus">
          Request Integration
        </Button>
      </div>
    </div>
  );
};

export default NodeLibrary;