import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactDetailModal = ({ contact, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(contact || {});

  if (!isOpen || !contact) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'deals', label: 'Deals', icon: 'DollarSign' },
    { id: 'sentiment', label: 'AI Insights', icon: 'Brain' }
  ];

  const interactions = [
    {
      id: 1,
      type: 'email',
      title: 'Welcome Email Sent',
      description: 'Automated welcome email delivered successfully',
      timestamp: new Date(Date.now() - 3600000),
      status: 'delivered'
    },
    {
      id: 2,
      type: 'whatsapp',
      title: 'WhatsApp Message',
      description: 'Follow-up message about product demo',
      timestamp: new Date(Date.now() - 7200000),
      status: 'read'
    },
    {
      id: 3,
      type: 'call',
      title: 'Phone Call',
      description: 'Initial consultation call - 25 minutes',
      timestamp: new Date(Date.now() - 86400000),
      status: 'completed'
    }
  ];

  const deals = [
    {
      id: 1,
      title: 'Enterprise Package',
      value: 15000000,
      stage: 'proposal',
      probability: 75,
      closeDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'Additional Services',
      value: 5000000,
      stage: 'negotiation',
      probability: 60,
      closeDate: '2024-02-28'
    }
  ];

  const sentimentData = {
    overall: 'positive',
    score: 78,
    insights: [
      'Customer shows high engagement with email campaigns',
      'Positive sentiment in recent WhatsApp conversations',
      'Interested in premium features based on interaction patterns'
    ],
    churnRisk: 'low',
    nextBestAction: 'Schedule product demo call'
  };

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'delivered': 'text-success',
      'read': 'text-primary',
      'completed': 'text-success',
      'pending': 'text-warning',
      'failed': 'text-error'
    };
    return colors[status] || 'text-text-muted';
  };

  const getSentimentColor = (sentiment) => {
    const colors = {
      'positive': 'text-success',
      'neutral': 'text-warning',
      'negative': 'text-error'
    };
    return colors[sentiment] || 'text-text-muted';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {contact.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{contact.name}</h2>
              <p className="text-text-secondary">{contact.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={editMode ? "primary" : "outline"}
              size="sm"
              onClick={editMode ? handleSave : () => setEditMode(true)}
              iconName={editMode ? "Save" : "Edit"}
            >
              {editMode ? 'Save' : 'Edit'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                  {editMode ? (
                    <Input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-secondary">{contact.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  {editMode ? (
                    <Input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-secondary">{contact.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                  {editMode ? (
                    <Input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-secondary">{contact.phone || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Company</label>
                  {editMode ? (
                    <Input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-secondary">{contact.company}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Position</label>
                  {editMode ? (
                    <Input
                      type="text"
                      value={formData.position || ''}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-secondary">{contact.position}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Industry</label>
                  {editMode ? (
                    <select
                      value={formData.industry || ''}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  ) : (
                    <p className="text-text-secondary">{contact.industry}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Target" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">Lead Score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${contact.leadScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-primary">{contact.leadScore}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} className="text-success" />
                    <span className="text-sm font-medium text-text-primary">Last Contact</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {new Date(contact.lastInteraction).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Activity" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">Status</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contact.status === 'active' ? 'bg-success-100 text-success-600' :
                    contact.status === 'inactive' ? 'bg-secondary-100 text-secondary-600' :
                    contact.status === 'pending'? 'bg-warning-100 text-warning-600' : 'bg-error-100 text-error-600'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Interaction History</h3>
                <Button variant="outline" size="sm" iconName="Plus">
                  Add Activity
                </Button>
              </div>
              
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      interaction.type === 'email' ? 'bg-primary-100' :
                      interaction.type === 'whatsapp'? 'bg-success-100' : 'bg-warning-100'
                    }`}>
                      <Icon 
                        name={interaction.type === 'email' ? 'Mail' : interaction.type === 'whatsapp' ? 'MessageSquare' : 'Phone'} 
                        size={16} 
                        className={
                          interaction.type === 'email' ? 'text-primary' :
                          interaction.type === 'whatsapp'? 'text-success' : 'text-warning'
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-text-primary">{interaction.title}</h4>
                        <span className={`text-sm ${getStatusColor(interaction.status)}`}>
                          {interaction.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{interaction.description}</p>
                      <p className="text-xs text-text-muted mt-2">
                        {interaction.timestamp.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Deal Pipeline</h3>
                <Button variant="outline" size="sm" iconName="Plus">
                  Add Deal
                </Button>
              </div>
              
              <div className="space-y-4">
                {deals.map((deal) => (
                  <div key={deal.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-text-primary">{deal.title}</h4>
                      <span className="text-lg font-semibold text-success">
                        {formatCurrency(deal.value)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">Stage:</span>
                        <p className="font-medium text-text-primary capitalize">{deal.stage}</p>
                      </div>
                      <div>
                        <span className="text-text-muted">Probability:</span>
                        <p className="font-medium text-text-primary">{deal.probability}%</p>
                      </div>
                      <div>
                        <span className="text-text-muted">Close Date:</span>
                        <p className="font-medium text-text-primary">{deal.closeDate}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-secondary-100 rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full"
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sentiment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Heart" size={16} className={getSentimentColor(sentimentData.overall)} />
                    <span className="font-medium text-text-primary">Overall Sentiment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-2xl font-bold capitalize ${getSentimentColor(sentimentData.overall)}`}>
                      {sentimentData.overall}
                    </span>
                    <div className="flex-1">
                      <div className="w-full bg-secondary-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            sentimentData.overall === 'positive' ? 'bg-success' :
                            sentimentData.overall === 'neutral'? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${sentimentData.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-text-muted">Score: {sentimentData.score}/100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="font-medium text-text-primary">Churn Risk</span>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    sentimentData.churnRisk === 'low' ? 'bg-success-100 text-success-600' :
                    sentimentData.churnRisk === 'medium'? 'bg-warning-100 text-warning-600' : 'bg-error-100 text-error-600'
                  }`}>
                    {sentimentData.churnRisk} risk
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">AI Insights</h4>
                <div className="space-y-2">
                  {sentimentData.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-muted rounded-lg">
                      <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                      <p className="text-sm text-text-secondary">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="font-medium text-primary">Next Best Action</span>
                </div>
                <p className="text-sm text-text-secondary">{sentimentData.nextBestAction}</p>
                <Button variant="primary" size="sm" className="mt-3" iconName="ArrowRight">
                  Take Action
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        <div className="border-t border-border p-4 bg-muted">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Mail">
                Send Email
              </Button>
              <Button variant="outline" size="sm" iconName="MessageSquare">
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" iconName="Phone">
                Call
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Calendar">
                Schedule Meeting
              </Button>
              <Button variant="ghost" size="sm" iconName="FileText">
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailModal;