import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationThread = ({ conversation, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const messages = [
    {
      id: '1',
      content: 'Hi! I\'m interested in your product. Can you tell me more about it?',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isFromUser: true,
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      content: 'Hello! Thank you for your interest. I\'d be happy to help you with product information. Which specific product are you looking at?',
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
      isFromUser: false,
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      content: 'I\'m looking at the premium subscription plan. What features does it include?',
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
      isFromUser: true,
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      content: 'Great choice! The premium plan includes:\n• Advanced analytics\n• Priority support\n• Custom integrations\n• Unlimited campaigns\n\nWould you like a detailed demo?',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      isFromUser: false,
      type: 'text',
      status: 'read'
    },
    {
      id: '5',
      content: 'Yes, I\'d love to see a demo! When can we schedule it?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isFromUser: true,
      type: 'text',
      status: 'read'
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: message,
        timestamp: new Date(),
        isFromUser: false,
        type: 'text',
        status: 'sent'
      };
      onSendMessage?.(newMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload
      console.log('File selected:', file);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (msg) => {
    const isUser = msg.isFromUser;
    
    return (
      <div
        key={msg.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
          <div
            className={`px-4 py-2 rounded-lg ${
              isUser
                ? 'bg-primary text-white' :'bg-surface border border-border text-text-primary'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </div>
          <div className={`flex items-center space-x-2 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-text-muted">{formatTime(msg.timestamp)}</span>
            {isUser && (
              <Icon 
                name={msg.status === 'read' ? 'CheckCheck' : 'Check'} 
                size={12} 
                className={msg.status === 'read' ? 'text-primary' : 'text-text-muted'}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-medium text-text-primary mb-2">Select a conversation</h3>
          <p className="text-text-secondary">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-surface">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="var(--color-primary)" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${
                conversation.contact.status === 'online' ? 'bg-success' : 
                conversation.contact.status === 'typing' ? 'bg-warning' : 'bg-text-muted'
              }`}></div>
            </div>
            <div>
              <h3 className="font-medium text-text-primary">{conversation.contact.name}</h3>
              <p className="text-sm text-text-secondary">
                {conversation.contact.status === 'typing' ? 'Typing...' : 
                 conversation.contact.status === 'online' ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Phone"
              className="text-text-muted hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Video"
              className="text-text-muted hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              className="text-text-muted hover:text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted">
        <div className="space-y-1">
          {messages.map(renderMessage)}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="max-w-xs lg:max-w-md">
                <div className="px-4 py-2 rounded-lg bg-surface border border-border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows="1"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <div className="absolute right-2 top-2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-text-muted hover:text-text-primary"
                >
                  <Icon name="Smile" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-text-muted hover:text-text-primary"
                >
                  <Icon name="Paperclip" size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="flex-shrink-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-muted hover:text-text-primary text-xs"
          >
            Quick Reply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-muted hover:text-text-primary text-xs"
          >
            Templates
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-muted hover:text-text-primary text-xs"
          >
            AI Assist
          </Button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
      />
    </div>
  );
};

export default ConversationThread;