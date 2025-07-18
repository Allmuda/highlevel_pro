import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SubscriptionPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('active');

  const subscriptions = [
    {
      id: 'SUB-001',
      customer: 'PT Digital Solutions',
      plan: 'Pro Plan',
      amount: 'IDR 2.500.000',
      interval: 'monthly',
      status: 'active',
      nextBilling: '2024-02-15',
      paymentMethod: 'GoPay',
      created: '2024-01-15'
    },
    {
      id: 'SUB-002',
      customer: 'Startup Hub',
      plan: 'Business Plan',
      amount: 'IDR 5.000.000',
      interval: 'yearly',
      status: 'active',
      nextBilling: '2025-01-15',
      paymentMethod: 'BCA',
      created: '2024-01-15'
    },
    {
      id: 'SUB-003',
      customer: 'Tech Innovators',
      plan: 'Starter Plan',
      amount: 'IDR 750.000',
      interval: 'monthly',
      status: 'cancelled',
      nextBilling: null,
      paymentMethod: 'OVO',
      created: '2023-12-01'
    }
  ];

  const [newSubscription, setNewSubscription] = useState({
    customer: '',
    plan: '',
    amount: '',
    interval: 'monthly',
    paymentMethod: '',
    startDate: ''
  });

  const plans = [
    { id: 'starter', name: 'Starter Plan', price: 750000 },
    { id: 'pro', name: 'Pro Plan', price: 2500000 },
    { id: 'business', name: 'Business Plan', price: 5000000 }
  ];

  const intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const paymentMethods = [
    { value: 'gopay', label: 'GoPay' },
    { value: 'ovo', label: 'OVO' },
    { value: 'dana', label: 'DANA' },
    { value: 'bca', label: 'BCA' },
    { value: 'bri', label: 'BRI' },
    { value: 'bsi', label: 'BSI' }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { color: 'bg-success-100 text-success-700', label: 'Active' },
      cancelled: { color: 'bg-error-100 text-error-700', label: 'Cancelled' },
      paused: { color: 'bg-warning-100 text-warning-700', label: 'Paused' }
    };
    const config = statusMap[status] || statusMap.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    if (typeof amount === 'string') {
      return amount;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleCreateSubscription = (e) => {
    e.preventDefault();
    console.log('Creating subscription:', newSubscription);
    setNewSubscription({
      customer: '',
      plan: '',
      amount: '',
      interval: 'monthly',
      paymentMethod: '',
      startDate: ''
    });
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (activeTab === 'all') return true;
    return sub.status === activeTab;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Subscription Management</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="flex h-[calc(90vh-80px)]">
          {/* Subscription List */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
              {[
                { id: 'active', label: 'Active', count: subscriptions.filter(s => s.status === 'active').length },
                { id: 'cancelled', label: 'Cancelled', count: subscriptions.filter(s => s.status === 'cancelled').length },
                { id: 'all', label: 'All', count: subscriptions.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                    activeTab === tab.id
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Subscription Cards */}
            <div className="space-y-4">
              {filteredSubscriptions.map((subscription) => (
                <div key={subscription.id} className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-text-primary">{subscription.customer}</h3>
                      <p className="text-sm text-text-secondary">{subscription.plan}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(subscription.status)}
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wide">Amount</p>
                      <p className="font-semibold text-text-primary">{subscription.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wide">Interval</p>
                      <p className="font-medium text-text-primary capitalize">{subscription.interval}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wide">Payment Method</p>
                      <p className="font-medium text-text-primary">{subscription.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wide">
                        {subscription.status === 'active' ? 'Next Billing' : 'Cancelled'}
                      </p>
                      <p className="font-medium text-text-primary">
                        {subscription.nextBilling || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-sm text-text-secondary">
                      Created on {subscription.created}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} className="mr-2" />
                        View
                      </Button>
                      {subscription.status === 'active' && (
                        <Button variant="ghost" size="sm">
                          <Icon name="Pause" size={16} className="mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Subscription Form */}
          <div className="w-96 bg-muted p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Create New Subscription</h3>
            
            <form onSubmit={handleCreateSubscription} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Customer *
                </label>
                <Input
                  type="text"
                  value={newSubscription.customer}
                  onChange={(e) => setNewSubscription(prev => ({ ...prev, customer: e.target.value }))}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Plan *
                </label>
                <select
                  value={newSubscription.plan}
                  onChange={(e) => {
                    const selectedPlan = plans.find(p => p.id === e.target.value);
                    setNewSubscription(prev => ({
                      ...prev,
                      plan: e.target.value,
                      amount: selectedPlan ? selectedPlan.price : ''
                    }));
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select a plan</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {formatCurrency(plan.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Billing Interval *
                </label>
                <select
                  value={newSubscription.interval}
                  onChange={(e) => setNewSubscription(prev => ({ ...prev, interval: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {intervals.map((interval) => (
                    <option key={interval.value} value={interval.value}>
                      {interval.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Payment Method *
                </label>
                <select
                  value={newSubscription.paymentMethod}
                  onChange={(e) => setNewSubscription(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select payment method</option>
                  {paymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Date *
                </label>
                <Input
                  type="date"
                  value={newSubscription.startDate}
                  onChange={(e) => setNewSubscription(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <Button type="submit" variant="primary" fullWidth className="mt-6">
                <Icon name="Plus" size={16} className="mr-2" />
                Create Subscription
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPanel;