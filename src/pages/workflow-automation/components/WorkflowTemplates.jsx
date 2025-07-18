import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WorkflowTemplates = ({ onTemplateSelect, onClose, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', icon: 'Grid3x3' },
    { id: 'lead-generation', label: 'Lead Generation', icon: 'Users' },
    { id: 'email-marketing', label: 'Email Marketing', icon: 'Mail' },
    { id: 'customer-service', label: 'Customer Service', icon: 'MessageCircle' },
    { id: 'sales', label: 'Sales', icon: 'DollarSign' },
    { id: 'social-media', label: 'Social Media', icon: 'Share2' }
  ];

  const templates = [
    {
      id: 'welcome-sequence',
      name: 'Welcome Email Sequence',
      description: 'Automatically send a series of welcome emails to new subscribers',
      category: 'email-marketing',
      icon: 'Mail',
      color: 'text-primary',
      triggers: ['New Contact'],
      actions: ['Send Email', 'Add Tag', 'Update Contact'],
      estimatedTime: '5 minutes',
      popularity: 95,
      preview: 'New Contact → Wait 1 hour → Send Welcome Email → Wait 2 days → Send Follow-up Email'
    },
    {
      id: 'lead-nurturing',
      name: 'Lead Nurturing Campaign',
      description: 'Nurture leads through personalized email sequences based on their behavior',
      category: 'lead-generation',
      icon: 'Users',
      color: 'text-success',
      triggers: ['Form Submission', 'Tag Added'],
      actions: ['Send Email', 'Create Task', 'Update CRM'],
      estimatedTime: '8 minutes',
      popularity: 88,
      preview: 'Form Submission → Check Lead Score → Send Personalized Email → Create Follow-up Task'
    },
    {
      id: 'payment-follow-up',
      name: 'Payment Follow-up',
      description: 'Automatically follow up on failed payments and send receipts for successful ones',
      category: 'sales',
      icon: 'CreditCard',
      color: 'text-accent',
      triggers: ['Payment Received', 'Payment Failed'],
      actions: ['Send Email', 'Send WhatsApp', 'Update Contact'],
      estimatedTime: '6 minutes',
      popularity: 92,
      preview: 'Payment Event → Check Status → Send Receipt/Reminder → Update Customer Record'
    },
    {
      id: 'social-media-posting',
      name: 'Social Media Scheduler',
      description: 'Schedule and post content across multiple social media platforms',
      category: 'social-media',
      icon: 'Share2',
      color: 'text-secondary',
      triggers: ['Schedule', 'Content Approved'],
      actions: ['Post to Facebook', 'Post to Instagram', 'Post to LinkedIn'],
      estimatedTime: '4 minutes',
      popularity: 76,
      preview: 'Schedule Trigger → Check Content → Post to Platforms → Track Engagement'
    },
    {
      id: 'customer-support',
      name: 'Customer Support Ticket',
      description: 'Automatically create and assign support tickets from customer inquiries',
      category: 'customer-service',
      icon: 'MessageCircle',
      color: 'text-warning',
      triggers: ['Form Submission', 'Email Received'],
      actions: ['Create Ticket', 'Assign Agent', 'Send Confirmation'],
      estimatedTime: '7 minutes',
      popularity: 84,
      preview: 'Customer Inquiry → Create Ticket → Assign to Agent → Send Confirmation Email'
    },
    {
      id: 'abandoned-cart',
      name: 'Abandoned Cart Recovery',
      description: 'Recover abandoned carts with automated email and WhatsApp reminders',
      category: 'sales',
      icon: 'ShoppingCart',
      color: 'text-error',
      triggers: ['Cart Abandoned'],
      actions: ['Send Email', 'Send WhatsApp', 'Offer Discount'],
      estimatedTime: '5 minutes',
      popularity: 89,
      preview: 'Cart Abandoned → Wait 1 hour → Send Reminder → Wait 1 day → Send Discount Offer'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
    onClose();
  };

  return (
    <div className={`bg-surface ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Workflow Templates</h2>
            <p className="text-sm text-text-secondary mt-1">Choose a template to get started quickly</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex h-full">
        {/* Categories Sidebar */}
        <div className="w-64 border-r border-border p-4">
          <h3 className="font-medium text-text-primary mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                  selectedCategory === category.id
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={category.icon} size={16} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-surface border border-border rounded-lg p-6 hover:border-primary-200 hover:shadow-md transition-all duration-150 cursor-pointer group"
                  onClick={() => handleTemplateSelect(template)}
                >
                  {/* Template Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${template.color}`}>
                        <Icon name={template.icon} size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-150">
                          {template.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-text-muted">Popularity: {template.popularity}%</span>
                          <span className="text-xs text-text-muted">•</span>
                          <span className="text-xs text-text-muted">{template.estimatedTime} setup</span>
                        </div>
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary transition-colors duration-150" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary mb-4">{template.description}</p>

                  {/* Preview Flow */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">Workflow Preview</h4>
                    <p className="text-xs text-text-secondary bg-muted p-2 rounded font-mono">{template.preview}</p>
                  </div>

                  {/* Components */}
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">Triggers</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.triggers.map((trigger, index) => (
                          <span key={index} className="px-2 py-1 bg-success-100 text-success-600 text-xs rounded-full">
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">Actions</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.actions.map((action, index) => (
                          <span key={index} className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Search" size={32} className="mx-auto text-text-muted mb-3" />
              <h3 className="font-medium text-text-primary mb-2">No templates found</h3>
              <p className="text-text-secondary">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Can't find what you're looking for?{' '}
            <button className="text-primary hover:text-primary-600 font-medium">
              Request a custom template
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Start from Scratch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTemplates;