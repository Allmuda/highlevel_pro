import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountTreeView = ({ accounts, selectedAccount, onAccountSelect, onCreateSubAccount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAccounts, setExpandedAccounts] = useState(new Set(['main']));

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpanded = (accountId) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const getAccountIcon = (account) => {
    if (account.type === 'parent') return 'Building2';
    if (account.type === 'sub') return 'Building';
    return 'Users';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'suspended': return 'text-error';
      case 'trial': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const renderAccount = (account, level = 0) => {
    const hasChildren = account.children && account.children.length > 0;
    const isExpanded = expandedAccounts.has(account.id);
    const isSelected = selectedAccount?.id === account.id;

    return (
      <div key={account.id} className="mb-1">
        <div
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all duration-150 ${
            isSelected ? 'bg-primary-50 border border-primary-200' : 'hover:bg-muted'
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => onAccountSelect(account)}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(account.id);
              }}
              className="p-0 w-4 h-4 min-h-0"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                size={12} 
              />
            </Button>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <Icon 
            name={getAccountIcon(account)} 
            size={16} 
            className={getStatusColor(account.status)}
          />
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {account.name}
            </p>
            <p className="text-xs text-text-muted truncate">
              {account.company}
            </p>
          </div>
          
          <div className={`w-2 h-2 rounded-full ${
            account.status === 'active' ? 'bg-success' :
            account.status === 'suspended' ? 'bg-error' :
            account.status === 'trial' ? 'bg-warning' : 'bg-text-muted'
          }`} />
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {account.children.map(child => renderAccount(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-surface border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Account Tree</h2>
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            onClick={onCreateSubAccount}
          >
            New
          </Button>
        </div>
        
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
          />
          <Input
            type="search"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {filteredAccounts.map(account => renderAccount(account))}
      </div>
    </div>
  );
};

export default AccountTreeView;