# Omnichannel Inbox Application

A comprehensive messaging solution that integrates multiple social chat platforms into a single unified inbox. Built with React, this application allows businesses to manage conversations across WhatsApp, Telegram, Instagram, Facebook, Email, SMS, LinkedIn, and YouTube from one central location.

## 🚀 Features

### Core Features
- **Unified Inbox**: Single interface for all messaging platforms
- **Real-time Messaging**: Live chat updates with WebSocket support
- **Platform Switching**: Easy switching between different social platforms
- **Contact Management**: Comprehensive contact profiles with history
- **Message Status Tracking**: Read receipts, delivery status, and typing indicators
- **File Attachments**: Support for images, documents, and media files
- **Smart Filtering**: Filter conversations by platform, status, and priority
- **Conversation Search**: Quick search across all conversations
- **Message Reactions**: Support for emoji reactions (platform-dependent)
- **Tags and Labels**: Organize conversations with custom tags
- **Priority Management**: High, normal, and low priority conversations
- **Archive and Delete**: Manage conversation lifecycle

### Platform Integrations
- **WhatsApp Business API**: Complete messaging and media support
- **Telegram Bot API**: Text, photo, and document messaging
- **Instagram Messaging**: Direct message support for business accounts
- **Facebook Messenger**: Full messenger integration
- **Email Integration**: SMTP and service provider support
- **SMS Service**: Text messaging via Twilio/AWS SNS
- **LinkedIn Messaging**: Professional network messaging
- **YouTube Comments**: Community management (planned)

### Advanced Features
- **Typing Indicators**: Real-time typing status
- **Contact Information**: Complete customer profiles
- **Conversation History**: Full message history and activity logs
- **Notes and Comments**: Internal team notes
- **Quick Responses**: Predefined message templates
- **Automation Ready**: Built for workflow automation integration
- **Analytics Dashboard**: Conversation metrics and insights
- **Team Management**: Multi-agent support
- **Notification System**: Real-time alerts and badges

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm
- React 18+
- Modern web browser

### Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000/omnichannel-inbox](http://localhost:3000/omnichannel-inbox)

## 📱 Platform Configuration

### WhatsApp Business API
```javascript
// Set up WhatsApp integration
const whatsappConfig = {
  apiKey: 'your_facebook_api_key',
  phoneNumberId: 'your_phone_number_id',
  webhookVerifyToken: 'your_webhook_token'
};
```

### Telegram Bot
```javascript
// Set up Telegram integration
const telegramConfig = {
  botToken: 'your_bot_token',
  webhookUrl: 'your_webhook_url'
};
```

### Instagram Business
```javascript
// Set up Instagram integration
const instagramConfig = {
  accessToken: 'your_instagram_access_token',
  businessAccountId: 'your_business_account_id'
};
```

### Facebook Messenger
```javascript
// Set up Facebook integration
const facebookConfig = {
  pageAccessToken: 'your_page_access_token',
  appSecret: 'your_app_secret',
  verifyToken: 'your_verify_token'
};
```

### Email Service
```javascript
// Set up Email integration
const emailConfig = {
  service: 'gmail', // or 'outlook', 'custom'
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  }
};
```

### SMS Service
```javascript
// Set up SMS integration (Twilio example)
const smsConfig = {
  accountSid: 'your_twilio_account_sid',
  authToken: 'your_twilio_auth_token',
  fromNumber: 'your_twilio_phone_number'
};
```

## 🏗️ Architecture

### Component Structure
```
src/pages/omnichannel-inbox/
├── index.jsx                 # Main inbox page
├── components/
│   ├── PlatformSidebar.jsx   # Platform selection sidebar
│   ├── InboxHeader.jsx       # Search and filters
│   ├── ConversationList.jsx  # Conversation list with virtualization
│   ├── ChatWindow.jsx        # Main chat interface
│   ├── MessageBubble.jsx     # Individual message component
│   ├── ContactInfo.jsx       # Contact details sidebar
│   └── TypingIndicator.jsx   # Typing status indicator
├── store/
│   └── inboxStore.js         # State management with Context API
└── services/
    ├── socketService.js      # WebSocket real-time communication
    └── platformIntegrations.js # Platform API integrations
```

### State Management
- **React Context API**: Global inbox state management
- **Local State**: Component-specific state
- **Real-time Updates**: WebSocket integration for live updates

### Data Flow
1. **Initialization**: Load conversations from API
2. **Real-time Updates**: WebSocket events update state
3. **User Actions**: Send messages, update status, manage conversations
4. **Platform Integration**: Route messages to appropriate platform APIs

## 🔧 API Reference

### Inbox Store Methods
```javascript
const {
  conversations,           // Array of all conversations
  loading,                // Loading state
  initializeInbox,        // Initialize inbox data
  addMessage,             // Add new message to conversation
  updateConversationStatus, // Update conversation status
  starConversation,       // Toggle star status
  archiveConversation,    // Archive/unarchive conversation
  deleteConversation,     // Delete conversation
  addTag,                 // Add tag to conversation
  removeTag,              // Remove tag from conversation
  updateFilters,          // Update filter criteria
  getFilteredConversations, // Get filtered conversations
  getConversationStats    // Get inbox statistics
} = useInboxStore();
```

### Socket Service Methods
```javascript
// Connect to WebSocket server
socketService.connect('ws://localhost:3001');

// Send message
socketService.sendMessage({
  conversationId: 'conv_123',
  content: 'Hello!',
  platform: 'whatsapp',
  recipientId: 'recipient_123'
});

// Listen for new messages
socketService.onNewMessage((message) => {
  console.log('New message:', message);
});

// Send typing indicator
socketService.sendTypingIndicator('conv_123', true);

// Update message status
socketService.updateMessageStatus('msg_123', 'read');
```

### Platform Integration Manager
```javascript
import { platformManager, initializePlatformIntegrations } from './services/platformIntegrations';

// Initialize all platform integrations
initializePlatformIntegrations(credentials);

// Send message through specific platform
await platformManager.sendMessage(
  'whatsapp', 
  'recipient_id', 
  'Hello from WhatsApp!'
);

// Send media message
await platformManager.sendMediaMessage(
  'telegram',
  'chat_id',
  'https://example.com/image.jpg',
  'Check out this image!',
  'image'
);

// Mark message as read
await platformManager.markAsRead('facebook', 'message_id', 'sender_id');
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Key customization points:

```css
/* Platform Colors */
.whatsapp { @apply bg-green-500; }
.telegram { @apply bg-blue-400; }
.instagram { @apply bg-gradient-to-br from-purple-500 to-pink-500; }
.facebook { @apply bg-blue-600; }

/* Message Bubbles */
.message-sent { @apply bg-blue-500 text-white ml-auto; }
.message-received { @apply bg-gray-200 text-gray-900; }
```

### Adding New Platforms
1. Create platform service class in `platformIntegrations.js`
2. Add platform icon to `PlatformSidebar.jsx`
3. Update platform colors and styles
4. Add platform-specific message handling

## 📊 Performance Optimization

### Virtualization
- **react-window**: Efficient rendering of large conversation lists
- **Lazy Loading**: Load conversations on demand
- **Message Pagination**: Load messages in chunks

### Real-time Optimization
- **WebSocket Connection**: Persistent connection for real-time updates
- **Debounced Typing**: Optimize typing indicator frequency
- **Message Batching**: Batch multiple updates

### Memory Management
- **Conversation Cleanup**: Remove old conversations from memory
- **Image Optimization**: Lazy load and compress images
- **State Optimization**: Minimize unnecessary re-renders

## 🔒 Security Considerations

### API Security
- **Token Management**: Secure storage of API tokens
- **Rate Limiting**: Respect platform API limits
- **Webhook Validation**: Verify incoming webhook requests

### Data Protection
- **Message Encryption**: End-to-end encryption for sensitive data
- **PII Handling**: Proper handling of personal information
- **Access Control**: Role-based access to conversations

### Platform Compliance
- **WhatsApp**: Business API compliance
- **GDPR**: Data protection regulations
- **Privacy Policies**: Platform-specific privacy requirements

## 🚀 Deployment

### Environment Variables
```bash
# WebSocket Server
REACT_APP_WEBSOCKET_URL=ws://your-websocket-server

# WhatsApp
REACT_APP_WHATSAPP_API_KEY=your_api_key
REACT_APP_WHATSAPP_PHONE_NUMBER_ID=your_phone_id

# Telegram
REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token

# Facebook
REACT_APP_FACEBOOK_PAGE_ACCESS_TOKEN=your_token

# Instagram
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_token

# Email
REACT_APP_EMAIL_SERVICE_API_KEY=your_api_key

# SMS
REACT_APP_SMS_SERVICE_API_KEY=your_api_key
```

### Build for Production
```bash
npm run build
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use TypeScript for type safety
- Write unit tests for new features
- Follow the existing code style
- Update documentation

## 📈 Roadmap

### Upcoming Features
- [ ] AI-powered message suggestions
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Workflow automation builder
- [ ] Mobile app development
- [ ] Voice message support
- [ ] Video call integration
- [ ] Chatbot integration
- [ ] Multi-language support
- [ ] Advanced reporting

### Platform Expansions
- [ ] Discord integration
- [ ] Slack messaging
- [ ] Microsoft Teams
- [ ] WeChat support
- [ ] Snapchat messaging
- [ ] TikTok comments
- [ ] Twitter DMs
- [ ] Viber messaging

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for beautiful styling
- Socket.io for real-time communication
- Platform APIs for integration possibilities
- Open source community for inspiration

---

**Note**: This is a demonstration application. For production use, ensure proper API credentials, security measures, and compliance with platform terms of service.