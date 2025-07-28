import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Info,
  Star,
  Archive,
  Trash2,
  Image,
  File,
  Mic
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import ContactInfo from './ContactInfo';
import TypingIndicator from './TypingIndicator';

const ChatWindow = ({ conversation, onConversationUpdate }) => {
  const [message, setMessage] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) return;

    const newMessage = {
      id: Date.now(),
      content: message,
      timestamp: new Date().toISOString(),
      isSent: true,
      isDelivered: false,
      isRead: false,
      attachments: attachments,
      sender: 'agent'
    };

    // Add message to conversation
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, newMessage],
      lastMessage: {
        content: message || 'Attachment',
        timestamp: newMessage.timestamp,
        isSent: true,
        hasAttachment: attachments.length > 0
      }
    };

    onConversationUpdate(updatedConversation);
    setMessage('');
    setAttachments([]);

    // Simulate message delivery status updates
    setTimeout(() => {
      const deliveredMessage = { ...newMessage, isDelivered: true };
      const updatedConv = {
        ...updatedConversation,
        messages: updatedConversation.messages.map(msg => 
          msg.id === newMessage.id ? deliveredMessage : msg
        )
      };
      onConversationUpdate(updatedConv);
    }, 1000);

    setTimeout(() => {
      const readMessage = { ...newMessage, isDelivered: true, isRead: true };
      const updatedConv = {
        ...updatedConversation,
        messages: updatedConversation.messages.map(msg => 
          msg.id === newMessage.id ? readMessage : msg
        )
      };
      onConversationUpdate(updatedConv);
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={conversation.contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.contact.name)}&background=random`}
              alt={conversation.contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.contact.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div>
            <h2 className="font-semibold text-gray-900">{conversation.contact.name}</h2>
            <p className="text-sm text-gray-500">
              {conversation.contact.isOnline ? 'Online' : `Last seen ${conversation.contact.lastSeen}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Video size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={() => setShowContactInfo(!showContactInfo)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Info size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {conversation.messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={msg.sender === 'agent'}
                  platform={conversation.platform}
                  showAvatar={index === 0 || conversation.messages[index - 1].sender !== msg.sender}
                />
              ))}
            </AnimatePresence>
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Attachment Preview */}
          {attachments.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="relative bg-white rounded-lg p-3 border border-gray-200 flex items-center space-x-2 max-w-xs">
                    {attachment.type.startsWith('image/') ? (
                      <img src={attachment.url} alt={attachment.name} className="w-8 h-8 rounded object-cover" />
                    ) : (
                      <File size={20} className="text-gray-500" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                    </div>
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 size={14} className="text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex space-x-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Image size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none max-h-32"
                  rows="1"
                  style={{ minHeight: '40px' }}
                />
              </div>

              <div className="flex space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Mic size={20} className="text-gray-600" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!message.trim() && attachments.length === 0}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${message.trim() || attachments.length > 0
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx,.txt"
          />
        </div>

        {/* Contact Info Sidebar */}
        <AnimatePresence>
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="w-80 border-l border-gray-200 bg-white"
            >
              <ContactInfo 
                contact={conversation.contact}
                conversation={conversation}
                onClose={() => setShowContactInfo(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatWindow;