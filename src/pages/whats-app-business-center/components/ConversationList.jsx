import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationList = ({ onConversationSelect, selectedConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const conversations = [
    {
      id: '1',
      contact: {
        name: 'Sarah Johnson',
        phone: '+62 812 3456 7890',
        avatar: null,
        status: 'online'
      },
      lastMessage: {
        content: 'Thank you for the quick response!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text',
        isFromUser: true
      },
      unreadCount: 2,
      status: 'active',
      tags: ['customer', 'priority']
    },
    {
      id: '2',
      contact: {
        name: 'Michael Chen',
        phone: '+62 813 9876 5432',
        avatar: null,
        status: 'offline'
      },
      lastMessage: {
        content: 'Can you help me with my order?',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: 'text',
        isFromUser: true
      },
      unreadCount: 1,
      status: 'pending',
      tags: ['support']
    },
    {
      id: '3',
      contact: {
        name: 'Emma Rodriguez',
        phone: '+62 814 5555 1234',
        avatar: null,
        status: 'typing'
      },
      lastMessage: {
        content: 'Here are the product details you requested',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'text',
        isFromUser: false
      },
      unreadCount: 0,
      status: 'active',
      tags: ['lead', 'product-inquiry']
    },
    {
      id: '4',
      contact: {
        name: 'David Kim',
        phone: '+62 815 7777 8888',
        avatar: null,
        status: 'online'
      },
      lastMessage: {
        content: 'Perfect! I\'ll make the payment now.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        type: 'text',
        isFromUser: true
      },
      unreadCount: 0,
      status: 'resolved',
      tags: ['customer', 'payment']
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.contact.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'offline': return 'bg-text-muted';
      case 'typing': return 'bg-warning';
      default: return 'bg-text-muted';
    }
  };

  const getConversationStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'pending': return 'text-warning';
      case 'resolved': return 'text-text-muted';
      default: return 'text-text-muted';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60 * 1000) return 'now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h`;
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d`;
  };

  return (
    <div className="w-full h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Conversations</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            className="text-text-muted hover:text-text-primary"
          />
        </div>
        
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          {['all', 'active', 'pending', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                filterStatus === status
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-border'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map(conversation => (
          <div
            key={conversation.id}
            onClick={() => onConversationSelect?.(conversation)}
            className={`p-4 border-b border-border-muted cursor-pointer hover:bg-muted transition-colors duration-150 ${
              selectedConversation?.id === conversation.id ? 'bg-primary-50 border-r-2 border-r-primary' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${getStatusColor(conversation.contact.status)}`}></div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-text-primary truncate">{conversation.contact.name}</h3>
                  <div className="flex items-center space-x-2">
                    {conversation.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                    <span className="text-xs text-text-muted">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary truncate mb-2">
                  {conversation.lastMessage.type === 'text' ? conversation.lastMessage.content : '📎 Attachment'}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {conversation.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-muted text-xs text-text-muted rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Icon 
                    name="Circle" 
                    size={8} 
                    className={getConversationStatusColor(conversation.status)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredConversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Icon name="MessageCircle" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No conversations</h3>
            <p className="text-text-secondary">
              {searchQuery ? 'No conversations match your search' : 'Start a new conversation'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationList;