import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import PlatformSidebar from './components/PlatformSidebar';
import InboxHeader from './components/InboxHeader';
import { useInboxStore } from './store/inboxStore';
import { socketService } from './services/socketService';

const OmnichannelInbox = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const { 
    conversations, 
    loading, 
    initializeInbox, 
    updateConversationStatus 
  } = useInboxStore();

  useEffect(() => {
    initializeInbox();
    socketService.connect();

    // Listen for new messages
    socketService.onNewMessage((message) => {
      console.log('New message received:', message);
    });

    return () => {
      socketService.disconnect();
    };
  }, [initializeInbox]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    updateConversationStatus(conversation.id, 'read');
  };

  const filteredConversations = selectedPlatform === 'all' 
    ? conversations 
    : conversations.filter(conv => conv.platform === selectedPlatform);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Platform Sidebar */}
      <PlatformSidebar 
        selectedPlatform={selectedPlatform}
        onPlatformSelect={setSelectedPlatform}
      />

      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <InboxHeader 
          selectedPlatform={selectedPlatform}
          conversationCount={filteredConversations.length}
        />
        <ConversationList
          conversations={filteredConversations}
          selectedConversation={selectedConversation}
          onConversationSelect={handleConversationSelect}
          loading={loading}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow 
            conversation={selectedConversation}
            onConversationUpdate={setSelectedConversation}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Welcome to Omnichannel Inbox
              </h3>
              <p className="text-gray-500">
                Select a conversation to start messaging across all platforms
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OmnichannelInbox;