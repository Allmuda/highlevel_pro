import React from 'react';
import { motion } from 'framer-motion';
import { FixedSizeList as List } from 'react-window';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Send,
  Linkedin,
  Youtube,
  Clock,
  Check,
  CheckCheck,
  Star,
  Paperclip
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const platformIcons = {
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
  sms: Phone,
  youtube: Youtube
};

const platformColors = {
  whatsapp: 'text-green-500',
  telegram: 'text-blue-400',
  instagram: 'text-pink-500',
  facebook: 'text-blue-600',
  twitter: 'text-gray-900',
  linkedin: 'text-blue-700',
  email: 'text-red-500',
  sms: 'text-indigo-500',
  youtube: 'text-red-600'
};

const ConversationItem = ({ index, style, data }) => {
  const { conversations, selectedConversation, onConversationSelect } = data;
  const conversation = conversations[index];
  
  if (!conversation) return null;

  const PlatformIcon = platformIcons[conversation.platform] || MessageCircle;
  const isSelected = selectedConversation?.id === conversation.id;
  const hasAttachment = conversation.lastMessage?.hasAttachment;
  
  return (
    <div style={style}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => onConversationSelect(conversation)}
        className={`
          p-4 border-b border-gray-100 cursor-pointer transition-all duration-200
          hover:bg-gray-50 relative
          ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
        `}
      >
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={conversation.contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.contact.name)}&background=random`}
              alt={conversation.contact.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            {/* Platform indicator */}
            <div className={`
              absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white 
              flex items-center justify-center shadow-sm border-2 border-white
            `}>
              <PlatformIcon 
                size={12} 
                className={platformColors[conversation.platform] || 'text-gray-500'} 
              />
            </div>

            {/* Online status */}
            {conversation.contact.isOnline && (
              <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`
                font-medium truncate
                ${conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}
              `}>
                {conversation.contact.name}
              </h3>
              
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                {conversation.isStarred && (
                  <Star size={12} className="text-yellow-500 fill-current" />
                )}
                <span>
                  {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Last message */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 flex-1 min-w-0">
                {hasAttachment && (
                  <Paperclip size={12} className="text-gray-400 flex-shrink-0" />
                )}
                <p className={`
                  text-sm truncate
                  ${conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}
                `}>
                  {conversation.lastMessage.content}
                </p>
              </div>

              <div className="flex items-center space-x-2 ml-2">
                {/* Message status for sent messages */}
                {conversation.lastMessage.isSent && (
                  <div className="text-gray-400">
                    {conversation.lastMessage.isDelivered ? (
                      conversation.lastMessage.isRead ? (
                        <CheckCheck size={12} className="text-blue-500" />
                      ) : (
                        <CheckCheck size={12} />
                      )
                    ) : (
                      <Check size={12} />
                    )}
                  </div>
                )}

                {/* Unread count */}
                {conversation.unreadCount > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {conversation.tags && conversation.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {conversation.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {conversation.tags.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{conversation.tags.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Priority indicator */}
        {conversation.priority === 'high' && (
          <div className="absolute right-2 top-2 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </motion.div>
    </div>
  );
};

const ConversationList = ({ conversations, selectedConversation, onConversationSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MessageCircle size={48} className="text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No conversations</h3>
          <p className="text-gray-500">
            Start a conversation or wait for new messages
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <List
        height={window.innerHeight - 300} // Adjust based on header height
        itemCount={conversations.length}
        itemSize={100}
        itemData={{
          conversations,
          selectedConversation,
          onConversationSelect
        }}
      >
        {ConversationItem}
      </List>
    </div>
  );
};

export default ConversationList;