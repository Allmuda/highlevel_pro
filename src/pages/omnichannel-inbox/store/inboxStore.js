import { useState, useCallback, createContext, useContext } from 'react';

// Mock data for demonstration
const mockConversations = [
  {
    id: '1',
    platform: 'whatsapp',
    contact: {
      id: 'c1',
      name: 'Sarah Johnson',
      avatar: null,
      phone: '+1-555-0123',
      email: 'sarah@example.com',
      location: 'New York, USA',
      isOnline: true,
      lastSeen: '2 minutes ago',
      firstContact: '2024-01-15',
      avgResponseTime: '5 min',
      satisfaction: '4.8/5',
      notes: 'VIP customer, prefers WhatsApp communication'
    },
    messages: [
      {
        id: 'm1',
        content: 'Hi! I need help with my recent order',
        timestamp: '2024-01-20T10:00:00Z',
        sender: 'customer',
        isSent: false,
        isDelivered: true,
        isRead: true
      },
      {
        id: 'm2',
        content: 'Hello Sarah! I\'d be happy to help you with your order. Could you please provide your order number?',
        timestamp: '2024-01-20T10:02:00Z',
        sender: 'agent',
        isSent: true,
        isDelivered: true,
        isRead: true
      },
      {
        id: 'm3',
        content: 'Sure! My order number is #12345',
        timestamp: '2024-01-20T10:05:00Z',
        sender: 'customer',
        isSent: false,
        isDelivered: true,
        isRead: true
      }
    ],
    lastMessage: {
      content: 'Sure! My order number is #12345',
      timestamp: '2024-01-20T10:05:00Z',
      isSent: false,
      hasAttachment: false
    },
    unreadCount: 0,
    isStarred: true,
    tags: ['VIP', 'Order Support'],
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    platform: 'instagram',
    contact: {
      id: 'c2',
      name: 'Mike Chen',
      avatar: null,
      phone: '+1-555-0124',
      email: 'mike@example.com',
      location: 'San Francisco, USA',
      isOnline: false,
      lastSeen: '1 hour ago',
      firstContact: '2024-01-18',
      avgResponseTime: '12 min',
      satisfaction: '4.5/5'
    },
    messages: [
      {
        id: 'm4',
        content: 'Love the new product photos! 📸',
        timestamp: '2024-01-20T09:30:00Z',
        sender: 'customer',
        isSent: false,
        isDelivered: true,
        isRead: true,
        reactions: [{ emoji: '❤️', count: 1 }]
      },
      {
        id: 'm5',
        content: 'Thank you! We\'re glad you like them. Is there anything specific you\'d like to know about our products?',
        timestamp: '2024-01-20T09:45:00Z',
        sender: 'agent',
        isSent: true,
        isDelivered: true,
        isRead: false
      }
    ],
    lastMessage: {
      content: 'Thank you! We\'re glad you like them. Is there anything specific you\'d like to know about our products?',
      timestamp: '2024-01-20T09:45:00Z',
      isSent: true,
      hasAttachment: false
    },
    unreadCount: 1,
    isStarred: false,
    tags: ['Social Media', 'Product Inquiry'],
    priority: 'normal',
    status: 'active'
  },
  {
    id: '3',
    platform: 'telegram',
    contact: {
      id: 'c3',
      name: 'Anna Rodriguez',
      avatar: null,
      phone: '+1-555-0125',
      email: 'anna@example.com',
      location: 'Los Angeles, USA',
      isOnline: true,
      lastSeen: 'now',
      firstContact: '2024-01-19',
      avgResponseTime: '3 min',
      satisfaction: '5.0/5'
    },
    messages: [
      {
        id: 'm6',
        content: 'Hi, I\'m interested in your premium plan',
        timestamp: '2024-01-20T11:15:00Z',
        sender: 'customer',
        isSent: false,
        isDelivered: true,
        isRead: true
      }
    ],
    lastMessage: {
      content: 'Hi, I\'m interested in your premium plan',
      timestamp: '2024-01-20T11:15:00Z',
      isSent: false,
      hasAttachment: false
    },
    unreadCount: 1,
    isStarred: false,
    tags: ['Sales', 'Premium'],
    priority: 'normal',
    status: 'active'
  },
  {
    id: '4',
    platform: 'facebook',
    contact: {
      id: 'c4',
      name: 'David Wilson',
      avatar: null,
      phone: '+1-555-0126',
      email: 'david@example.com',
      location: 'Chicago, USA',
      isOnline: false,
      lastSeen: '30 minutes ago',
      firstContact: '2024-01-17',
      avgResponseTime: '8 min',
      satisfaction: '4.2/5'
    },
    messages: [
      {
        id: 'm7',
        content: 'Can you help me reset my password?',
        timestamp: '2024-01-20T08:45:00Z',
        sender: 'customer',
        isSent: false,
        isDelivered: true,
        isRead: true
      },
      {
        id: 'm8',
        content: 'Of course! I\'ll send you a password reset link to your email address.',
        timestamp: '2024-01-20T08:47:00Z',
        sender: 'agent',
        isSent: true,
        isDelivered: true,
        isRead: true
      }
    ],
    lastMessage: {
      content: 'Of course! I\'ll send you a password reset link to your email address.',
      timestamp: '2024-01-20T08:47:00Z',
      isSent: true,
      hasAttachment: false
    },
    unreadCount: 0,
    isStarred: false,
    tags: ['Technical Support'],
    priority: 'normal',
    status: 'resolved'
  },
  {
    id: '5',
    platform: 'email',
    contact: {
      id: 'c5',
      name: 'Lisa Thompson',
      avatar: null,
      phone: '+1-555-0127',
      email: 'lisa@example.com',
      location: 'Seattle, USA',
      isOnline: false,
      lastSeen: '2 hours ago',
      firstContact: '2024-01-16',
      avgResponseTime: '1 hour',
      satisfaction: '4.7/5'
    },
    messages: [
      {
        id: 'm9',
        content: 'I received a damaged product in my shipment. Could you please help me with a replacement?',
        timestamp: '2024-01-20T07:30:00Z',
        sender: 'customer',
        isSent: false,
        isDelivered: true,
        isRead: true,
        attachments: [
          {
            id: 'a1',
            name: 'damaged-product.jpg',
            type: 'image/jpeg',
            size: 245760,
            url: 'https://via.placeholder.com/300x200'
          }
        ]
      }
    ],
    lastMessage: {
      content: 'I received a damaged product in my shipment. Could you please help me with a replacement?',
      timestamp: '2024-01-20T07:30:00Z',
      isSent: false,
      hasAttachment: true
    },
    unreadCount: 1,
    isStarred: false,
    tags: ['Returns', 'Quality Issue'],
    priority: 'high',
    status: 'pending'
  }
];

const InboxContext = createContext();

export const useInboxStore = () => {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error('useInboxStore must be used within an InboxProvider');
  }
  return context;
};

export const InboxProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    priority: 'all'
  });

  const initializeInbox = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConversations(mockConversations);
      setLoading(false);
    }, 1000);
  }, []);

  const addMessage = useCallback((conversationId, message) => {
    setConversations(prev => 
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            lastMessage: {
              content: message.content,
              timestamp: message.timestamp,
              isSent: message.isSent,
              hasAttachment: message.attachments && message.attachments.length > 0
            },
            unreadCount: message.sender === 'customer' ? conv.unreadCount + 1 : conv.unreadCount
          };
        }
        return conv;
      })
    );
  }, []);

  const updateConversationStatus = useCallback((conversationId, status) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, status, unreadCount: status === 'read' ? 0 : conv.unreadCount }
          : conv
      )
    );
  }, []);

  const starConversation = useCallback((conversationId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, isStarred: !conv.isStarred }
          : conv
      )
    );
  }, []);

  const archiveConversation = useCallback((conversationId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, status: conv.status === 'archived' ? 'active' : 'archived' }
          : conv
      )
    );
  }, []);

  const deleteConversation = useCallback((conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
  }, []);

  const addTag = useCallback((conversationId, tag) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, tags: [...(conv.tags || []), tag] }
          : conv
      )
    );
  }, []);

  const removeTag = useCallback((conversationId, tagIndex) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, tags: conv.tags?.filter((_, index) => index !== tagIndex) }
          : conv
      )
    );
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const getFilteredConversations = useCallback(() => {
    return conversations.filter(conv => {
      if (filters.platform !== 'all' && conv.platform !== filters.platform) {
        return false;
      }
      if (filters.status !== 'all' && conv.status !== filters.status) {
        return false;
      }
      if (filters.priority !== 'all' && conv.priority !== filters.priority) {
        return false;
      }
      return true;
    });
  }, [conversations, filters]);

  const getConversationStats = useCallback(() => {
    const total = conversations.length;
    const unread = conversations.filter(conv => conv.unreadCount > 0).length;
    const starred = conversations.filter(conv => conv.isStarred).length;
    const archived = conversations.filter(conv => conv.status === 'archived').length;
    const pending = conversations.filter(conv => conv.status === 'pending').length;

    return { total, unread, starred, archived, pending };
  }, [conversations]);

  const value = {
    conversations,
    loading,
    filters,
    initializeInbox,
    addMessage,
    updateConversationStatus,
    starConversation,
    archiveConversation,
    deleteConversation,
    addTag,
    removeTag,
    updateFilters,
    getFilteredConversations,
    getConversationStats
  };

  return (
    <InboxContext.Provider value={value}>
      {children}
    </InboxContext.Provider>
  );
};

export default InboxContext;