import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Archive, 
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const InboxHeader = ({ selectedPlatform, conversationCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: CheckCircle, count: conversationCount },
    { id: 'unread', label: 'Unread', icon: AlertCircle, count: 12 },
    { id: 'starred', label: 'Starred', icon: Star, count: 3 },
    { id: 'archived', label: 'Archived', icon: Archive, count: 45 },
    { id: 'pending', label: 'Pending', icon: Clock, count: 7 }
  ];

  const getPlatformName = (platform) => {
    const platformNames = {
      'all': 'All Platforms',
      'whatsapp': 'WhatsApp',
      'telegram': 'Telegram',
      'instagram': 'Instagram',
      'facebook': 'Facebook',
      'twitter': 'Twitter',
      'linkedin': 'LinkedIn',
      'email': 'Email',
      'sms': 'SMS',
      'youtube': 'YouTube'
    };
    return platformNames[platform] || platform;
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      {/* Header Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {getPlatformName(selectedPlatform)}
          </h1>
          <p className="text-sm text-gray-500">
            {conversationCount} conversations
          </p>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
            ${showFilters 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <Filter size={16} />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    flex items-center justify-between p-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-blue-50 border-2 border-blue-200 text-blue-700'
                      : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={16} />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </div>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}
                  `}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InboxHeader;