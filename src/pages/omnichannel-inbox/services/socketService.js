import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.messageHandlers = [];
    this.statusHandlers = [];
    this.typingHandlers = [];
  }

  connect(serverUrl = 'ws://localhost:3001') {
    try {
      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 10000,
        autoConnect: true
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        this.isConnected = true;
        this.emit('user_join', { userId: 'agent_1', role: 'agent' });
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        this.isConnected = false;
      });

      this.socket.on('connect_error', (error) => {
        console.log('WebSocket connection error:', error);
        this.isConnected = false;
        // Fallback to mock mode for demo purposes
        this.setupMockHandlers();
      });

      this.setupEventHandlers();
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      // Fallback to mock mode for demo purposes
      this.setupMockHandlers();
    }
  }

  setupEventHandlers() {
    if (!this.socket) return;

    // New message received
    this.socket.on('new_message', (data) => {
      this.messageHandlers.forEach(handler => handler(data));
    });

    // Message status updates (delivered, read)
    this.socket.on('message_status', (data) => {
      this.statusHandlers.forEach(handler => handler(data));
    });

    // Typing indicators
    this.socket.on('user_typing', (data) => {
      this.typingHandlers.forEach(handler => handler(data));
    });

    // Platform-specific events
    this.socket.on('whatsapp_message', (data) => {
      this.handlePlatformMessage('whatsapp', data);
    });

    this.socket.on('telegram_message', (data) => {
      this.handlePlatformMessage('telegram', data);
    });

    this.socket.on('instagram_message', (data) => {
      this.handlePlatformMessage('instagram', data);
    });

    this.socket.on('facebook_message', (data) => {
      this.handlePlatformMessage('facebook', data);
    });

    this.socket.on('email_message', (data) => {
      this.handlePlatformMessage('email', data);
    });
  }

  setupMockHandlers() {
    // Mock real-time updates for demo purposes
    console.log('Setting up mock handlers for demo mode');
    
    // Simulate incoming messages every 30 seconds
    setInterval(() => {
      const mockMessage = this.generateMockMessage();
      this.messageHandlers.forEach(handler => handler(mockMessage));
    }, 30000);

    // Simulate typing indicators
    setInterval(() => {
      if (Math.random() > 0.7) {
        const mockTyping = {
          conversationId: 'mock_' + Math.floor(Math.random() * 5),
          isTyping: true,
          senderName: 'Customer ' + Math.floor(Math.random() * 10)
        };
        this.typingHandlers.forEach(handler => handler(mockTyping));
        
        // Stop typing after 3 seconds
        setTimeout(() => {
          this.typingHandlers.forEach(handler => handler({
            ...mockTyping,
            isTyping: false
          }));
        }, 3000);
      }
    }, 15000);
  }

  generateMockMessage() {
    const platforms = ['whatsapp', 'telegram', 'instagram', 'facebook', 'email'];
    const messages = [
      'Hello, I need some help with my order',
      'Can you provide more information about your services?',
      'Thank you for the quick response!',
      'I have a question about pricing',
      'Is this product still available?',
      'Great customer service! 👍',
      'Can I schedule a call?',
      'I need to update my account information'
    ];

    return {
      id: 'mock_' + Date.now(),
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      conversationId: 'conv_' + Math.floor(Math.random() * 5),
      content: messages[Math.floor(Math.random() * messages.length)],
      sender: 'customer',
      timestamp: new Date().toISOString(),
      contact: {
        name: 'Mock Customer ' + Math.floor(Math.random() * 100),
        avatar: null,
        isOnline: Math.random() > 0.5
      }
    };
  }

  handlePlatformMessage(platform, data) {
    const enrichedData = {
      ...data,
      platform,
      timestamp: data.timestamp || new Date().toISOString()
    };
    
    this.messageHandlers.forEach(handler => handler(enrichedData));
  }

  // Send message through the appropriate platform
  sendMessage(message) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', message);
    } else {
      // Mock send for demo
      console.log('Mock send message:', message);
      
      // Simulate delivery status updates
      setTimeout(() => {
        this.statusHandlers.forEach(handler => handler({
          messageId: message.id,
          status: 'delivered'
        }));
      }, 1000);

      setTimeout(() => {
        this.statusHandlers.forEach(handler => handler({
          messageId: message.id,
          status: 'read'
        }));
      }, 3000);
    }
  }

  // Send typing indicator
  sendTypingIndicator(conversationId, isTyping) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing', {
        conversationId,
        isTyping,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Update message status (delivered, read)
  updateMessageStatus(messageId, status) {
    if (this.socket && this.isConnected) {
      this.socket.emit('message_status_update', {
        messageId,
        status,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Join conversation room
  joinConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join_conversation', { conversationId });
    }
  }

  // Leave conversation room
  leaveConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave_conversation', { conversationId });
    }
  }

  // Event listeners
  onNewMessage(handler) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  onMessageStatus(handler) {
    this.statusHandlers.push(handler);
    return () => {
      this.statusHandlers = this.statusHandlers.filter(h => h !== handler);
    };
  }

  onTyping(handler) {
    this.typingHandlers.push(handler);
    return () => {
      this.typingHandlers = this.typingHandlers.filter(h => h !== handler);
    };
  }

  // Platform-specific connection methods
  connectWhatsApp(credentials) {
    if (this.socket && this.isConnected) {
      this.socket.emit('connect_whatsapp', credentials);
    }
  }

  connectTelegram(credentials) {
    if (this.socket && this.isConnected) {
      this.socket.emit('connect_telegram', credentials);
    }
  }

  connectInstagram(credentials) {
    if (this.socket && this.isConnected) {
      this.socket.emit('connect_instagram', credentials);
    }
  }

  connectFacebook(credentials) {
    if (this.socket && this.isConnected) {
      this.socket.emit('connect_facebook', credentials);
    }
  }

  connectEmail(credentials) {
    if (this.socket && this.isConnected) {
      this.socket.emit('connect_email', credentials);
    }
  }

  // Utility method to emit events
  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      socket: this.socket
    };
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;