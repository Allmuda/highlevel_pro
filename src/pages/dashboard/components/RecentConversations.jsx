import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentConversations = () => {
  const conversations = [
    {
      id: 1,
      contact: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3e8e5?w=150',
      lastMessage: 'Thank you for the demo! When can we schedule the next meeting?',
      time: '5 min ago',
      channel: 'whatsapp',
      unread: 2,
      status: 'active'
    },
    {
      id: 2,
      contact: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      lastMessage: 'I have some questions about the pricing plans.',
      time: '1 hour ago',
      channel: 'email',
      unread: 0,
      status: 'pending'
    },
    {
      id: 3,
      contact: 'PT Digital Solutions',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      lastMessage: 'The payment has been processed successfully.',
      time: '2 hours ago',
      channel: 'sms',
      unread: 1,
      status: 'resolved'
    },
    {
      id: 4,
      contact: 'Lisa Wong',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      lastMessage: 'Could you send me the integration documentation?',
      time: '3 hours ago',
      channel: 'whatsapp',
      unread: 0,
      status: 'active'
    }
  ];

  const getChannelIcon = (channel) => {
    const iconMap = {
      whatsapp: 'MessageCircle',
      email: 'Mail',
      sms: 'MessageSquare',
      phone: 'Phone'
    };
    return iconMap[channel] || 'MessageCircle';
  };

  const getChannelColor = (channel) => {
    const colorMap = {
      whatsapp: 'text-success',
      email: 'text-primary',
      sms: 'text-accent',
      phone: 'text-secondary'
    };
    return colorMap[channel] || 'text-primary';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      active: 'bg-success',
      pending: 'bg-warning',
      resolved: 'bg-secondary'
    };
    return colorMap[status] || 'bg-secondary';
  };

  const handleConversationClick = (conversation) => {
    console.log('Open conversation:', conversation.contact);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Conversations</h3>
        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-150">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            onClick={() => handleConversationClick(conversation)}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-150 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image 
                  src={conversation.avatar} 
                  alt={conversation.contact}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface ${getStatusColor(conversation.status)}`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-text-primary text-sm">{conversation.contact}</h4>
                <div className="flex items-center space-x-2">
                  <Icon name={getChannelIcon(conversation.channel)} size={14} className={getChannelColor(conversation.channel)} />
                  <span className="text-text-muted text-xs">{conversation.time}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-text-secondary text-xs line-clamp-1 flex-1 mr-2">
                  {conversation.lastMessage}
                </p>
                {conversation.unread > 0 && (
                  <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center justify-center space-x-2">
          <Icon name="MessageSquare" size={14} />
          <span>Start New Conversation</span>
        </button>
      </div>
    </div>
  );
};

export default RecentConversations;