import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AccountTreeView from './components/AccountTreeView';
import AccountDataTable from './components/AccountDataTable';
import AccountRightPanel from './components/AccountRightPanel';
import CreateAccountModal from './components/CreateAccountModal';

const SubAccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Mock data for sub-accounts with hierarchical structure
    const mockAccounts = [
      {
        id: 'main',
        name: 'HighLevel Pro',
        company: 'Main Account',
        type: 'parent',
        status: 'active',
        userCount: 25,
        userLimit: 100,
        tier: 'enterprise',
        lastActivity: '2024-01-15T10:30:00Z',
        children: [
          {
            id: 'sub1',
            name: 'PT Digital Solutions',
            company: 'Digital Marketing Agency',
            type: 'sub',
            status: 'active',
            userCount: 8,
            userLimit: 15,
            tier: 'professional',
            lastActivity: '2024-01-15T09:15:00Z',
            parentId: 'main'
          },
          {
            id: 'sub2',
            name: 'Startup Hub',
            company: 'Tech Incubator',
            type: 'sub',
            status: 'trial',
            userCount: 3,
            userLimit: 5,
            tier: 'starter',
            lastActivity: '2024-01-14T16:45:00Z',
            parentId: 'main'
          }
        ]
      },
      {
        id: 'sub3',
        name: 'E-commerce Pro',
        company: 'Online Retail Solutions',
        type: 'sub',
        status: 'active',
        userCount: 12,
        userLimit: 15,
        tier: 'professional',
        lastActivity: '2024-01-15T08:20:00Z'
      },
      {
        id: 'sub4',
        name: 'Local Business',
        company: 'Restaurant Chain',
        type: 'sub',
        status: 'suspended',
        userCount: 2,
        userLimit: 5,
        tier: 'starter',
        lastActivity: '2024-01-10T14:30:00Z'
      }
    ];

    setAccounts(mockAccounts);
    setSelectedAccount(mockAccounts[0]);
  }, []);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const handleCreateSubAccount = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateAccount = (accountData) => {
    const newAccount = {
      id: `sub${Date.now()}`,
      name: accountData.name,
      company: accountData.company,
      type: 'sub',
      status: 'active',
      userCount: 1,
      userLimit: accountData.userLimit,
      tier: accountData.tier,
      lastActivity: new Date().toISOString(),
      email: accountData.email,
      domain: accountData.domain,
      features: accountData.features,
      branding: accountData.branding
    };

    setAccounts(prev => [...prev, newAccount]);
    setSelectedAccount(newAccount);
  };

  const handleAccountEdit = (account) => {
    console.log('Edit account:', account.name);
    // Implementation for editing account
  };

  const handleAccountBilling = (account) => {
    console.log('View billing for:', account.name);
    // Implementation for billing management
  };

  const handleAccountDeactivate = (account) => {
    console.log('Deactivate account:', account.name);
    // Implementation for account deactivation
  };

  const handleImpersonateAccount = (account) => {
    console.log('Impersonate account:', account.name);
    // Implementation for account impersonation
  };

  // Flatten accounts for table view
  const flattenAccounts = (accounts) => {
    const flattened = [];
    accounts.forEach(account => {
      flattened.push(account);
      if (account.children) {
        flattened.push(...account.children);
      }
    });
    return flattened;
  };

  const flatAccounts = flattenAccounts(accounts);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sub-Account Management - HighLevel Pro</title>
        <meta name="description" content="Comprehensive white-label client management with granular access controls and role-based permissions" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <div className="px-6 py-4 border-b border-border bg-surface">
          <Breadcrumb />
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-text-primary">Sub-Account Management</h1>
            <p className="text-text-secondary mt-1">
              Manage white-label client accounts with granular access controls and role-based permissions
            </p>
          </div>
        </div>

        <div className="flex h-[calc(100vh-140px)]">
          {/* Left Panel - Account Tree (30%) */}
          <div className="w-[30%] min-w-[300px]">
            <AccountTreeView
              accounts={accounts}
              selectedAccount={selectedAccount}
              onAccountSelect={handleAccountSelect}
              onCreateSubAccount={handleCreateSubAccount}
            />
          </div>

          {/* Center Panel - Data Table (50%) */}
          <div className="flex-1 min-w-0">
            <AccountDataTable
              accounts={flatAccounts}
              onAccountEdit={handleAccountEdit}
              onAccountBilling={handleAccountBilling}
              onAccountDeactivate={handleAccountDeactivate}
            />
          </div>

          {/* Right Panel - Account Details (20%) */}
          <div className="w-[20%] min-w-[280px]">
            <AccountRightPanel
              selectedAccount={selectedAccount}
              onCreateAccount={handleCreateSubAccount}
              onImpersonateAccount={handleImpersonateAccount}
            />
          </div>
        </div>
      </main>

      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
};

export default SubAccountManagement;