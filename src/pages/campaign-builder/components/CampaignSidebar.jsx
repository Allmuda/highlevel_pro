import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CampaignSidebar = ({ onElementDragStart }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    triggers: true,
    channels: true,
    content: true,
    logic: true
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(element));
    onElementDragStart?.(element);
  };

  const campaignElements = {
    triggers: [
      {
        type: 'Form Submit',
        icon: 'FileText',
        description: 'Trigger when form is submitted',
        config: { formId: null }
      },
      {
        type: 'Date Trigger',
        icon: 'Calendar',
        description: 'Schedule based trigger',
        config: { date: null, time: null }
      },
      {
        type: 'Behavior',
        icon: 'Activity',
        description: 'User behavior based trigger',
        config: { behavior: null }
      }
    ],
    channels: [
      {
        type: 'Email',
        icon: 'Mail',
        description: 'Send email campaign',
        config: { subject: '', content: '', template: null }
      },
      {
        type: 'WhatsApp',
        icon: 'MessageCircle',
        description: 'Send WhatsApp message',
        config: { message: '', template: null }
      },
      {
        type: 'SMS',
        icon: 'MessageSquare',
        description: 'Send SMS message',
        config: { message: '' }
      },
      {
        type: 'Social Media',
        icon: 'Share2',
        description: 'Post to social platforms',
        config: { platforms: [], content: '' }
      }
    ],
    content: [
      {
        type: 'Text Block',
        icon: 'Type',
        description: 'Add text content',
        config: { content: '' }
      },
      {
        type: 'Image',
        icon: 'Image',
        description: 'Add image content',
        config: { src: null, alt: '' }
      },
      {
        type: 'Video',
        icon: 'Video',
        description: 'Add video content',
        config: { src: null, thumbnail: null }
      }
    ],
    logic: [
      {
        type: 'Condition',
        icon: 'GitBranch',
        description: 'Conditional logic gate',
        config: { condition: null }
      },
      {
        type: 'Delay',
        icon: 'Clock',
        description: 'Add time delay',
        config: { delay: 0, unit: 'minutes' }
      },
      {
        type: 'A/B Test',
        icon: 'Split',
        description: 'Split test audience',
        config: { variants: [] }
      }
    ]
  };

  const renderCategory = (categoryKey, categoryName, elements) => {
    const isExpanded = expandedCategories[categoryKey];
    
    return (
      <div key={categoryKey} className="mb-4">
        <button
          onClick={() => toggleCategory(categoryKey)}
          className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-border transition-colors duration-150"
        >
          <div className="flex items-center space-x-2">
            <Icon name={getCategoryIcon(categoryKey)} size={16} />
            <span className="font-medium text-text-primary">{categoryName}</span>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-muted"
          />
        </button>
        
        {isExpanded && (
          <div className="mt-2 space-y-2">
            {elements.map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, element)}
                className="flex items-center p-3 bg-surface border border-border rounded-lg hover:border-border-muted cursor-move transition-all duration-150 hover:shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mr-3">
                  <Icon name={element.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{element.type}</p>
                  <p className="text-xs text-text-secondary truncate">{element.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      triggers: 'Zap',
      channels: 'Send',
      content: 'FileText',
      logic: 'GitBranch'
    };
    return icons[category] || 'Circle';
  };

  return (
    <div className="w-full h-full bg-surface border-r border-border p-4 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Campaign Elements</h3>
        <p className="text-sm text-text-secondary">
          Drag elements to the canvas to build your campaign flow
        </p>
      </div>

      <div className="space-y-1">
        {renderCategory('triggers', 'Triggers', campaignElements.triggers)}
        {renderCategory('channels', 'Channels', campaignElements.channels)}
        {renderCategory('content', 'Content Blocks', campaignElements.content)}
        {renderCategory('logic', 'Logic Gates', campaignElements.logic)}
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="text-sm font-medium text-primary mb-2">Quick Tips</h4>
        <ul className="text-xs text-primary space-y-1">
          <li>• Connect elements to create flow</li>
          <li>• Use conditions for branching</li>
          <li>• Add delays for timing</li>
          <li>• Test with A/B variants</li>
        </ul>
      </div>
    </div>
  );
};

export default CampaignSidebar;