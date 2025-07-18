import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import ConversationList from './components/ConversationList';
import ConversationThread from './components/ConversationThread';
import ContactProfile from './components/ContactProfile';
import MessageTemplates from './components/MessageTemplates';
import BroadcastPanel from './components/BroadcastPanel';


const WhatsAppBusinessCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showContactProfile, setShowContactProfile] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setShowContactProfile(false);
  };

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
    // Implement message sending logic
  };

  const handleTemplateSelect = (template) => {
    console.log('Selected template:', template);
    // Implement template selection logic
  };

  const conversationStats = {
    total: 1247,
    active: 89,
    pending: 23,
    resolved: 1135,
    responseTime: '2.5 min'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 h-screen flex flex-col">
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-border">
          <Breadcrumb />
        </div>

        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-border bg-surface">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">WhatsApp Business Center</h1>
              <p className="text-text-secondary">
                Manage customer conversations and automated messaging
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Stats */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-text-primary">{conversationStats.total}</div>
                  <div className="text-text-muted">Total</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-success">{conversationStats.active}</div>
                  <div className="text-text-muted">Active</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-warning">{conversationStats.pending}</div>
                  <div className="text-text-muted">Pending</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-text-primary">{conversationStats.responseTime}</div>
                  <div className="text-text-muted">Avg Response</div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowTemplates(true)}
                  iconName="FileText"
                >
                  Templates
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowBroadcast(true)}
                  iconName="Megaphone"
                >
                  Broadcast
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Plus"
                >
                  New Chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation List */}
          <div className="w-80 flex-shrink-0">
            <ConversationList
              onConversationSelect={handleConversationSelect}
              selectedConversation={selectedConversation}
            />
          </div>

          {/* Conversation Thread */}
          <div className="flex-1">
            <ConversationThread
              conversation={selectedConversation}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Contact Profile */}
          {showContactProfile && (
            <ContactProfile
              contact={selectedConversation?.contact}
              onClose={() => setShowContactProfile(false)}
            />
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowContactProfile(!showContactProfile)}
            iconName="User"
            className="w-12 h-12 rounded-full shadow-lg"
          />
          <Button
            variant="secondary"
            size="sm"
            iconName="Settings"
            className="w-12 h-12 rounded-full shadow-lg bg-surface"
          />
        </div>

        {/* Modals */}
        {showTemplates && (
          <MessageTemplates
            onTemplateSelect={handleTemplateSelect}
            onClose={() => setShowTemplates(false)}
          />
        )}

        {showBroadcast && (
          <BroadcastPanel
            onClose={() => setShowBroadcast(false)}
          />
        )}
      </main>
    </div>
  );
};

export default WhatsAppBusinessCenter;