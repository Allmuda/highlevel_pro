import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentTemplates = ({ isOpen, onClose, onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: 'Layout' },
    { id: 'promotional', name: 'Promotional', icon: 'Megaphone' },
    { id: 'educational', name: 'Educational', icon: 'BookOpen' },
    { id: 'engagement', name: 'Engagement', icon: 'MessageCircle' },
    { id: 'announcement', name: 'Announcement', icon: 'Bell' },
    { id: 'seasonal', name: 'Seasonal', icon: 'Calendar' },
    { id: 'testimonial', name: 'Testimonial', icon: 'Quote' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Product Launch',
      category: 'promotional',
      description: 'Announce new product releases with excitement',
      content: '🚀 Exciting news! We\'re thrilled to announce the launch of our latest product: [Product Name]!\n\n✨ Key features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nAvailable now at [Link]. Don\'t miss out!\n\n#ProductLaunch #Innovation #NewProduct',
      platforms: ['instagram', 'facebook', 'twitter', 'linkedin'],
      hashtags: ['#ProductLaunch', '#Innovation', '#NewProduct'],
      engagement: { likes: 245, comments: 18, shares: 32 }
    },
    {
      id: 2,
      name: 'Behind the Scenes',
      category: 'engagement',
      description: 'Show your team and work process',
      content: '👥 Behind the scenes at [Company Name]!\n\nOur amazing team is working hard to bring you the best [product/service]. Here\'s a sneak peek into our creative process.\n\nWhat would you like to see more of? Let us know in the comments!\n\n#BehindTheScenes #Team #Work',
      platforms: ['instagram', 'facebook', 'linkedin'],
      hashtags: ['#BehindTheScenes', '#Team', '#Work'],
      engagement: { likes: 189, comments: 24, shares: 12 }
    },
    {
      id: 3,
      name: 'Educational Tip',
      category: 'educational',
      description: 'Share valuable tips and insights',
      content: '💡 Pro Tip: [Insert valuable tip here]\n\nDid you know that [interesting fact or statistic]? This simple technique can help you [benefit].\n\nTry it out and let us know how it works for you!\n\n#ProTip #Education #Learning',
      platforms: ['linkedin', 'twitter', 'facebook'],
      hashtags: ['#ProTip', '#Education', '#Learning'],
      engagement: { likes: 156, comments: 31, shares: 28 }
    },
    {
      id: 4,
      name: 'Customer Testimonial',
      category: 'testimonial',
      description: 'Showcase customer success stories',
      content: '⭐ Customer Spotlight: [Customer Name]\n\n"[Customer testimonial quote]" - [Customer Name], [Company/Position]\n\nWe\'re so grateful for customers like [Customer Name] who trust us with their [needs]. Thank you for being part of our journey!\n\n#CustomerTestimonial #Success #Grateful',
      platforms: ['instagram', 'facebook', 'linkedin'],
      hashtags: ['#CustomerTestimonial', '#Success', '#Grateful'],
      engagement: { likes: 201, comments: 15, shares: 22 }
    },
    {
      id: 5,
      name: 'Question Post',
      category: 'engagement',
      description: 'Engage audience with questions',
      content: '🤔 Question of the day:\n\n[Insert engaging question related to your industry]\n\nWe\'d love to hear your thoughts! Share your answer in the comments below.\n\n#QuestionOfTheDay #Community #Discussion',
      platforms: ['instagram', 'facebook', 'twitter'],
      hashtags: ['#QuestionOfTheDay', '#Community', '#Discussion'],
      engagement: { likes: 134, comments: 67, shares: 8 }
    },
    {
      id: 6,
      name: 'Seasonal Greetings',
      category: 'seasonal',
      description: 'Holiday and seasonal posts',
      content: '🎉 Happy [Holiday/Season]!\n\nWishing you and your loved ones a wonderful [holiday/season] filled with [relevant wishes].\n\nThank you for being part of our [community/family] this year!\n\n#Happy[Holiday] #Grateful #Community',
      platforms: ['instagram', 'facebook', 'twitter', 'linkedin'],
      hashtags: ['#Holiday', '#Grateful', '#Community'],
      engagement: { likes: 289, comments: 45, shares: 56 }
    },
    {
      id: 7,
      name: 'Industry News',
      category: 'educational',
      description: 'Share relevant industry updates',
      content: '📰 Industry Update: [News headline]\n\n[Brief summary of the news and its impact]\n\nWhat are your thoughts on this development? How do you think it will affect [relevant aspect]?\n\n#IndustryNews #Update #Discussion',
      platforms: ['linkedin', 'twitter'],
      hashtags: ['#IndustryNews', '#Update', '#Discussion'],
      engagement: { likes: 167, comments: 23, shares: 34 }
    },
    {
      id: 8,
      name: 'Company Achievement',
      category: 'announcement',
      description: 'Celebrate company milestones',
      content: '🏆 Milestone Alert!\n\nWe\'re excited to announce that we\'ve reached [milestone]! This wouldn\'t have been possible without our amazing [team/customers/community].\n\nThank you for being part of our journey. Here\'s to the next milestone!\n\n#Milestone #Achievement #Grateful',
      platforms: ['instagram', 'facebook', 'linkedin'],
      hashtags: ['#Milestone', '#Achievement', '#Grateful'],
      engagement: { likes: 312, comments: 28, shares: 41 }
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg border border-border max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border-muted">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Content Templates</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-border-muted">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {templateCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-border'
                  }`}
                >
                  <Icon name={category.icon} size={14} />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="FileText" size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-muted">No templates found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className="bg-muted rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">{template.name}</h3>
                        <p className="text-sm text-text-secondary">{template.description}</p>
                      </div>
                      <span className="text-xs bg-primary-100 text-primary px-2 py-1 rounded">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-text-primary line-clamp-4">
                        {template.content.substring(0, 150)}...
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        {template.platforms.map(platformId => {
                          const platformColors = {
                            instagram: 'platform-instagram',
                            facebook: 'platform-facebook',
                            twitter: 'platform-twitter',
                            linkedin: 'platform-linkedin'
                          };
                          const platformIcons = {
                            instagram: 'Instagram',
                            facebook: 'Facebook',
                            twitter: 'Twitter',
                            linkedin: 'Linkedin'
                          };
                          return (
                            <div
                              key={platformId}
                              className={`w-5 h-5 ${platformColors[platformId]} rounded-full flex items-center justify-center`}
                            >
                              <Icon name={platformIcons[platformId]} size={12} color="white" />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-text-muted">
                        <span>{template.engagement.likes} likes</span>
                        <span>{template.engagement.comments} comments</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('Preview template:', template.id)}
                        className="flex-1"
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onApply(template)}
                        className="flex-1"
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentTemplates;