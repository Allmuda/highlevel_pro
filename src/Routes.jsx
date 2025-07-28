import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import SubAccountManagement from "pages/sub-account-management";
import PaymentProcessing from "pages/payment-processing";
import WorkflowAutomation from "pages/workflow-automation";
import CrmContacts from "pages/crm-contacts";
import CampaignBuilder from "pages/campaign-builder";
import WhatsAppBusinessCenter from "pages/whats-app-business-center";
import SocialMediaPlanner from "pages/social-media-planner";
import OmnichannelInbox from "pages/omnichannel-inbox";
import { InboxProvider } from "pages/omnichannel-inbox/store/inboxStore";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <InboxProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your routes here */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sub-account-management" element={<SubAccountManagement />} />
            <Route path="/payment-processing" element={<PaymentProcessing />} />
            <Route path="/workflow-automation" element={<WorkflowAutomation />} />
            <Route path="/crm-contacts" element={<CrmContacts />} />
            <Route path="/campaign-builder" element={<CampaignBuilder />} />
            <Route path="/whats-app-business-center" element={<WhatsAppBusinessCenter />} />
            <Route path="/social-media-planner" element={<SocialMediaPlanner />} />
            <Route path="/omnichannel-inbox" element={<OmnichannelInbox />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </InboxProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;