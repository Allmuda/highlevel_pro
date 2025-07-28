import React from 'react';
import { motion } from 'framer-motion';
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
  Settings,
  Plus
} from 'lucide-react';

const platforms = [
  {
    id: 'all',
    name: 'All Messages',
    icon: MessageCircle,
    color: 'bg-blue-500',
    notifications: 0
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500',
    notifications: 5
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: Send,
    color: 'bg-blue-400',
    notifications: 2
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    notifications: 3
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    notifications: 1
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-gray-900',
    notifications: 0
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    notifications: 2
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'bg-red-500',
    notifications: 7
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: Phone,
    color: 'bg-indigo-500',
    notifications: 1
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-600',
    notifications: 0
  }
];

const PlatformSidebar = ({ selectedPlatform, onPlatformSelect }) => {
  const totalNotifications = platforms
    .filter(p => p.id !== 'all')
    .reduce((total, platform) => total + platform.notifications, 0);

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-3">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const isSelected = selectedPlatform === platform.id;
        const notifications = platform.id === 'all' ? totalNotifications : platform.notifications;
        
        return (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <button
              onClick={() => onPlatformSelect(platform.id)}
              className={`
                relative w-12 h-12 rounded-xl flex items-center justify-center
                transition-all duration-200 hover:scale-110
                ${isSelected 
                  ? 'ring-2 ring-white ring-opacity-50 shadow-lg' 
                  : 'hover:ring-2 hover:ring-white hover:ring-opacity-30'
                }
                ${platform.color}
              `}
              title={platform.name}
            >
              <Icon 
                size={20} 
                className="text-white" 
              />
              
              {notifications > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {notifications > 9 ? '9+' : notifications}
                </motion.div>
              )}
            </button>

            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {platform.name}
              {notifications > 0 && (
                <span className="ml-1 text-red-400">
                  ({notifications})
                </span>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Add Platform Button */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="Add Platform"
        >
          <Plus size={20} className="text-gray-300 group-hover:text-white" />
        </motion.button>
      </div>

      {/* Settings */}
      <div className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="Settings"
        >
          <Settings size={20} className="text-gray-300 group-hover:text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default PlatformSidebar;