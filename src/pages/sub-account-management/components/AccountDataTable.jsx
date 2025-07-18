import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountDataTable = ({ accounts, onAccountEdit, onAccountBilling, onAccountDeactivate }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedAccounts, setSelectedAccounts] = useState(new Set());

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectAccount = (accountId) => {
    const newSelected = new Set(selectedAccounts);
    if (newSelected.has(accountId)) {
      newSelected.delete(accountId);
    } else {
      newSelected.add(accountId);
    }
    setSelectedAccounts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAccounts.size === accounts.length) {
      setSelectedAccounts(new Set());
    } else {
      setSelectedAccounts(new Set(accounts.map(a => a.id)));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success-100 text-success-600', label: 'Active' },
      suspended: { color: 'bg-error-100 text-error-600', label: 'Suspended' },
      trial: { color: 'bg-warning-100 text-warning-600', label: 'Trial' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTierBadge = (tier) => {
    const tierConfig = {
      starter: { color: 'bg-secondary-100 text-secondary-600', label: 'Starter' },
      professional: { color: 'bg-primary-100 text-primary-600', label: 'Professional' },
      enterprise: { color: 'bg-accent-100 text-accent-600', label: 'Enterprise' }
    };
    
    const config = tierConfig[tier] || tierConfig.starter;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors duration-150"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon 
          name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
          size={12} 
        />
      </div>
    </th>
  );

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Sub-Accounts</h2>
          {selectedAccounts.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedAccounts.size} selected
              </span>
              <Button variant="outline" size="sm" iconName="Mail">
                Bulk Email
              </Button>
              <Button variant="outline" size="sm" iconName="Settings">
                Bulk Update
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedAccounts.size === accounts.length && accounts.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <SortHeader field="name">Account Name</SortHeader>
              <SortHeader field="status">Status</SortHeader>
              <SortHeader field="userCount">Users</SortHeader>
              <SortHeader field="tier">Tier</SortHeader>
              <SortHeader field="lastActivity">Last Activity</SortHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {sortedAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-muted transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedAccounts.has(account.id)}
                    onChange={() => handleSelectAccount(account.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name="Building" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{account.name}</p>
                      <p className="text-xs text-text-muted">{account.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(account.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-primary">
                      {account.userCount}/{account.userLimit}
                    </span>
                    <div className="w-16 h-2 bg-secondary-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          account.userCount / account.userLimit > 0.8 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${(account.userCount / account.userLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTierBadge(account.tier)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {formatDate(account.lastActivity)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onAccountEdit(account)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="CreditCard"
                      onClick={() => onAccountBilling(account)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreVertical"
                      onClick={() => onAccountDeactivate(account)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountDataTable;