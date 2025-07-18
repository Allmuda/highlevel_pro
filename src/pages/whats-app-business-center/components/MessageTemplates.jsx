import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessageTemplates = ({ onTemplateSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: '1',
      name: 'Welcome Message',
      content: 'Hi {{name}}! Welcome to our service. How can I help you today?',
      category: 'greeting',
      variables: ['name'],
      approved: true
    },
    {
      id: '2',
      name: 'Order Confirmation',
      content: 'Your order #{{order_id}} has been confirmed. Total: {{amount}}. Expected delivery: {{date}}.',
      category: 'transactional',
      variables: ['order_id', 'amount', 'date'],
      approved: true
    },
    {
      id: '3',
      name: 'Support Response',
      content: 'Thank you for contacting support. We\'ve received your inquiry and will respond within 24 hours.',
      category: 'support',
      variables: [],
      approved: true
    },
    {
      id: '4',
      name: 'Promotional Offer',
      content: 'Special offer for you! Get {{discount}}% off your next purchase. Use code: {{code}}',
      category: 'promotional',
      variables: ['discount', 'code'],
      approved: false
    },
    {
      id: '5',
      name: 'Appointment Reminder',
      content: 'Reminder: Your appointment is scheduled for {{date}} at {{time}}. Please confirm or reschedule.',
      category: 'reminder',
      variables: ['date', 'time'],
      approved: true
    },
    {
      id: '6',
      name: 'Thank You',
      content: 'Thank you for your business! We appreciate your trust in our services.',
      category: 'greeting',
      variables: [],
      approved: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'FileText' },
    { id: 'greeting', name: 'Greeting', icon: 'MessageCircle' },
    { id: 'transactional', name: 'Transactional', icon: 'Receipt' },
    { id: 'support', name: 'Support', icon: 'HeadphonesIcon' },
    { id: 'promotional', name: 'Promotional', icon: 'Tag' },
    { id: 'reminder', name: 'Reminder', icon: 'Clock' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    onTemplateSelect?.(template);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl h-4/5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Message Templates</h2>
            <p className="text-sm text-text-secondary mt-1">
              Select from approved business templates
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

        <div className="flex flex-1 overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-56 border-r border-border p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-text-primary mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                    selectedCategory === category.id
                      ? 'bg-primary-50 text-primary' :'text-text-secondary hover:bg-muted hover:text-text-primary'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Templates Content */}
          <div className="flex-1 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Templates List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {filteredTemplates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="p-4 border border-border rounded-lg cursor-pointer hover:border-border-muted hover:shadow-sm transition-all duration-150"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-text-primary">{template.name}</h3>
                        {template.approved && (
                          <span className="px-2 py-1 bg-success-50 text-success text-xs rounded-full">
                            Approved
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        className="text-text-muted hover:text-text-primary"
                      />
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {template.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-muted capitalize">
                          {template.category}
                        </span>
                        {template.variables.length > 0 && (
                          <span className="text-xs text-text-muted">
                            • {template.variables.length} variables
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit3"
                          className="text-text-muted hover:text-text-primary"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Copy"
                          className="text-text-muted hover:text-text-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {filteredTemplates.length} templates found
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              iconName="Plus"
            >
              New Template
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTemplates;