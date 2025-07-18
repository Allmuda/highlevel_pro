import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const transactions = [
    {
      id: 'TXN-2024-001',
      amount: 'IDR 2.500.000',
      paymentMethod: 'GoPay',
      customer: 'PT Digital Solutions',
      status: 'completed',
      date: '2024-01-15 14:30',
      type: 'invoice'
    },
    {
      id: 'TXN-2024-002',
      amount: 'IDR 750.000',
      paymentMethod: 'BCA',
      customer: 'Startup Hub',
      status: 'pending',
      date: '2024-01-15 13:45',
      type: 'subscription'
    },
    {
      id: 'TXN-2024-003',
      amount: 'IDR 1.200.000',
      paymentMethod: 'OVO',
      customer: 'Tech Innovators',
      status: 'failed',
      date: '2024-01-15 12:20',
      type: 'payment_link'
    },
    {
      id: 'TXN-2024-004',
      amount: 'IDR 3.800.000',
      paymentMethod: 'DANA',
      customer: 'Creative Agency',
      status: 'completed',
      date: '2024-01-15 11:15',
      type: 'invoice'
    },
    {
      id: 'TXN-2024-005',
      amount: 'IDR 950.000',
      paymentMethod: 'BSI',
      customer: 'Marketing Pro',
      status: 'processing',
      date: '2024-01-15 10:30',
      type: 'subscription'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'processing', label: 'Processing' }
  ];

  const paymentMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'gopay', label: 'GoPay' },
    { value: 'ovo', label: 'OVO' },
    { value: 'dana', label: 'DANA' },
    { value: 'bsi', label: 'BSI' },
    { value: 'bri', label: 'BRI' },
    { value: 'bca', label: 'BCA' },
    { value: 'bni', label: 'BNI' }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { color: 'bg-success-100 text-success-700', label: 'Completed' },
      pending: { color: 'bg-warning-100 text-warning-700', label: 'Pending' },
      failed: { color: 'bg-error-100 text-error-700', label: 'Failed' },
      processing: { color: 'bg-primary-100 text-primary-700', label: 'Processing' }
    };
    const config = statusMap[status] || statusMap.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    const methodMap = {
      'GoPay': 'Smartphone',
      'OVO': 'Smartphone',
      'DANA': 'Smartphone',
      'BSI': 'Building',
      'BRI': 'Building',
      'BCA': 'Building',
      'BNI': 'Building'
    };
    return methodMap[method] || 'CreditCard';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Table Header with Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-semibold text-text-primary">Transaction History</h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              {paymentMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-150"
                >
                  <span>Transaction ID</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-150"
                >
                  <span>Amount</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-150"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-muted transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <Icon name="Receipt" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{transaction.id}</p>
                      <p className="text-xs text-text-muted capitalize">{transaction.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-semibold text-text-primary">{transaction.amount}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name={getPaymentMethodIcon(transaction.paymentMethod)} size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{transaction.paymentMethod}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-text-primary">{transaction.customer}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-text-primary">{transaction.date}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing 1 to 5 of 1,247 transactions
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
            Previous
          </Button>
          <Button variant="ghost" size="sm">
            Next
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;