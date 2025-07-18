import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactProfile = ({ contact, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState(contact || {});

  const handleSave = () => {
    // Save contact changes
    setIsEditing(false);
    console.log('Saving contact:', editedContact);
  };

  const handleInputChange = (field, value) => {
    setEditedContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!contact) {
    return (
      <div className="w-80 bg-surface border-l border-border p-6">
        <div className="text-center py-8">
          <Icon name="User" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No contact selected</h3>
          <p className="text-text-secondary">
            Select a conversation to view contact details
          </p>
        </div>
      </div>
    );
  }

  const interactionHistory = [
    {
      id: '1',
      type: 'message',
      title: 'First message received',
      description: 'Customer initiated conversation',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: 'MessageCircle'
    },
    {
      id: '2',
      type: 'tag',
      title: 'Tagged as customer',
      description: 'Auto-tagged based on behavior',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      icon: 'Tag'
    },
    {
      id: '3',
      type: 'note',
      title: 'Note added',
      description: 'Interested in premium plan',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      icon: 'FileText'
    },
    {
      id: '4',
      type: 'assignment',
      title: 'Assigned to Sarah',
      description: 'Conversation assigned to support agent',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: 'User'
    }
  ];

  const formatDate = (timestamp) => {
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-80 bg-surface border-l border-border overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-text-primary">Contact Profile</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-text-muted hover:text-text-primary"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 border-b border-border">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="User" size={24} color="var(--color-primary)" />
          </div>
          
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editedContact.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Contact name"
                className="text-center"
              />
              <Input
                value={editedContact.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone number"
                className="text-center"
              />
            </div>
          ) : (
            <div>
              <h4 className="font-medium text-text-primary">{contact.name}</h4>
              <p className="text-sm text-text-secondary">{contact.phone}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${
            contact.status === 'online' ? 'bg-success' : 
            contact.status === 'typing' ? 'bg-warning' : 'bg-text-muted'
          }`}></div>
          <span className="text-sm text-text-secondary capitalize">{contact.status}</span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit3"
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start"
          >
            <Icon name="Phone" size={16} className="mr-2" />
            Call Contact
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start"
          >
            <Icon name="Mail" size={16} className="mr-2" />
            Send Email
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start"
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Schedule Meeting
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start"
          >
            <Icon name="UserX" size={16} className="mr-2" />
            Block Contact
          </Button>
        </div>
      </div>

      {/* Tags */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {contact.tags?.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          className="text-text-muted hover:text-text-primary"
        >
          Add Tag
        </Button>
      </div>

      {/* Notes */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Notes</h4>
        <div className="space-y-2 mb-3">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-text-primary">Interested in premium subscription plan</p>
            <p className="text-xs text-text-muted mt-1">Added 2 hours ago</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-text-primary">Prefers WhatsApp communication</p>
            <p className="text-xs text-text-muted mt-1">Added 1 day ago</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          className="text-text-muted hover:text-text-primary"
        >
          Add Note
        </Button>
      </div>

      {/* Interaction History */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Interaction History</h4>
        <div className="space-y-3">
          {interactionHistory.map(item => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={14} className="text-text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{item.title}</p>
                <p className="text-xs text-text-secondary">{item.description}</p>
                <p className="text-xs text-text-muted mt-1">{formatDate(item.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;