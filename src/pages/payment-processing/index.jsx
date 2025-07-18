import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PaymentOverviewCards from './components/PaymentOverviewCards';
import PaymentSidebar from './components/PaymentSidebar';
import TransactionTable from './components/TransactionTable';
import InvoiceModal from './components/InvoiceModal';
import SubscriptionPanel from './components/SubscriptionPanel';
import PaymentLinkModal from './components/PaymentLinkModal';
import RealtimeMonitor from './components/RealtimeMonitor';

const PaymentProcessing = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isSubscriptionPanelOpen, setIsSubscriptionPanelOpen] = useState(false);
  const [isPaymentLinkModalOpen, setIsPaymentLinkModalOpen] = useState(false);

  const handleCreateInvoice = () => {
    setIsInvoiceModalOpen(true);
  };

  const handleCreateSubscription = () => {
    setIsSubscriptionPanelOpen(true);
  };

  const handleCreatePaymentLink = () => {
    setIsPaymentLinkModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="flex">
          <PaymentSidebar
            onCreateInvoice={handleCreateInvoice}
            onCreateSubscription={handleCreateSubscription}
            onCreatePaymentLink={handleCreatePaymentLink}
          />
          
          <main className="flex-1 p-6">
            <div className="mb-6">
              <Breadcrumb />
              <div className="mt-4">
                <h1 className="text-3xl font-bold text-text-primary">Payment Processing</h1>
                <p className="text-text-secondary mt-2">
                  Manage Indonesian e-wallet and banking integrations with comprehensive invoicing capabilities
                </p>
              </div>
            </div>

            <PaymentOverviewCards />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <div className="xl:col-span-2">
                <TransactionTable />
              </div>
              <div>
                <RealtimeMonitor />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
      
      <SubscriptionPanel
        isOpen={isSubscriptionPanelOpen}
        onClose={() => setIsSubscriptionPanelOpen(false)}
      />
      
      <PaymentLinkModal
        isOpen={isPaymentLinkModalOpen}
        onClose={() => setIsPaymentLinkModalOpen(false)}
      />
    </div>
  );
};

export default PaymentProcessing;