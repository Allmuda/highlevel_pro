import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignTemplates = ({ onTemplateSelect, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'welcome-series',
      name: 'Welcome Series',
      description: 'Onboard new subscribers with a 3-email welcome sequence',
      category: 'email',
      icon: 'Mail',
      elements: 5,
      estimated_time: '3 days',
      preview: '/api/templates/welcome-series/preview'
    },
    {
      id: 'abandoned-cart',
      name: 'Abandoned Cart Recovery',
      description: 'Re-engage customers who left items in their cart',
      category: 'ecommerce',
      icon: 'ShoppingCart',
      elements: 4,
      estimated_time: '24 hours',
      preview: '/api/templates/abandoned-cart/preview'
    },
    {
      id: 'lead-nurturing',
      name: 'Lead Nurturing',
      description: 'Convert leads into customers with educational content',
      category: 'sales',
      icon: 'Target',
      elements: 7,
      estimated_time: '2 weeks',
      preview: '/api/templates/lead-nurturing/preview'
    },
    {
      id: 'birthday-campaign',
      name: 'Birthday Campaign',
      description: 'Celebrate customer birthdays with personalized offers',
      category: 'engagement',
      icon: 'Gift',
      elements: 3,
      estimated_time: 'Annual',
      preview: '/api/templates/birthday-campaign/preview'
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      description: 'Announce new products with multi-channel campaign',
      category: 'marketing',
      icon: 'Rocket',
      elements: 6,
      estimated_time: '1 week',
      preview: '/api/templates/product-launch/preview'
    },
    {
      id: 'customer-feedback',
      name: 'Customer Feedback',
      description: 'Collect reviews and feedback from customers',
      category: 'engagement',
      icon: 'MessageSquare',
      elements: 4,
      estimated_time: '3 days',
      preview: '/api/templates/customer-feedback/preview'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid' },
    { id: 'email', name: 'Email', icon: 'Mail' },
    { id: 'ecommerce', name: 'E-commerce', icon: 'ShoppingCart' },
    { id: 'sales', name: 'Sales', icon: 'Target' },
    { id: 'engagement', name: 'Engagement', icon: 'Heart' },
    { id: 'marketing', name: 'Marketing', icon: 'Megaphone' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onTemplateSelect?.(selectedTemplate);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Campaign Templates</h2>
            <p className="text-sm text-text-secondary mt-1">
              Choose from pre-built templates to get started quickly
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
          <div className="w-64 border-r border-border p-4 overflow-y-auto">
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

          {/* Templates Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`bg-surface border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary shadow-lg'
                      : 'border-border hover:border-border-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Icon name={template.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <div className="text-xs text-text-muted">
                      {template.elements} elements
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-text-primary mb-2">{template.name}</h3>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">{template.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{template.estimated_time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>Preview</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {selectedTemplate ? `Selected: ${selectedTemplate.name}` : 'Select a template to continue'}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUseTemplate}
              disabled={!selectedTemplate}
            >
              Use Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTemplates;