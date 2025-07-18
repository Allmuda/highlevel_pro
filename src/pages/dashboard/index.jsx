import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import KPICard from './components/KPICard';
import QuickActionCard from './components/QuickActionCard';
import SalesPipelineChart from './components/SalesPipelineChart';
import TeamPerformanceChart from './components/TeamPerformanceChart';
import ActivityFeed from './components/ActivityFeed';
import PendingTasksQueue from './components/PendingTasksQueue';
import UpcomingEvents from './components/UpcomingEvents';
import RecentConversations from './components/RecentConversations';
import BottleneckAlerts from './components/BottleneckAlerts';
import ChurnPredictionInsights from './components/ChurnPredictionInsights';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const kpiData = [
    {
      title: 'Total Revenue',
      value: 'IDR 125,500,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'Active Leads',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'Target',
      color: 'warning'
    },
    {
      title: 'Active Campaigns',
      value: '18',
      change: '+3',
      changeType: 'positive',
      icon: 'Zap',
      color: 'accent'
    }
  ];

  const quickActions = [
    {
      title: 'Create Email Campaign',
      description: 'Design and launch automated email sequences',
      icon: 'Mail',
      route: '/workflow-automation',
      color: 'primary'
    },
    {
      title: 'Add New Contact',
      description: 'Import contacts or add them manually to CRM',
      icon: 'UserPlus',
      route: '/crm-contacts',
      color: 'success'
    },
    {
      title: 'Schedule Social Post',
      description: 'Plan and schedule posts across social platforms',
      icon: 'Calendar',
      route: '/workflow-automation',
      color: 'accent'
    },
    {
      title: 'Process Payment',
      description: 'Create invoices and manage payment processing',
      icon: 'CreditCard',
      route: '/payment-processing',
      color: 'warning'
    },
    {
      title: 'Setup WhatsApp Bot',
      description: 'Configure automated WhatsApp responses',
      icon: 'MessageCircle',
      route: '/workflow-automation',
      color: 'success'
    },
    {
      title: 'Manage Sub-Accounts',
      description: 'Create and configure client sub-accounts',
      icon: 'Building',
      route: '/sub-account-management',
      color: 'primary'
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
                <p className="text-text-secondary">
                  Welcome back! Here's what's happening with your business today.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-sm text-text-muted">{formatDate(currentTime)}</p>
                <p className="text-lg font-semibold text-text-primary">{formatTime(currentTime)}</p>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel - Quick Actions */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-lg border border-border p-6 card-elevation mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <QuickActionCard
                      key={index}
                      title={action.title}
                      description={action.description}
                      icon={action.icon}
                      route={action.route}
                      color={action.color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Center Section - Charts */}
            <div className="lg:col-span-6">
              <div className="space-y-6">
                <SalesPipelineChart />
                <TeamPerformanceChart />
              </div>
            </div>

            {/* Right Panel - Activity & Tasks */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <ActivityFeed />
                <PendingTasksQueue />
                <UpcomingEvents />
              </div>
            </div>
          </div>

          {/* Bottom Section - Conversations, Bottlenecks, and Churn Prediction */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <RecentConversations />
            <BottleneckAlerts />
            <ChurnPredictionInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;