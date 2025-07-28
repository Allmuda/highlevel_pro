import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Star, 
  Archive, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Tag,
  User,
  MessageCircle,
  Clock,
  Shield,
  ExternalLink
} from 'lucide-react';

const ContactInfo = ({ contact, conversation, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'details', label: 'Details', icon: User },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'notes', label: 'Notes', icon: Edit3 }
  ];

  const contactDetails = [
    { label: 'Phone', value: contact.phone, icon: Phone },
    { label: 'Email', value: contact.email, icon: Mail },
    { label: 'Location', value: contact.location, icon: MapPin },
    { label: 'First Contact', value: contact.firstContact, icon: Calendar }
  ];

  const conversationStats = [
    { label: 'Total Messages', value: conversation.messages?.length || 0 },
    { label: 'Response Time', value: contact.avgResponseTime || 'N/A' },
    { label: 'Satisfaction', value: contact.satisfaction || 'N/A' },
    { label: 'Platform', value: conversation.platform }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon size={16} className="text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">{detail.label}</p>
                        <p className="text-sm text-gray-900">{detail.value || 'Not provided'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {conversation.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                )) || (
                  <p className="text-sm text-gray-500">No tags assigned</p>
                )}
                <button className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <Tag size={12} className="mr-1" />
                  Add tag
                </button>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Conversation Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {conversationStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Recent Activity</h3>
            <div className="space-y-3">
              {/* Sample history items */}
              {[
                { action: 'Message sent', time: '2 hours ago', platform: 'WhatsApp' },
                { action: 'Conversation started', time: '1 day ago', platform: 'Instagram' },
                { action: 'Profile updated', time: '3 days ago', platform: 'System' },
                { action: 'First contact', time: '1 week ago', platform: 'Email' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.time} • {item.platform}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Notes</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
            
            {isEditing ? (
              <textarea
                placeholder="Add notes about this contact..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                defaultValue={contact.notes || ''}
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 min-h-32">
                <p className="text-sm text-gray-700">
                  {contact.notes || 'No notes available. Click Edit to add notes about this contact.'}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Info</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Contact Avatar and Name */}
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&size=80`}
              alt={contact.name}
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            {contact.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            )}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-gray-900">{contact.name}</h3>
          <p className="text-sm text-gray-500">{contact.title || 'Customer'}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-2 mt-4">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
            <MessageCircle size={16} />
          </button>
          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
            <Phone size={16} />
          </button>
          <button className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors">
            <Star size={16} />
          </button>
          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            <Archive size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors
                  ${isActive
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            <Shield size={16} />
            <span>Block</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;