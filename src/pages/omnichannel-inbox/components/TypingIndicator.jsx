import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = ({ senderName = 'Someone' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start items-end space-x-2"
    >
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(senderName)}&background=random&size=32`}
        alt="Contact"
        className="w-8 h-8 rounded-full object-cover"
      />
      
      <div className="bg-gray-200 rounded-2xl px-4 py-2 max-w-xs">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600">{senderName} is typing</span>
          <div className="flex space-x-1">
            <motion.div
              className="w-1 h-1 bg-gray-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-1 h-1 bg-gray-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-1 h-1 bg-gray-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;