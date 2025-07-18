import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ContactsTable from './components/ContactsTable';
import ContactFilters from './components/ContactFilters';
import ContactSidebar from './components/ContactSidebar';
import ContactDetailModal from './components/ContactDetailModal';
import AddContactModal from './components/AddContactModal';

const CRMContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    segment: 'all',
    status: 'all',
    lifecycleStage: 'all',
    tags: [],
    dateRange: { start: '', end: '' },
    leadScoreRange: { min: 0, max: 100 },
    industry: 'all',
    lastInteractionType: 'all',
    source: 'all',
    quickSearch: ''
  });

  // Mock data
  const mockContacts = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+62 812-3456-7890',
      company: 'TechCorp Indonesia',
      position: 'CTO',
      status: 'active',
      lastInteraction: new Date(Date.now() - 86400000),
      lastInteractionType: 'email',
      leadScore: 85,
      industry: 'technology',
      source: 'website',
      tags: ['vip', 'hot-lead'],
      lifecycleStage: 'opportunity'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@healthplus.id',
      phone: '+62 813-9876-5432',
      company: 'HealthPlus Clinic',
      position: 'Marketing Director',
      status: 'active',
      lastInteraction: new Date(Date.now() - 172800000),
      lastInteractionType: 'whatsapp',
      leadScore: 72,
      industry: 'healthcare',
      source: 'referral',
      tags: ['qualified'],
      lifecycleStage: 'sales-qualified'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@financegroup.co.id',
      phone: '+62 814-5555-1234',
      company: 'Finance Group',
      position: 'Operations Manager',
      status: 'pending',
      lastInteraction: new Date(Date.now() - 259200000),
      lastInteractionType: 'call',
      leadScore: 58,
      industry: 'finance',
      source: 'advertisement',
      tags: ['follow-up'],
      lifecycleStage: 'lead'
    },
    {
      id: 4,
      name: 'Lisa Wong',
      email: 'lisa.wong@edutech.id',
      phone: '+62 815-7777-8888',
      company: 'EduTech Solutions',
      position: 'Product Manager',
      status: 'active',
      lastInteraction: new Date(Date.now() - 345600000),
      lastInteractionType: 'email',
      leadScore: 91,
      industry: 'education',
      source: 'social-media',
      tags: ['vip', 'qualified'],
      lifecycleStage: 'customer'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      email: 'david.r@retailmax.com',
      phone: '+62 816-2222-3333',
      company: 'RetailMax',
      position: 'Store Manager',
      status: 'inactive',
      lastInteraction: new Date(Date.now() - 432000000),
      lastInteractionType: 'whatsapp',
      leadScore: 34,
      industry: 'retail',
      source: 'import',
      tags: ['cold'],
      lifecycleStage: 'subscriber'
    }
  ];

  const handleAddContact = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewContact = (newContact) => {
    setContacts(prev => [...prev, newContact]);
    setIsAddModalOpen(false);
  };

  const segments = [
    {
      id: 'all',
      name: 'All Contacts',
      icon: 'Users',
      count: 120,
      children: [
        { id: 'recent', name: 'Recently Added', icon: 'Clock', count: 15 },
        { id: 'updated', name: 'Recently Updated', icon: 'Edit', count: 8 }
      ]
    },
    {
      id: 'leads',
      name: 'Leads',
      icon: 'Target',
      count: 45,
      children: [
        { id: 'hot-leads', name: 'Hot Leads', icon: 'Flame', count: 12 },
        { id: 'warm-leads', name: 'Warm Leads', icon: 'Sun', count: 18 },
        { id: 'cold-leads', name: 'Cold Leads', icon: 'Snowflake', count: 15 }
      ]
    },
    {
      id: 'customers',
      name: 'Customers',
      icon: 'Star',
      count: 32,
      children: [
        { id: 'active-customers', name: 'Active', icon: 'CheckCircle', count: 28 },
        { id: 'inactive-customers', name: 'Inactive', icon: 'XCircle', count: 4 }
      ]
    },
    {
      id: 'prospects',
      name: 'Prospects',
      icon: 'Eye',
      count: 28
    },
    {
      id: 'vip',
      name: 'VIP Contacts',
      icon: 'Crown',
      count: 15
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'email',
      title: 'Welcome Email Sent',
      description: 'Automated welcome email sent to John Smith',
      timestamp: new Date(Date.now() - 300000),
      contact: 'John Smith'
    },
    {
      id: 2,
      type: 'whatsapp',
      title: 'WhatsApp Message',
      description: 'Follow-up message sent to Sarah Johnson',
      timestamp: new Date(Date.now() - 600000),
      contact: 'Sarah Johnson'
    },
    {
      id: 3,
      type: 'call',
      title: 'Phone Call Completed',
      description: 'Initial consultation call with Michael Chen',
      timestamp: new Date(Date.now() - 1200000),
      contact: 'Michael Chen'
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Demo Scheduled',
      description: 'Product demo scheduled with Lisa Wong',
      timestamp: new Date(Date.now() - 1800000),
      contact: 'Lisa Wong'
    },
    {
      id: 5,
      type: 'note',
      title: 'Note Added',
      description: 'Follow-up note added for David Rodriguez',
      timestamp: new Date(Date.now() - 2400000),
      contact: 'David Rodriguez'
    }
  ];

  useEffect(() => {
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

  useEffect(() => {
    let filtered = [...contacts];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply segment filter
    if (filters.segment !== 'all') {
      if (filters.segment === 'leads') {
        filtered = filtered.filter(contact => contact.lifecycleStage === 'lead' || contact.lifecycleStage === 'marketing-qualified' || contact.lifecycleStage === 'sales-qualified');
      } else if (filters.segment === 'customers') {
        filtered = filtered.filter(contact => contact.lifecycleStage === 'customer');
      } else if (filters.segment === 'prospects') {
        filtered = filtered.filter(contact => contact.lifecycleStage === 'opportunity');
      } else if (filters.segment === 'vip') {
        filtered = filtered.filter(contact => contact.tags.includes('vip'));
      }
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(contact => contact.status === filters.status);
    }

    // Apply lifecycle stage filter
    if (filters.lifecycleStage !== 'all') {
      filtered = filtered.filter(contact => contact.lifecycleStage === filters.lifecycleStage);
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(contact =>
        filters.tags.some(tag => contact.tags.includes(tag))
      );
    }

    // Apply industry filter
    if (filters.industry !== 'all') {
      filtered = filtered.filter(contact => contact.industry === filters.industry);
    }

    // Apply lead score range filter
    filtered = filtered.filter(contact =>
      contact.leadScore >= filters.leadScoreRange.min &&
      contact.leadScore <= filters.leadScoreRange.max
    );

    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(contact => {
        const contactDate = new Date(contact.lastInteraction);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : new Date(0);
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : new Date();
        return contactDate >= startDate && contactDate <= endDate;
      });
    }

    // Apply last interaction type filter
    if (filters.lastInteractionType !== 'all') {
      filtered = filtered.filter(contact => contact.lastInteractionType === filters.lastInteractionType);
    }

    // Apply source filter
    if (filters.source !== 'all') {
      filtered = filtered.filter(contact => contact.source === filters.source);
    }

    // Apply quick search filter
    if (filters.quickSearch.trim()) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(filters.quickSearch.toLowerCase()) ||
        contact.email.toLowerCase().includes(filters.quickSearch.toLowerCase()) ||
        contact.company.toLowerCase().includes(filters.quickSearch.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredContacts(filtered);
  }, [contacts, searchQuery, filters, sortConfig]);

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = (selectAll) => {
    setSelectedContacts(selectAll ? filteredContacts.map(c => c.id) : []);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(prev => prev.filter(c => c.id !== contactId));
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    }
  };

  const handleSendMessage = (contact) => {
    console.log('Send message to:', contact.name);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      segment: 'all',
      status: 'all',
      lifecycleStage: 'all',
      tags: [],
      dateRange: { start: '', end: '' },
      leadScoreRange: { min: 0, max: 100 },
      industry: 'all',
      lastInteractionType: 'all',
      source: 'all',
      quickSearch: ''
    });
    setSearchQuery('');
  };

  const handleSegmentChange = (segmentId) => {
    setSelectedSegment(segmentId);
    setFilters(prev => ({ ...prev, segment: segmentId }));
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for contacts:', selectedContacts);
  };

  const handleSaveContact = (contactData) => {
    setContacts(prev =>
      prev.map(c => c.id === contactData.id ? { ...c, ...contactData } : c)
    );
    setIsDetailModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="px-6 py-4">
          <Breadcrumb />
        </div>
        
        <div className="px-6 pb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-80">
              <ContactSidebar
                segments={segments}
                recentActivity={recentActivity}
                selectedSegment={selectedSegment}
                onSegmentChange={handleSegmentChange}
                onBulkAction={handleBulkAction}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <ContactFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                contactsCount={filteredContacts.length}
                onAddContact={handleAddContact}
              />
              
              <ContactsTable
                contacts={filteredContacts}
                selectedContacts={selectedContacts}
                onSelectContact={handleSelectContact}
                onSelectAll={handleSelectAll}
                onEditContact={handleEditContact}
                onDeleteContact={handleDeleteContact}
                onSendMessage={handleSendMessage}
                onViewDetails={handleViewDetails}
                sortConfig={sortConfig}
                onSort={handleSort}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSave={handleSaveContact}
      />

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewContact}
      />
    </div>
  );
};

export default CRMContacts;