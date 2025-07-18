import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactsTable = ({ 
  contacts, 
  selectedContacts, 
  onSelectContact, 
  onSelectAll, 
  onEditContact, 
  onDeleteContact, 
  onSendMessage, 
  onViewDetails,
  sortConfig,
  onSort,
  searchQuery,
  onSearchChange
}) => {
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setIsAllSelected(selectedContacts.length === contacts.length && contacts.length > 0);
  }, [selectedContacts, contacts]);

  const handleSelectAll = () => {
    onSelectAll(!isAllSelected);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'active': 'bg-success-100 text-success-600',
      'inactive': 'bg-secondary-100 text-secondary-600',
      'pending': 'bg-warning-100 text-warning-600',
      'blocked': 'bg-error-100 text-error-600'
    };
    return statusColors[status] || 'bg-secondary-100 text-secondary-600';
  };

  const getLeadScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    if (score >= 40) return 'text-accent';
    return 'text-error';
  };

  const formatLastInteraction = (date) => {
    const now = new Date();
    const interactionDate = new Date(date);
    const diffTime = Math.abs(now - interactionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return interactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Table Header with Search */}
      <div className="p-4 border-b border-border bg-muted">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Contact Records</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                type="search"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="primary" iconName="Plus" size="sm">
              Add Contact
            </Button>
          </div>
        </div>
        
        {selectedContacts.length > 0 && (
          <div className="flex items-center justify-between bg-primary-50 border border-primary-200 rounded-lg p-3">
            <span className="text-sm font-medium text-primary">
              {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Mail">
                Send Email
              </Button>
              <Button variant="outline" size="sm" iconName="MessageSquare">
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" iconName="Tag">
                Add Tags
              </Button>
              <Button variant="danger" size="sm" iconName="Trash2">
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              {[
                { key: 'name', label: 'Name' },
                { key: 'company', label: 'Company' },
                { key: 'status', label: 'Status' },
                { key: 'lastInteraction', label: 'Last Interaction' },
                { key: 'leadScore', label: 'Lead Score' },
                { key: 'customField', label: 'Industry' }
              ].map((column) => (
                <th key={column.key} className="px-4 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSort(column.key)}
                    className="flex items-center space-x-1 text-text-secondary hover:text-text-primary font-medium"
                  >
                    <span>{column.label}</span>
                    <Icon name={getSortIcon(column.key)} size={14} />
                  </Button>
                </th>
              ))}
              <th className="w-20 px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-muted transition-colors duration-150">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => onSelectContact(contact.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{contact.name}</p>
                      <p className="text-sm text-text-secondary">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary">{contact.company}</p>
                  <p className="text-sm text-text-secondary">{contact.position}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={contact.lastInteractionType === 'email' ? 'Mail' : 'MessageSquare'} size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">
                      {formatLastInteraction(contact.lastInteraction)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-secondary-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${contact.leadScore >= 80 ? 'bg-success' : contact.leadScore >= 60 ? 'bg-warning' : contact.leadScore >= 40 ? 'bg-accent' : 'bg-error'}`}
                        style={{ width: `${contact.leadScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getLeadScoreColor(contact.leadScore)}`}>
                      {contact.leadScore}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">{contact.industry}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(contact)}
                      iconName="Eye"
                      className="text-text-muted hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditContact(contact)}
                      iconName="Edit"
                      className="text-text-muted hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSendMessage(contact)}
                      iconName="MessageSquare"
                      className="text-text-muted hover:text-success"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteContact(contact.id)}
                      iconName="Trash2"
                      className="text-text-muted hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-border">
        {contacts.map((contact) => (
          <div key={contact.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => onSelectContact(contact.id)}
                  className="rounded border-border focus:ring-primary mt-1"
                />
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">{contact.name}</p>
                  <p className="text-sm text-text-secondary">{contact.email}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                {contact.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-text-muted">Company</p>
                <p className="text-sm font-medium text-text-primary">{contact.company}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Industry</p>
                <p className="text-sm text-text-secondary">{contact.industry}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Last Interaction</p>
                <p className="text-sm text-text-secondary">{formatLastInteraction(contact.lastInteraction)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Lead Score</p>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-secondary-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${contact.leadScore >= 80 ? 'bg-success' : contact.leadScore >= 60 ? 'bg-warning' : contact.leadScore >= 40 ? 'bg-accent' : 'bg-error'}`}
                      style={{ width: `${contact.leadScore}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${getLeadScoreColor(contact.leadScore)}`}>
                    {contact.leadScore}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(contact)}
                  iconName="Eye"
                  className="text-text-muted hover:text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditContact(contact)}
                  iconName="Edit"
                  className="text-text-muted hover:text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSendMessage(contact)}
                  iconName="MessageSquare"
                  className="text-text-muted hover:text-success"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteContact(contact.id)}
                iconName="Trash2"
                className="text-text-muted hover:text-error"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {contacts.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No contacts found</h3>
          <p className="text-text-secondary mb-4">Get started by adding your first contact or importing from a file.</p>
          <Button variant="primary" iconName="Plus">
            Add Contact
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactsTable;