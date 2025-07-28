import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck, Download, Play, FileText, Image as ImageIcon } from 'lucide-react';

const MessageBubble = ({ message, isOwn, platform, showAvatar }) => {
  const formatTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const renderAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {attachments.map((attachment, index) => {
          if (attachment.type?.startsWith('image/')) {
            return (
              <div key={index} className="relative group">
                <img
                  src={attachment.url}
                  alt={attachment.name}
                  className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
              </div>
            );
          } else if (attachment.type?.startsWith('video/')) {
            return (
              <div key={index} className="relative group max-w-xs">
                <video
                  src={attachment.url}
                  className="w-full rounded-lg"
                  controls={false}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center cursor-pointer">
                  <Play className="text-white" size={32} />
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg max-w-xs cursor-pointer hover:bg-gray-200 transition-colors">
                <FileText size={20} className="text-gray-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                </div>
                <Download size={16} className="text-gray-500" />
              </div>
            );
          }
        })}
      </div>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getMessageStatus = () => {
    if (!isOwn) return null;
    
    if (message.isRead) {
      return <CheckCheck size={14} className="text-blue-500" />;
    } else if (message.isDelivered) {
      return <CheckCheck size={14} className="text-gray-400" />;
    } else {
      return <Check size={14} className="text-gray-400" />;
    }
  };

  const getBubbleStyle = () => {
    const baseClasses = "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl break-words";
    
    if (isOwn) {
      // Different colors for different platforms when sending
      const platformColors = {
        whatsapp: 'bg-green-500',
        telegram: 'bg-blue-500',
        instagram: 'bg-purple-500',
        facebook: 'bg-blue-600',
        twitter: 'bg-gray-900',
        linkedin: 'bg-blue-700',
        email: 'bg-red-500',
        sms: 'bg-indigo-500',
        youtube: 'bg-red-600'
      };
      
      const color = platformColors[platform] || 'bg-blue-500';
      return `${baseClasses} ${color} text-white ml-auto`;
    } else {
      return `${baseClasses} bg-gray-200 text-gray-900`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} items-end space-x-2`}
    >
      {/* Avatar for received messages */}
      {!isOwn && showAvatar && (
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(message.senderName || 'User')}&background=random&size=32`}
          alt="Contact"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      
      {!isOwn && !showAvatar && <div className="w-8" />}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-full`}>
        {/* Message Bubble */}
        <div className={getBubbleStyle()}>
          {/* Message Content */}
          {message.content && (
            <p className="whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
          )}
          
          {/* Attachments */}
          {renderAttachments(message.attachments)}
          
          {/* Timestamp and Status */}
          <div className={`flex items-center justify-end space-x-1 mt-1 ${
            isOwn ? 'text-white text-opacity-70' : 'text-gray-500'
          } text-xs`}>
            <span>{formatTime(message.timestamp)}</span>
            {getMessageStatus()}
          </div>
        </div>

        {/* Message Reactions (if any) */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex space-x-1 mt-1">
            {message.reactions.map((reaction, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs shadow-sm"
              >
                {reaction.emoji} {reaction.count > 1 && reaction.count}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;